import { BaseRepository } from "../Shared/BaseRepository";
import { AuthUser } from "./AuthUser";

export interface AuthUserRepository extends BaseRepository<AuthUser,AuthUser["username"]>{
    populatePublisher(username:string):Promise<AuthUser>
}