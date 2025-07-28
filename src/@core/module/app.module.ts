import { Module } from '@nestjs/common';

import { AuthModule } from 'src/@auth/module/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RouteModule } from './route.module';
import { OrmModule } from 'src/@orm/module/orm.module';
import * as path from "path"
import { UserModule } from 'src/user/module/user.module';
import { HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RouteModule,
    OrmModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join('env', `.env.${process.env.NODE_ENV}`),

    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '../../@shere/i18n'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        new HeaderResolver(['accept-language']),
      ],
    }),
  ],
})
export class AppModule {
}
