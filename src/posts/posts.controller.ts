import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, EditPostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/shared/jwt-auth/jwt-auth.guard';
import { Request } from 'express';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpCode(200)
  @Get('post/:id')
  async getPost(@Param('id') id: number) {
    try {
      return await this.postsService.getPost(id);
    } catch (err) {
      throw new BadRequestException(err.message || 'Something went wrong');
    }
  }

  @HttpCode(201)
  @Post('post')
  @UseGuards(JwtAuthGuard)
  async createPost(@Req() req: Request, @Body() postDto: CreatePostDto) {
    const { id } = req.user as { id: number };

    try {
      return await this.postsService.createPost(id, postDto);
    } catch (err) {
      throw new BadRequestException(err.message || 'Something went wrong');
    }
  }

  @HttpCode(202)
  @Patch('post/:id')
  async editPost(@Param('id') id: number, @Body() postDto: EditPostDto) {
    try {
      return await this.postsService.editPost(id, postDto);
    } catch (err) {
      throw new BadRequestException(err.message || 'Something went wrong');
    }
  }


  @HttpCode(200)
  @Delete('post/:id')
  async deletePost(@Param('id') id: number) {
    try {
      return await this.postsService.deletePost(id);
    }catch (err) {
      throw new BadRequestException(err.message || 'Something went wrong');
    }
  }

  @HttpCode(201)
  @Post('post/like/:id')
  @UseGuards(JwtAuthGuard)
  async toggleLike(@Req() req: Request, @Param('id') postId: number) {
    const { id: userId } = req.user as { id: number };

    try {
      return await this.postsService.toggleLike(userId, postId);
    } catch (err) {
      throw new BadRequestException(err.message || 'Something went wrong');
    }
  }
}
