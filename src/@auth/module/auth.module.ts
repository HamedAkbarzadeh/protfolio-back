import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/admin/admin.controller';
import { AdminService } from '../controllers/admin/admin.service';

@Module({
  controllers: [AuthController],
  providers: [AdminService]
})
export class AuthModule {}
