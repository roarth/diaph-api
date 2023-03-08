import { Test } from '@nestjs/testing';
import { before } from 'node:test';
import { User } from '../../src/users/orm/user.entity';
import { ClientsService } from './clients.service';
import { GetClientsFilterDto } from './dto/get-clients-filter.dto';
import { ClientRepository } from './orm/client.repository';

const mockClientRepository = () => ({
  getClients: jest.fn(),
  createClient: jest.fn(),
});

describe('ClientsService', () => {
  let clientsService: ClientsService;
  let clientRepository: ClientRepository;
  let mockUser: User;

  before(() => {
    mockUser = new User();
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ClientsService,
        { provide: ClientRepository, useFactory: mockClientRepository },
      ],
    }).compile();

    clientsService = await module.get<ClientsService>(ClientsService);
    clientRepository = await module.get<ClientRepository>(ClientRepository);
  });

  describe('getClients', () => {
    it('should get all clients from the repository', async () => {
      (clientRepository.getClients as jest.Mock).mockResolvedValue('someValue');

      expect(clientRepository.getClients).not.toHaveBeenCalled();
      const filters: GetClientsFilterDto = {
        search: 'Noux',
      };
      const result = await clientsService.getClients(filters);
      expect(clientRepository.getClients).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('createClient', () => {
    it('should calls clientRepository.createClient() and returns the result', async () => {
      (clientRepository.createClient as jest.Mock).mockResolvedValue(
        'someClient',
      );
      expect(clientRepository.createClient).not.toHaveBeenCalled();

      const createClientDto = {
        name: 'Test Client',
      };

      const result = await clientsService.createClient(
        createClientDto,
        mockUser,
      );
      expect(clientRepository.createClient).toHaveBeenCalledWith(
        createClientDto,
        mockUser,
      );
      expect(result).toEqual('someClient');
    });
  });
});
