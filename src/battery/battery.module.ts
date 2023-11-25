import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BatteryController } from './battery.controller';
import { BatteryService } from './battery.service';

@Module({
  controllers: [BatteryController],
  providers: [BatteryService, PrismaService],
})
export class BatteryModule {}
