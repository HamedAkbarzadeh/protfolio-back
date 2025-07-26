import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../controllers/user.service';
import { RoleController } from '../controllers/role.controller';
import { RoleService } from '../controllers/role.service';
import { AuthModule } from 'src/@auth/module/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService]
})
export class UserModule { }
