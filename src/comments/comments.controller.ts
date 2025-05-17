import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/shared/jwt-auth/jwt-auth.guard';
import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller()
export class CommentsConroller {
  constructor(private readonly commentsService: CommentsService) {}

  @HttpCode(201)
  @Post('comment/:id')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Req() req: Request,
    @Param('id') postId: number,
    @Body() commentDto: CreateCommentDto,
  ) {
    const { id: userId } = req.user as { id: number };

    try {
      return await this.commentsService.createComment(
        userId,
        postId,
        commentDto,
      );
    } catch (err) {
      throw new BadRequestException(err.message || 'Something went wrong');
    }
  }

  @HttpCode(200)
  @Delete('comment/:id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Req() req: Request, @Param('id') commentId: number) {
    const { id: userId } = req.user as { id: number };

    try {
      return await this.commentsService.deleteComment(commentId, userId);
    } catch (err) {
      throw new BadRequestException(err.message || 'Something went wrong');
    }
  }
}
