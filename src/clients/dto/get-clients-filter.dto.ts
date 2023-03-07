import { IsOptional } from 'class-validator';

export class GetClientsFilterDto {
  @IsOptional()
  search: string;
}
