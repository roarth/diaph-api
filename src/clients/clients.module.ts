import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/config/orm/typeorm-ex.module';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientRepository } from './orm/client.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmExModule.forCustomRepository([ClientRepository]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
