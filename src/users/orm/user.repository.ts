import { Logger, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({
      where: { email },
      select: ['id', 'email', 'username', 'password', 'salt'],
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

      return { username: user.username, email: user.email };
    } else {
      return null;
    }
  }
}
