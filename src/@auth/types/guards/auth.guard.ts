import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/@orm/models/auth/user.entity';
import { Repository } from 'typeorm';

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
            throw new UnauthorizedException(error);
        }
        return true;
    }

    private extractTokenFromHeades(req: Request) {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        return type == 'Bearer' ? token : undefined
    }
}