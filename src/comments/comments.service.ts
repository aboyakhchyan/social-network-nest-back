import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import {
  CreateComment,
  ICommentResponse,
} from 'src/interfaces/comment.interface';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createComment(
    userId: number,
    postId: number,
    comment: CreateComment,
  ): Promise<ICommentResponse> {
    const existingPost = await this.postRepo.findOne({
      where: { id: postId },
    });

    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!existingPost || !user) {
      throw new BadRequestException('Something went wrong');
    }

    const newComment = await this.commentRepo.create({
      user,
      post: existingPost,
      text: comment.text,
    });

    const createdComment = await this.commentRepo.save(newComment);

    return createdComment;
  }

  async deleteComment(
    commentId: number,
    userId: number,
  ): Promise<{ message: string; commentId: number }> {
    const existingComment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['user'],
    });

    if (!existingComment) {
      throw new BadRequestException('Comment not found');
    }

    if (existingComment.user.id !== userId) {
      throw new BadRequestException(
        'You are not allowed to delete this comment',
      );
    }

    await this.commentRepo.remove(existingComment);

    return {
      message: 'Comment deleted successfully',
      commentId,
    };
  }
}
