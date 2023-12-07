import { Module } from '@nestjs/common';
import {UserRepository} from "../domain/UserRepository/UserRepository";
import {PrismaUserRepository} from "./PrismaUserRepository";

@Module({
    providers: [{
        provide: UserRepository,
        useClass: PrismaUserRepository,
    }],
    exports: [
        UserRepository
    ]
})
export class UsersModuleModule {}
