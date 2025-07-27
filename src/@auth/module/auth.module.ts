import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth/auth.controller';
import { AuthService } from '../controllers/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/@orm/models/auth/user.entity';
import { RoleEntity } from 'src/@orm/models/auth/role.entity';
import { RefreshTokenGuard } from '../types/guards/refresh-token.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '3m' }
      })
    }),
    TypeOrmModule.forFeature([UserEntity, RoleEntity])
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenGuard],
  exports: [JwtModule, TypeOrmModule]
})
export class AuthModule { }
