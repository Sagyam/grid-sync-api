import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BatteryModule } from './battery/battery.module';

@Module({
  imports: [ConfigModule.forRoot(), BatteryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
