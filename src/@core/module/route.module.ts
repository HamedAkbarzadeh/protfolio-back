import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
@Module({
  imports: [
    RouterModule.register([
      {
        path: '/api',
        children: [],
      },
    ]),
  ],
})
export class RouteModule {}
