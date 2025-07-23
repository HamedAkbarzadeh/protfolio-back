import { Module } from '@nestjs/common';

import { UserModule } from '../../user/user.module';
import { AuthModule } from '../../auth/auth.module';
import { RouterModule } from './route.module';

@Module({
  imports: [UserModule, AuthModule, RouterModule],
})
export class AppModule {}
