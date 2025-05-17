import { Module } from "@nestjs/common";
import { CommentsConroller } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";
import { Post } from "src/posts/post.entity";
import { User } from "src/users/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Post, User])],
    controllers: [CommentsConroller],
    providers: [CommentsService],
    exports: []
})

export class CommentsModule {}