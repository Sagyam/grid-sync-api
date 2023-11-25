import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BatteryQueryDTO } from './dto/battery-query-dto';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { BatteryFindAllDTO, BatteryResponseDTO } from './dto/response.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';

@Injectable()
export class BatteryService {
  constructor(private prisma: PrismaService) {}

  async create(createBatteryDto: CreateBatteryDto) {
    return await this.prisma.battery.create({ data: createBatteryDto });
  }

  async createMany(createBatteryDto: CreateBatteryDto[]) {
    return await this.prisma.battery.createMany({ data: createBatteryDto });
  }

  async findAll(query?: BatteryQueryDTO): Promise<BatteryFindAllDTO> {
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 10;
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const sortBy = query?.sortBy || 'createdAt';
    const sortOrder = query?.sortOrder || 'desc';
    const where = this.buildDynamicFilter(query?.filter);

    const batteries = await this.prisma.battery.findMany({
      where,
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await this.prisma.battery.count({ where });

    return {
      batteries,
      total,
      page,
      pageSize,
    };
  }

  buildDynamicFilter(filterQuery: string) {
    if (!filterQuery) {
      return {};
    }
    const filterData = {
      AND: [],
    };

    const field = filterQuery.split(':')[0];
    const operator = filterQuery.split(':')[1];
    const value = filterQuery.split(':').slice(2).join(':');

    if (!field || !operator || !value) {
      return {};
    }

    switch (field) {
      case 'createdAt' || 'returnDate':
        filterData.AND.push({
          [field]: {
            [operator]: new Date(value).toISOString(),
          },
        });
        break;
      case 'wattCapacity':
        filterData.AND.push({
          [field]: {
            [operator]: parseInt(value),
          },
        });
        break;
      default:
        filterData.AND.push({
          [field]: {
            [operator]: value,
          },
        });
        break;
    }

    return filterData;
  }

  async findOne(id: string): Promise<BatteryResponseDTO> {
    const battery = await this.prisma.battery.findUnique({ where: { id } });
    if (!battery) {
      throw new HttpException('Battery not found', HttpStatus.NOT_FOUND);
    }
    return battery;
  }

  async update(
    id: string,
    updateBatteryDto: UpdateBatteryDto,
  ): Promise<BatteryResponseDTO> {
    const battery = await this.prisma.battery.findUnique({ where: { id } });
    if (!battery) {
      throw new HttpException('Battery not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.battery.update({
      where: { id },
      data: updateBatteryDto,
    });
  }

  async remove(id: string): Promise<BatteryResponseDTO> {
    const battery = await this.prisma.battery.findUnique({ where: { id } });
    if (!battery) {
      throw new HttpException('Battery not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.battery.delete({ where: { id } });
  }
}
