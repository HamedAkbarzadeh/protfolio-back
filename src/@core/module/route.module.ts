import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from 'src/@auth/module/auth.module';
import { UserModule } from 'src/user/module/user.module';
@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'auth',
            module: AuthModule
          },
          {
            path: 'users',
            module: UserModule
          }
        ],
      },
    ]),
  ],
})
export class RouteModule { }
