import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/@orm/models/auth/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class RefreshTokenGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp()
        const req = ctx.getRequest()
        const token = this.extractRefreshTokenFromCookie(req)

        if (!token) {
            throw new UnauthorizedException('please enter the refresh_token in cookie')
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET')
            })

            const user = await this.userRepo.findOneBy({ id: payload.sub });
            if (!user || !user.currentHashedRefreshToken) {
                throw new UnauthorizedException('Invalid user or missing refresh token');
            }

            const isMatch = await bcrypt.compare(token, user.currentHashedRefreshToken);
            if (!isMatch) {
                throw new UnauthorizedException('Refresh token mismatch');
            }
            const newAccessToken = this.jwtService.sign({ sub: user.id }, {
                expiresIn: '30s',
                secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
            });

            req['newAccessToken'] = newAccessToken
            req['user'] = user;
            return true;

        } catch (error) {
            throw new UnauthorizedException('Refresh token is invalid' + error);
        }
    }

    private extractRefreshTokenFromCookie(req: Request) {
        const refresh_token = req.cookies?.refresh_token
        return refresh_token
    }

}