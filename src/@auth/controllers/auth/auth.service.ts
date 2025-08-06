import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/@orm/models/auth/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import * as jwt from '@nestjs/jwt'
import { SignInDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        private jwtService: jwt.JwtService,
        private configService: ConfigService
    ) { }

    async signup(data: SignInDto) {
        const user = await this.userRepo.findBy({ username: data.username })

        if (user.length)
            throw new UnauthorizedException('The username is used befor you')

        //hash
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(data.password, salt)

        //create user
        const newUser = this.userRepo.create({
            firstName: data.first_name,
            lastName: data.last_name,
            username: data.username,
            password: hashedPass,
            roles: data.roles
        })

        const res = await this.userRepo.save(newUser)

        //generate access token and refresh token and setup payload for signify
        const payload = { sub: newUser.id, role: newUser.roles }
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '30s',
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '30d',
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET')
        });
        this.userRepo.update(newUser.id, {
            currentHashedRefreshToken: await bcrypt.hash(refreshToken, 10)
        })
        return {
            success: true,
            result: {
                accessToken,
                refreshToken
            }
        }
    }

    async login(username: string, password: string) {
        //check is exist user
        const user = await this.userRepo.findOne({ where: { username } })
        //if not exist return exeption
        if (!user)
            throw new UnauthorizedException('The username or password is incorrect')

        //check password
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword)
            throw new UnauthorizedException('The username or password is incorrect')


        //generate access token and refresh token and setup payload for signify
        const payload = { sub: user.id, role: user.roles }
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '1d',
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '30d',
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET')
        });
        this.userRepo.update(user.id, {
            currentHashedRefreshToken: await bcrypt.hash(refreshToken, 10)
        })
        return {
            success: true,
            result: {
                accessToken,
                refreshToken
            }
        }
    }

    generateRefreshToken(req: Request) {
        return {
            newAccessToken: req['newAccessToken']
        }
    }

}
