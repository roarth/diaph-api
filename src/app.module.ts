import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmExModule } from './config/orm/typeorm-ex.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
