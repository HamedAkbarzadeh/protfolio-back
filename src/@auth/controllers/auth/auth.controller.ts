import { AuthService } from './auth.service';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoginDto, SignInDto } from './auth.dto';
import { ResponseInterceptor } from 'src/@auth/types/interceptors/response.inteceptor';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseInterceptors(ResponseInterceptor)
    @Post('signin')
    signin(@Body() data: SignInDto) {
        return this.authService.signin(data);
    }

    @UseInterceptors(ResponseInterceptor)
    @Post('login')
    login(@Body() data: LoginDto) {
        return this.authService.login(data.username, data.password);
    }
}
