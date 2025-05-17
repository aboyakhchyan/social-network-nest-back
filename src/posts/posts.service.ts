import { BadRequestException, Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePostBody,
  EditPostBody,
  IPost,
  IPostResponse,
} from 'src/interfaces/post.interface';
import { User } from 'src/users/user.entity';
import { Like } from './like.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
  ) {}

  async getPost(id: number): Promise<IPostResponse> {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['author', 'comments', 'likes.user'],
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    const { author: authorData, ...postData } = post;
    const { password, ...data } = authorData;

    return {
      ...postData,
      author: data,
    };
  }

  async createPost(id: number, post: CreatePostBody): Promise<IPostResponse> {
    const { title, content } = post;

    const author = await this.userRepo.findOne({
      where: { id },
    });

    if (!author) {
      throw new Error('User not found');
    }

    const newPost = await this.postRepo.create({
      title,
      content,
      author,
    });

    const createdPost = await this.postRepo.save(newPost);

    const { author: authorData, ...postData } = createdPost;
    const { password, ...data } = authorData;

    return {
      ...postData,
      author: data,
    };
  }

  async editPost(id: number, post: EditPostBody): Promise<IPostResponse> {
    const { title, content } = post;

    const existingPost = await this.postRepo.findOne({
      where: { id },
    });

    if (!existingPost) {
      throw new BadRequestException('Post not found');
    }

    if (title) {
      existingPost.title = title;
    }
    if (content) {
      existingPost.content = content;
    }

    const updatedPost = await this.postRepo.save(existingPost);
    const { author: authorData, ...postData } = updatedPost;
    const { password, ...data } = authorData;

    return {
      ...postData,
      author: data,
    };
  }

  async deletePost(id: number): Promise<IPost> {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    await this.postRepo.remove(post);
    return post;
  }

  async toggleLike(
    userId: number,
    postId: number,
  ): Promise<{ likesCount: number }> {
    const existingLike = await this.likeRepo.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (existingLike) {
      await this.likeRepo.remove(existingLike);
    } else {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      const post = await this.postRepo.findOne({ where: { id: postId } });

      if (!user || !post) {
        throw new BadRequestException('User or Post not found');
      }
      const newLike = this.likeRepo.create({
        user,
        post,
      });
      await this.likeRepo.save(newLike);
    }

    const likesCount = await this.likeRepo.count({
      where: { post: { id: postId } },
    });
    return { likesCount };
  }
}
