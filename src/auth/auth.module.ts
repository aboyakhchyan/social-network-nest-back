import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthModule } from "src/shared/jwt-auth/jwt-auth.module";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [TypeOrmModule.forFeature([User]), PassportModule, JwtAuthModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: []
})

export class AuthModule {}