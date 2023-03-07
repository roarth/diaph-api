import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmExModule } from './config/orm/typeorm-ex.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    TypeOrmExModule.forCustomRepository([]),
    AuthModule,
    ClientsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
