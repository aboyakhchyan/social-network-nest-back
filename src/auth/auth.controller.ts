import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user-dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/shared/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async signUp(@Body() userDto: AuthUserDto) {
    try {
      return await this.authService.signUp(userDto);
    } catch (err) {
      throw new BadRequestException(err.message || 'Something went wrong');
    }
  }

  @Post('login')
  async sigIn(
    @Body() userDto: AuthUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { token, user } = await this.authService.signIn(userDto);
      const nodeEnv = this.configService.get('nodeEnv');

      res.cookie('token', token, {
        httpOnly: true,
        secure: nodeEnv === 'development',
        maxAge: 360000,
        sameSite: 'strict',
      });

      return user;
    } catch (err) {
      throw new UnauthorizedException(err.message || 'Something went wrong');
    }
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req) {
    return req.user
  }
}
