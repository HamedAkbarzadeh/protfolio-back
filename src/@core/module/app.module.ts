import { Module } from '@nestjs/common';

import { UserModule } from '../../user/user.module';
import { AuthModule } from 'src/@auth/module/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RouteModule } from './route.module';
import { OrmModule } from 'src/@orm/module/orm.module';
import * as path from "path"

@Module({
  imports: [
    UserModule,
    AuthModule,
    RouteModule,
    OrmModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join('env', `.env.${process.env.NODE_ENV}`),

    })
  ],
})
export class AppModule {
}
