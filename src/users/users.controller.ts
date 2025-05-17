import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/shared/jwt-auth/jwt-auth.guard';
import { Request } from 'express';
import { EditUserDto } from './dto/edit-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get('users')
  async getUsers() {
    try {
      return await this.usersService.getUsers();
    } catch (err) {
      throw new BadRequestException(err.message || 'Something went wrong');
    }
  }

  @HttpCode(200)
  @Get('user/:id')
  async getUser(@Param('id') id: number) {
    try {
      return await this.usersService.getUser(id);
    } catch (err) {
      throw new BadRequestException(err.message || 'Something went wrong');
    }
  }

  @HttpCode(200)
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    const { id } = req.user;

    try {
      return await this.usersService.getUser(id);
    } catch (err) {
      throw new BadRequestException(err.message || 'Something went wrong');
    }
  }

  @HttpCode(202)
  @Patch('user/:id')
  @UseGuards(JwtAuthGuard)
  async editUser(@Req() req: Request,@Param('id') id: number, @Body() userDto: EditUserDto) {
    const {id: userId} = req.user as {id: number};

    if(userId !== id) {
      throw new ForbiddenException('Forbidden');
    }

    try {
        return await this.usersService.editUser(id, userDto);
    } catch (err) {
        throw new BadRequestException(err.message || 'Something went wrong');
    }
  }
}
