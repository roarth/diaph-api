import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ClientsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
