import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('clients')
@UseGuards(AuthGuard())
export class ClientsController {
  @Get()
  getClients() {
    return { message: 'hello', status: 1 };
  }
}
