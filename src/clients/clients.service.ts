import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { GetClientsFilterDto } from './dto/get-clients-filter.dto';
import { Client } from './orm/client.entity';
import { ClientRepository } from './orm/client.repository';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
  ) {}
  private logger = new Logger('AllianceService');

  async getClients(filterDto: GetClientsFilterDto): Promise<Client[]> {
    return this.clientRepository.getClients(filterDto);
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    return this.clientRepository.createClient(createClientDto);
  }
}
