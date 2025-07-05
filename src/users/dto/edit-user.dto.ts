import { IsOptional, IsString, MinLength } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4, {
    message: 'Username must be at least four characters long.',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least six characters long.',
  })
  password?: string;
}
