import validator from "validator"
import { LoginDTO, RegisterDTO, UpgradeProfileDTO, UpdateTokenDTO } from "./AuthDTO"
import { InputException} from "../../Exception/InputException"
import { FieldError, validateRequired, validateMinLength, MIN_USER_LENGTH, validateRangeLength, MAX_USER_LENGTH, MIN_PASSWORD_LENGTH, BaseValidator } from "../../Shared/BaseValidator"


export class LoginValidator extends BaseValidator {
    readonly user:LoginDTO

    constructor(user:LoginDTO){
        super()
        this.user = user
    }

    validate(){
        this.errors.push(...validateUsername(this.user.username))
        this.errors.push(...validatePassword(this.user.password)) 
        if (this.errors.length > 0)
            throw new InputException(this.errors)
    }


}

export class RegisterValidator extends BaseValidator {
    readonly user:RegisterDTO

    constructor(user:RegisterDTO){
        super()
        this.user = user
    }

    validate(){
        this.errors.push(...validateUsername(this.user.username))
        this.errors.push(...validatePassword(this.user.password)) 
        this.errors.push(...validateFirstName(this.user.firstname)) 
        this.errors.push(...validateLastName(this.user.lastname)) 
        this.errors.push(...validateEmail(this.user.email)) 
        if (this.errors.length > 0)
            throw new InputException(this.errors)
    }


}

export class UpgradeProfileValidator extends BaseValidator {
    readonly user:UpgradeProfileDTO

    constructor(user:UpgradeProfileDTO){
        super()
        this.user = user
    }

    validate(){
        this.errors.push(...validateUsername(this.user.username))
        if (this.errors.length > 0)
            throw new InputException(this.errors)
    }


}

export class UpdateTokenValidator extends BaseValidator {
    readonly token:UpdateTokenDTO

    constructor(token:UpdateTokenDTO){
        super()
        this.token = token
    }

    validate(){
        this.errors.push(...validateRequired("refreshToken",this.token))
        if (this.errors.length > 0)
            throw new InputException(this.errors)
    }


}




export function validateUsername(username?:string){
    const errors:FieldError[] = [] 
    errors.push(...validateRequired("username",username))
    if(errors.length === 0)
        errors.push(...validateMinLength("username",username!,MIN_USER_LENGTH))
    
    return errors 
}

function validateFirstName(firstName?:string){
    const errors:FieldError[] = []
    errors.push(...validateRequired("firstName",firstName))
    if(errors.length === 0)
        errors.push(...validateRangeLength("firstName",firstName!,MIN_USER_LENGTH,MAX_USER_LENGTH))
    return errors 
}
function validateLastName(lastName?:string){
    const errors:FieldError[] = []
    errors.push(...validateRequired("lastName",lastName))
    if(errors.length === 0)
        errors.push(...validateRangeLength("lastName",lastName!,MIN_USER_LENGTH,MAX_USER_LENGTH))
    return errors 
}

function validateEmail(email?:string){
    const errors:FieldError[] = []
    errors.push(...validateRequired("email",email))
    if (errors.length === 0 && !validator.isEmail(email!))
        errors.push({property:"email",error:"Invalid Email"})
    return errors        
}

function validatePassword(password?:string){
    const errors:FieldError[] = []
    errors.push(...validateRequired("password",password))
    if (errors.length === 0)
        errors.push(...validateMinLength("password",password!,MIN_PASSWORD_LENGTH))     
    return errors
}


