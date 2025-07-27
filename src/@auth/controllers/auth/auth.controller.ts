import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { LoginDto, SignInDto } from './auth.dto';
import { ResponseInterceptor } from 'src/@auth/types/interceptors/response.inteceptor';
import { RefreshTokenGuard } from 'src/@auth/types/guards/refresh-token.guard';
import { Request } from 'express';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseInterceptors(ResponseInterceptor)
    @Post('signup')
    signup(@Body() data: SignInDto) {
        return this.authService.signup(data);
    }

    @UseInterceptors(ResponseInterceptor)
    @Post('login')
    login(@Body() data: LoginDto) {
        return this.authService.login(data.username, data.password);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh-token')
    refreshToken(@Req() req: Request) {
        return this.authService.generateRefreshToken(req)
    }
}
