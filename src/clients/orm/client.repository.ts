import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from 'src/config/orm/typeorm-ex.decorator';
import { Client } from './client.entity';
import { GetClientsFilterDto } from '../dto/get-clients-filter.dto';

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
}
