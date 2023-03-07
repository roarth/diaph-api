import { Module } from '@nestjs/common';
import { UserRepository } from 'src/users/orm/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/users/orm/user.service';
import { TypeOrmExModule } from 'src/config/orm/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN) || 3600,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [],
})
export class AuthModule {}
