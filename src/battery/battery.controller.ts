import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  BatteryFindAllDTO,
  BatteryResponseDTO,
} from 'src/battery/dto/response.dto';
import { BatteryQueryDTO } from '../battery/dto/battery-query-dto';
import { BatteryService } from './battery.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';

@Controller('battery')
@UseInterceptors(CacheInterceptor)
export class BatteryController {
  constructor(private readonly batteryService: BatteryService) {}

  /**
   * This method creates a new battery in the database based on the provided battery data.
   *
   * @param {CreateBatteryDto} createBatteryDto - An object containing the data for the battery to be created.
   *
   * @returns {Promise<BatteryResponseDTO>} A Promise that resolves to the created battery.
   *
   * @post /battery
   */
  @Post()
  create(
    @Body() createBatteryDto: CreateBatteryDto,
  ): Promise<BatteryResponseDTO> {
    return this.batteryService.create(createBatteryDto);
  }

  /**
   * This method creates multiple batteries in the database based on the provided array of battery data.
   *
   * @param {CreateBatteryDto[]} createBatteryDto - An array of objects, each containing the data for a battery to be created.
   *
   * @returns {Promise<Prisma.BatchPayload>} A Promise that resolves to a BatteryResponseDTO object which contains the count of created batteries.
   *
   * @post /battery/multiple
   */
  @Post('multiple')
  createMany(@Body() createBatteryDto: CreateBatteryDto[]) {
    return this.batteryService.createMany(createBatteryDto);
  }

  /**
   * This method retrieves all the batteries from the database based on the provided query parameters.
   * It supports pagination, sorting, and filtering.
   *
   * @param {BatteryQueryDTO} query - An optional object containing query parameters.
   *
   * @returns {Promise<BatteryFindAllDTO>} A Promise that resolves to an object containing the retrieved batteries and pagination information.
   *
   * @get /battery
   */
  @Get()
  findAll(@Query() query: BatteryQueryDTO): Promise<BatteryFindAllDTO> {
    return this.batteryService.findAll(query);
  }

  /**
   * This method retrieves a battery from the database based on the provided id.
   *
   * @param {string} id - The id of the battery to be retrieved.
   *
   * @returns {Promise<BatteryResponseDTO>} A Promise that resolves to the retrieved battery.
   *
   * @get /battery/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<BatteryResponseDTO> {
    return this.batteryService.findOne(id);
  }

  /**
   * This method updates a battery in the database based on the provided id and update data.
   *
   * @param {string} id - The id of the battery to be updated.
   * @param {UpdateBatteryDto} updateBatteryDto - An object containing the data to update the battery with.
   *
   * @returns {Promise<BatteryResponseDTO>} A Promise that resolves to the updated battery.
   *
   * @patch /battery/:id
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBatteryDto: UpdateBatteryDto,
  ): Promise<BatteryResponseDTO> {
    return this.batteryService.update(id, updateBatteryDto);
  }

  /**
   * This method removes a battery from the database based on the provided id.
   *
   * @param {string} id - The id of the battery to be removed.
   *
   * @returns {Promise<BatteryResponseDTO>} A Promise that resolves to the removed battery.
   *
   * @delete /battery/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<BatteryResponseDTO> {
    return this.batteryService.remove(id);
  }
}
