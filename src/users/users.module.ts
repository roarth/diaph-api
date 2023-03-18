import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/config/orm/typeorm-ex.module';
import { UserRepository } from './orm/user.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
})
export class UsersModule {}
