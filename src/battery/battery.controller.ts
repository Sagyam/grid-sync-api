import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BatteryQueryDTO } from '../battery/dto/battery-query-dto';
import { BatteryService } from './battery.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';

@Controller('battery')
export class BatteryController {
  constructor(private readonly batteryService: BatteryService) {}

  @Post()
  create(@Body() createBatteryDto: CreateBatteryDto) {
    return this.batteryService.create(createBatteryDto);
  }

  @Post('multiple')
  createMany(@Body() createBatteryDto: CreateBatteryDto[]) {
    return this.batteryService.createMany(createBatteryDto);
  }

  @Get()
  findAll(@Query() query: BatteryQueryDTO) {
    return this.batteryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.batteryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBatteryDto: UpdateBatteryDto) {
    return this.batteryService.update(id, updateBatteryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.batteryService.remove(id);
  }
}
