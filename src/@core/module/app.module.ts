import { Module } from '@nestjs/common';

import { AuthModule } from 'src/@auth/module/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RouteModule } from './route.module';
import { OrmModule } from 'src/@orm/module/orm.module';
import * as path from "path"
import { UserModule } from 'src/user/module/user.module';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { i18nOptions } from '../constant/init.options.const';
import { SkillModule } from 'src/skill/module/skill.module';

@Module({
  imports: [
    SkillModule,
    UserModule,
    AuthModule,
    RouteModule,
    OrmModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join('env', `.env.${process.env.NODE_ENV}`),
    }),
    I18nModule.forRoot(i18nOptions)
  ],
})
export class AppModule {
}
