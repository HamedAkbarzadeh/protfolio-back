import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/admin/admin.controller';
import { AdminService } from '../controllers/admin/admin.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/@orm/models/auth/user.entity';
import { RoleEntity } from 'src/@orm/models/auth/role.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '3m' }
      })
    }),
    TypeOrmModule.forFeature([UserEntity, RoleEntity])
  ],
  controllers: [AuthController],
  providers: [AdminService]
})
export class AuthModule { }
