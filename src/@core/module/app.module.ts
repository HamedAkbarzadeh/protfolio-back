import { Module } from '@nestjs/common';

import { UserModule } from '../../user/user.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from 'src/@auth/module/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, AuthModule, RouterModule , 
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : `.env.${process.env.NODE_ENV}`
    })
  ],
})
export class AppModule {}
