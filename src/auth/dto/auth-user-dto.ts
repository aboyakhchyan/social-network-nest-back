import { IsString, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @MinLength(4, {
    message: 'Username must be at least four characters long.',
  })
  username: string;

  @IsString()
  @MinLength(6, {
    message: 'Password must be at least six characters long.',
  })
  password: string;
}
