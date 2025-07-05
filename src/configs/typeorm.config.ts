import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Comment } from 'src/comments/comment.entity';
import { Like } from 'src/posts/like.entity';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const db = configService.get('db');

  return {
    type: 'postgres',
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.name,
    autoLoadEntities: true,
    entities: [User, Post, Like, Comment],
    synchronize: false,
  };
};
