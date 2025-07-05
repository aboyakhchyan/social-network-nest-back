import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IAuthUserResponse, EditUserBody } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getUsers(): Promise<IAuthUserResponse[]> {
    const users = await this.userRepo.find();

    const filteredUsers = users.map(({ password, ...user }) => user);

    return filteredUsers;
  }

  async getUser(id: number): Promise<IAuthUserResponse> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['posts'],
    });

    if (!user) {
      throw new BadRequestException('No such user exists.');
    }

    const { password, ...safeUser } = user;

    return safeUser;
  }

  async editUser(id: number, user: EditUserBody): Promise<IAuthUserResponse> {
    const { username, password } = user;

    const existingUser = await this.userRepo.findOne({
      where: { id },
      relations: ['posts'],
    });

    if (!existingUser) {
      throw new BadRequestException('User not found.');
    }

    if (username) {
      existingUser.username = username;
    }

    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      existingUser.password = hashedPassword;
    }

    await this.userRepo.save(existingUser);

    return existingUser;
  }
}
