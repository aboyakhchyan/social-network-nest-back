import { Module } from "@nestjs/common";
import { CommentsConroller } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    controllers: [CommentsConroller],
    providers: [CommentsService],
    exports: []
})

export class CommentsModule {}