import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user/user.controller';
import { UserService } from '../controllers/user/user.service';
import { RoleController } from '../controllers/role/role.controller';
import { RoleService } from '../controllers/role/role.service';
import { AuthModule } from 'src/@auth/module/auth.module';
import { I18nBaseService } from 'src/@shere/services/i18n-Service/i18n.service';

@Module({
  imports: [AuthModule],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService, I18nBaseService]
})
export class UserModule { }
