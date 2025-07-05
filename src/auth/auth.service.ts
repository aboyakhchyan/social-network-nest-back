import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserBody, IAuthUserResponse } from 'src/interfaces/user.interface';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: AuthUserBody): Promise<IAuthUserResponse> {
    const { username, password } = user;

    const checkUser = await this.userRepo.findOne({
      where: { username },
    });

    if (checkUser) {
      throw new BadRequestException(
        'A user with that name is already registered.',
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await this.userRepo.create({
      username,
      password: hashedPassword,
    });

    const { password: userPassword, ...createdUser } =
      await this.userRepo.save(newUser);

    return createdUser;
  }

  async signIn(
    user: AuthUserBody,
  ): Promise<{ user: AuthUserBody; token: string }> {
    const { username, password } = user;

    const checkUser = await this.userRepo.findOne({
      where: { username },
    });

    if (!checkUser) {
      throw new UnauthorizedException('The username or password is incorrect.');
    }

    const checkPassword = bcrypt.compareSync(password, checkUser.password);

    if (!checkPassword) {
      throw new UnauthorizedException('The username or password is incorrect.');
    }

    const token = this.jwtService.sign({
      id: checkUser.id,
      username: checkUser.username,
    });

    return {
      token,
      user,
    };
  }
}
