import { AuthUserRepository } from "../../Domain/AuthUser/AuthUserRepository";
import { AuthUser } from "../../Domain/AuthUser/AuthUser";
import { Query } from "../../Domain/Shared/QueryBuilder";
import { Publisher } from "../../Domain/Publisher/Publisher";
import { generatePublisherToken, generateRefreshToken, generateShopperToken } from "../../Domain/Shared/TokenManager";
import { PublisherNotFoundException, ShopperNotFoundException, PasswordException, DuplicateUserException } from "../../Domain/Shared/DomainError";

export class AuthUserService {
    private readonly authRepository:AuthUserRepository
    private readonly validator:AuthServiceValidator

    constructor(repository:AuthUserRepository, authServiceValidator:AuthServiceValidator){
        this.authRepository = repository
        this.validator = authServiceValidator
    }
    
    async loginShopper(email:string,password:string){
        const user = await this.validator.validateUserPassword(email, password);
        if (user.shopperProfile === undefined)
            throw new ShopperNotFoundException(); 
        return {token: generateShopperToken(user), refreshToken: generateRefreshToken(user)} 
    }
    
    async loginPublisher(email:string,password:string){
        const user = await this.validator.validateUserPassword(email, password);
        if (user.publisherProfile === undefined)
            throw new PublisherNotFoundException(); 
        return {token: generatePublisherToken(user), refreshToken: generateRefreshToken(user)}       
    }

    async registerPublisher(auth:AuthUser,publisher:Publisher){
        const user = await this.validator.checkUniqueUser(auth);
        user.addPublihserProfile(publisher)
        await this.authRepository.save(user)
        return {token : generatePublisherToken(user), refreshToken: generateRefreshToken(user)}
    }

    async registerShopper(auth:AuthUser,publisher:Publisher){
        const user = await this.validator.checkUniqueUser(auth);
        auth.addPublihserProfile(publisher)
        await this.authRepository.save(auth)
        return {token : generateShopperToken(user), refreshToken: generateRefreshToken(user)}
    }
}

export class AuthServiceValidator {
    private readonly authRepository:AuthUserRepository

    constructor(authRepository:AuthUserRepository){
        this.authRepository = authRepository;
    }

    async checkUniqueUser(auth: AuthUser) {
        const query: Query<AuthUser> = {
            where: [
            {property:"username",eq:auth.username}    
            ]   
        };

        const user = await this.authRepository.findOneOrNull(query);
        if (user === null)
            throw new DuplicateUserException();
        return user;
    }

     async validateUserPassword(email: string, password: string) {
        const query: Query<AuthUser> = {
            where: [
                {property:"email",eq:email}
            ]
        };
        const user = await this.authRepository.findOne(query);
        if (!user.comparePassword(password))
            throw new PasswordException();
        return user;
    }
}