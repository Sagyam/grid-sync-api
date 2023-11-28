import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/extension';
import { PrismaService } from '../prisma/prisma.service';
import { BatteryQueryDTO } from './dto/battery-query-dto';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { BatteryFindAllDTO, BatteryResponseDTO } from './dto/response.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';

@Injectable()
export class BatteryService {
  constructor(private prisma: PrismaService) {}

  /**
   * This method creates a new battery in the database based on the provided battery data.
   *
   * @param {CreateBatteryDto} createBatteryDto - An object containing the data for the battery to be created.
   *
   * @returns {Promise<BatteryResponseDTO>} A Promise that resolves to the created battery.
   *
   * @throws {Prisma.PrismaClientKnownRequestError} If there's a problem with the database query.
   * @async
   */
  async create(createBatteryDto: CreateBatteryDto) {
    return await this.prisma.battery.create({ data: createBatteryDto });
  }

  /**
   * This method creates multiple batteries in the database based on the provided array of battery data.
   *
   * @param {CreateBatteryDto[]} createBatteryDto - An array of objects, each containing the data for a battery to be created.
   *
   * @returns {Promise<Prisma.BatchPayload>} A Promise that resolves to a BatchPayload object which contains the count of created batteries.
   *
   * @throws {Prisma.PrismaClientKnownRequestError} If there's a problem with the database query.
   * @async
   */
  async createMany(createBatteryDto: CreateBatteryDto[]) {
    return await this.prisma.battery.createMany({ data: createBatteryDto });
  }

  /**
   * This method retrieves all the batteries from the database based on the provided query parameters.
   * It supports pagination, sorting, and filtering.
   *
   * @param {BatteryQueryDTO} query - An optional object containing query parameters.
   * @param {number} query.page - The page number for pagination. Defaults to 1 if not provided.
   * @param {number} query.pageSize - The number of items per page for pagination. Defaults to 10 if not provided.
   * @param {string} query.sortBy - The field to sort the results by. Defaults to 'createdAt' if not provided.
   * @param {'asc' | 'desc'} query.sortOrder - The order to sort the results in. Defaults to 'desc' if not provided.
   * @param {string} query.filter - A string representing a filter query.
   *
   * @returns {Promise<BatteryFindAllDTO>} A Promise that resolves to an object containing the retrieved batteries and pagination information.
   * @returns {BatteryResponseDTO[]} return.batteries - An array of the retrieved batteries.
   * @returns {number} return.total - The total number of batteries in the database.
   * @returns {number} return.page - The current page number.
   * @returns {number} return.pageSize - The current page size.
   * @returns {number} return.totalPages - The total number of pages.
   *
   * @throws {Prisma.PrismaClientKnownRequestError} If there's a problem with the database query.
   * @async
   */
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
    const totalPages = Math.ceil(total / pageSize);

    return {
      batteries,
      total,
      page,
      pageSize,
      totalPages: totalPages,
    };
  }

  /**
   * This method retrieves a battery from the database based on the provided id.
   *
   * @param {string} id - The id of the battery to be retrieved.
   *
   * @returns {Promise<BatteryResponseDTO>} A Promise that resolves to the retrieved battery.
   *
   * @throws {HttpException} If the battery with the provided id is not found in the database.
   * @async
   */
  async findOne(id: string): Promise<BatteryResponseDTO> {
    const battery = await this.prisma.battery.findUnique({ where: { id } });
    if (!battery) {
      throw new HttpException('Battery not found', HttpStatus.NOT_FOUND);
    }
    return battery;
  }

  /**
   * This method updates a battery in the database based on the provided id and update data.
   *
   * @param {string} id - The id of the battery to be updated.
   * @param {UpdateBatteryDto} updateBatteryDto - An object containing the data to update the battery with.
   *
   * @returns {Promise<BatteryResponseDTO>} A Promise that resolves to the updated battery.
   *
   * @throws {HttpException} If the battery with the provided id is not found in the database.
   * @async
   */
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

  /**
   * This method removes a battery from the database based on the provided id.
   *
   * @param {string} id - The id of the battery to be removed.
   *
   * @returns {Promise<BatteryResponseDTO>} A Promise that resolves to the removed battery.
   *
   * @throws {HttpException} If the battery with the provided id is not found in the database.
   * @async
   */
  async remove(id: string): Promise<BatteryResponseDTO> {
    const battery = await this.prisma.battery.findUnique({ where: { id } });
    if (!battery) {
      throw new HttpException('Battery not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.battery.delete({ where: { id } });
  }

  /**
   * This method builds a dynamic filter object based on the provided filter query string.
   * The filter query string is expected to be in the format 'field:operator:value'.
   * The method supports the following fields: 'createdAt', 'returnDate', and 'wattCapacity'.
   * For other fields, the filter is applied as a case-insensitive string comparison.
   *
   * @param {string} filterQuery - A string representing a filter query.
   *
   * @returns {Object} An object representing the filter to be applied to the database query.
   * @returns {Object[]} return.AND - An array of filter conditions to be combined using logical AND.
   *
   * @example
   * // returns { AND: [ { createdAt: { equals: new Date('2022-01-01').toISOString() } } ] }
   * buildDynamicFilter('createdAt:equals:2022-01-01')
   *
   * @example
   * // returns { AND: [ { wattCapacity: { equals: 1000 } } ] }
   * buildDynamicFilter('wattCapacity:equals:1000')
   *
   * @example
   * // returns { AND: [ { manufacturer: { equals: 'Tesla', mode: 'insensitive' } } ] }
   * buildDynamicFilter('manufacturer:equals:Tesla')
   */
  private buildDynamicFilter(filterQuery: string): object {
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
            mode: 'insensitive',
          },
        });
        break;
    }

    return filterData;
  }
}
