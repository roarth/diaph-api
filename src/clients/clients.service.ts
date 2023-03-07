import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/orm/user.entity';
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

  async createClient(
    createClientDto: CreateClientDto,
    user: User,
  ): Promise<Client> {
    return this.clientRepository.createClient(createClientDto, user);
  }
}
