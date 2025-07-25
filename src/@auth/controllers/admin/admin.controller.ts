import { AdminService } from './admin.service';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoginDto, SignInDto } from './admin.dto';
import { ResponseInterceptor } from 'src/@auth/types/interceptors/response.inteceptor';

@Controller()
export class AuthController {
    constructor(private adminService: AdminService) { }

    @UseInterceptors(ResponseInterceptor)
    @Post('signin')
    signin(@Body() data: SignInDto) {
        return this.adminService.signin(data);
    }

    @UseInterceptors(ResponseInterceptor)
    @Post('login')
    login(@Body() data: LoginDto) {
        return this.adminService.login(data.username, data.password);
    }
}
