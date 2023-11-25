import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPostalCode,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBatteryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsPostalCode()
  postCode: string;

  @IsNotEmpty()
  @IsNumber()
  wattCapacity: number;

  @IsOptional()
  @IsDate()
  returnDate?: Date | null;
}
