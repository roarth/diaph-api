import {
  Controller,
  Get,
  Logger,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientsService } from './clients.service';
import { GetClientsFilterDto } from './dto/get-clients-filter.dto';
import { Client } from './orm/client.entity';

@Controller('clients')
@UseGuards(AuthGuard())
export class ClientsController {
  constructor(private clientsService: ClientsService) {}
  private logger = new Logger('ClientsController');

  @Get()
  getClients(
    @Query(ValidationPipe) filterDto: GetClientsFilterDto,
  ): Promise<Client[]> {
    this.logger.verbose(
      `Retrieving all Clients. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.clientsService.getClients(filterDto);
  }
}
