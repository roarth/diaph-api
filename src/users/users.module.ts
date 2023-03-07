import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './orm/user.repository';

@Module({ imports: [TypeOrmModule.forFeature([UserRepository])] })
export class UsersModule {}
