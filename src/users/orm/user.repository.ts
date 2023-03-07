import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CustomRepository } from 'src/config/orm/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async register(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ email: string }> {
    const { email, password } = authCredentialsDto;
    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      this.logger.verbose(`New user Registration: ${user.id}`);
      return {
        email: user.email,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username/Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'salt'],
    });

    if (user && (await user.validatePassword(password))) {
      if (user) {
        this.logger.debug(
          `Failed login attempt for inactive user w/ id: "${user.id}".`,
        );
        throw new UnauthorizedException(
          `Your account is not active for now. Check the email in your inbox`,
        );
      }

      return { email: user.email };
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
