import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from 'src/@auth/module/auth.module';
@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'auth',
            module: AuthModule
          }
        ],
      },
    ]),
  ],
})
export class RouteModule { }
