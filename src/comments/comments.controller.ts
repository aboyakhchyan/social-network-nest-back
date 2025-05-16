import { Controller } from "@nestjs/common";
import { CommentsService } from "./comments.service";

@Controller()
export class CommentsConroller {
    constructor(private readonly commentsService: CommentsService) {}


}