import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { User } from "src/users/user.entity";
import { Like } from "./like.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Post, User, Like])],
    controllers: [PostsController],
    providers: [PostsService],
    exports: []
})

export class PostsModule {}