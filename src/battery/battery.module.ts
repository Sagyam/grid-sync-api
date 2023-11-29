import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from '../prisma/prisma.service';
import { BatteryController } from './battery.controller';
import { BatteryService } from './battery.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [BatteryController],
  providers: [
    BatteryService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class BatteryModule {}
