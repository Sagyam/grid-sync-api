import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

enum SortBy {
  NAME = 'name',
  ID = 'id',
  CREATED_AT = 'createdAt',
  POST_CODE = 'postCode',
  WATT_CAPACITY = 'wattCapacity',
  RETURN_DATE = 'returnDate',
}

export class BatteryQueryDTO {
  @IsOptional()
  @IsNumber()
  @Type()
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type()
  pageSize?: number;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @IsOptional()
  filter?: string;
}
