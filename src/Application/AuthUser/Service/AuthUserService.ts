import { AuthUserRepository } from "../../../Domain/AuthUser/AuthUserRepository";
import { AuthUser } from "../../../Domain/AuthUser/AuthUser";
import { Query } from "../../../Shared/QueryBuilder";
import {  generateRefreshToken,  generateStandarToken, verifyRefreshToken, getClaimsFromToken, InvalidTokenException} from "../../../Domain/Shared/TokenManager";
import {PasswordException, DuplicateUserException, UserNotFoundException } from "../../../Domain/Shared/DomainError";
import bcrypt from "bcryptjs"
import { FullName } from "../../../Domain/AuthUser/FullName";

export class AuthUserService {
    private readonly authRepository:AuthUserRepository
    private readonly validator:AuthServiceValidator

    constructor(repository:AuthUserRepository, authServiceValidator:AuthServiceValidator){
        this.authRepository = repository
        this.validator = authServiceValidator
    }

    async addPublisherProfile(username:string){
        const user = await this.authRepository.findByIdOrNull(username)
        if (user === null)
            throw new UserNotFoundException()
        user.addPublisherProfile()
        await this.authRepository.save(user)
    }

    async registerAsPublisher(email:string,password:string,username:string,name:string,lastname:string){
        await this.validator.checkUniqueUser(username)
        const user = new AuthUser(username,new FullName(name,lastname),email,await bcrypt.hash(password, 8),generateRefreshToken(username))
        user.addPublisherProfile()
        await this.authRepository.save(user)
        return {token:generateStandarToken(user),refreshToken:user.refreshToken}
    }

    async register(email:string,password:string,username:string,firstName:string,lastname:string){
        await this.validator.checkUniqueUser(username)
        const user = new AuthUser(username,new FullName(firstName,lastname),email,await bcrypt.hash(password, 8),generateRefreshToken(username))
        await this.authRepository.save(user)
        return {token:generateStandarToken(user),refreshToken:user.refreshToken}
    }

    async login(username:string,password:string){
        const query:Query<AuthUser> = {
            where:[{property:"username",eq:username}]
        }
        const user = await this.authRepository.findOneOrNull(query)
        if (user === null)
            throw new UserNotFoundException();
        if (!await user.comparePassword(password))
            throw new PasswordException()
        user.refreshToken = generateRefreshToken(user.username)
        return {token:generateStandarToken(user),refreshToken:user.refreshToken}
        
    }

    async updateToken(refreshToken:string){
        verifyRefreshToken(refreshToken)

        const {username} = getClaimsFromToken(refreshToken)
        const query:Query<AuthUser> = {
            where:[{property:"username",eq:username}]
        }
        const user =  await this.authRepository.findOneOrNull(query)
        if (user === null)
            throw new UserNotFoundException()
        if (user.refreshToken !== refreshToken )
            throw new InvalidTokenException("Refresh Token")

        return {token:generateStandarToken(user),refreshToken:refreshToken}    
    }

}

export class AuthServiceValidator {
    private readonly authRepository:AuthUserRepository

    constructor(authRepository:AuthUserRepository){
        this.authRepository = authRepository;
    }

    async checkUniqueUser(username:string) {
        const query: Query<AuthUser> = {
            where: [
            {property:"username",eq:username}    
            ]   
        };

        const user = await this.authRepository.findOneOrNull(query);
        if (user !== null)
            throw new DuplicateUserException();
    }

     async validateUserPassword(email: string, password: string) {
        const query: Query<AuthUser> = {
            where: [
                {property:"email",eq:email}
            ]
        };
        const user = await this.authRepository.findOneOrNull(query);
        if (user === null)
            throw new UserNotFoundException()
        if (!user.comparePassword(password))
            throw new PasswordException();
        return user;
    }
}