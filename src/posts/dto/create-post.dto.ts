import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  title: string;

  @IsString()
  @MinLength(8)
  content: string;
}

export class EditPostDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  content?: string;
}
