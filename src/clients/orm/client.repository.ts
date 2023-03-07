import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from 'src/config/orm/typeorm-ex.decorator';
import { Client } from './client.entity';
import { GetClientsFilterDto } from '../dto/get-clients-filter.dto';
import { CreateClientDto } from '../dto/create-client.dto';
import { User } from 'src/users/orm/user.entity';

@CustomRepository(Client)
export class ClientRepository extends Repository<Client> {
  private logger = new Logger('ClientRepository');

  async getClients(filterDto: GetClientsFilterDto): Promise<Client[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('client').orderBy(
      'client.created',
      'DESC',
    );

    if (search) {
      query.andWhere('client.name LIKE :search', { search: `%${search}%` });
    }

    try {
      const clients = await query.getMany();
      return clients;
    } catch (error) {
      this.logger.error(
        `Failed to get Clients, Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createClient(
    createClientDto: CreateClientDto,
    user: User,
  ): Promise<Client> {
    const client = new Client();
    const { name } = createClientDto;
    client.name = name;
    client.creator = user;

    try {
      await client.save();
      delete client.creator;
      this.logger.verbose(`Created the Client w/ id: ${client.id}`);

      return client;
    } catch (error) {
      this.logger.error(error.stack);
    }
  }
}
