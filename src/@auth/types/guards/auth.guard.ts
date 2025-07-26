import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/@orm/models/auth/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    ) { }

    async canActivate(context: ExecutionContext) {
        const http = context.switchToHttp();
        const request = http.getRequest();

        const token = this.extractTokenFromHeades(request);
        if (!token)
            throw new UnauthorizedException('please enter the token');

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET') })
            const user = this.userRepo.findOneBy({ id: payload.sub })
            request.user = user;
        } catch (error) {
            if (error.name == "TokenExpiredError") {
                return await this.handleRefreshToken(request)
            }
            throw new UnauthorizedException(error);
        }
        return true;
    }

    private async handleRefreshToken(request: Request): Promise<boolean> {
        const token = this.extractRefreshTokenFromCookie(request)
        if (!token)
            throw new UnauthorizedException('please enter the refresh tokne')
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET')
            })
            const user = await this.userRepo.findOneBy({ id: payload.sub });
            const isMatch = await bcrypt.compare(token, user?.currentHashedRefreshToken as string);

            if (!isMatch)
                throw new UnauthorizedException("refresh token is invalid")

            const newPayload = { sub: user?.id }
            const newAccessToken = this.jwtService.signAsync(newPayload, {
                secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
            })
            request['newAccessToken'] = newAccessToken;

            request['user'] = user

            return true;
        } catch (error) {
            console.log("handle refresh token : ", error);
            return false;

        }
    }
    private extractTokenFromHeades(req: Request) {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        return type == 'Bearer' ? token : undefined
    }
    private extractRefreshTokenFromCookie(req: Request) {
        const refresh_token = req.cookies?.refresh_token
        return refresh_token
    }
}