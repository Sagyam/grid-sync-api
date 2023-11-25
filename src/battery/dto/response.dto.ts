export class BatteryResponseDTO {
  name: string;
  postCode: string;
  wattCapacity: number;
  returnDate: Date;
  createdAt: Date;
}

export class BatteryFindAllDTO {
  batteries: BatteryResponseDTO[];
  total: number;
  page: number;
  pageSize: number;
}
