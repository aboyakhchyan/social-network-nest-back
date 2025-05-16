import { Controller, Get } from "@nestjs/common";
import { PostsService } from "./posts.service";

@Controller('post')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    getUser(): string {
        return "Hello post"
    }
}