import validator from "validator"
import { LoginRequest, RegisterRequest, UpgradeProfileRequest, UpdateTokenRequest } from "./HttpRequest"
import { ApiException} from "../../Exception/InputException"

export const MAX_USER_LENGTH = 10
export const MIN_PASSWORD_LENGTH = 6

export interface FieldError{
    property:string,
    error:string
}

export class LoginValidator {
    readonly user:LoginRequest
    private  errors: FieldError[] = [] 

    constructor(user:LoginRequest){
        this.user = user
    }

    validate(){
        validateUsername(this.errors,this.user.username)
        validatePassword(this.errors,this.user.password)
        if (this.errors.length > 0)
            throw new ApiException(this.errors)
    }


}

export class RegisterValidator {
    readonly user:RegisterRequest
    private  errors: FieldError[] = [] 

    constructor(user:RegisterRequest){
        this.user = user
    }

    validate(){
        validateUsername(this.errors,this.user.username)
        validatePassword(this.errors,this.user.password)
        validateFirstName(this.errors,this.user.firstname)
        validateLastName(this.errors,this.user.lastname)
        validateEmail(this.errors,this.user.email)
        if (this.errors.length > 0)
            throw new ApiException(this.errors)
    }


}

export class UpgradeProfileValidator {
    readonly user:UpgradeProfileRequest
    private  errors: FieldError[] = [] 

    constructor(user:UpgradeProfileRequest){
        this.user = user
    }

    validate(){
        validateUsername(this.errors,this.user.username)
        if (this.errors.length > 0)
            throw new ApiException(this.errors)
    }


}

export class UpdateTokenValidator {
    readonly token:UpdateTokenRequest
    private  errors: FieldError[] = [] 

    constructor(token:UpdateTokenRequest){
        this.token = token
    }

    validate(){
        validateRefreshToken(this.errors,this.token.refreshToken)
        if (this.errors.length > 0)
            throw new ApiException(this.errors)
    }


}


function validateRefreshToken(errors:FieldError[],refreshToken:string){
    if (refreshToken === undefined )
        errors.push({property:"refresh Token",error:"Refresh Token is required"})
}


function validateUsername(errors:FieldError[],username?:string){
    if (username === undefined || username.length <= 0 ) 
        errors.push({property:"username",error:"The username is required"})
}

function validateFirstName(errors:FieldError[],firstName?:string){
    if (firstName === undefined || firstName.length <= 0 )
        errors.push({property:"firstName",error:"The firstname is required"})
}
function validateLastName(errors:FieldError[],firstName?:string){
    if (firstName === undefined || firstName.length <= 0 )
        errors.push({property:"lastName",error:"The lastName is required"})
}

function validateEmail(errors:FieldError[],email?:string){
    if (email === undefined || !validator.isEmail(email))
        errors.push({property:"email",error:"Invalid Email"})
}

function validatePassword(errors:FieldError[],password?:string){
    if (password === undefined){
        errors.push({property:"password",error:"The password is required"})
        
    }else{
        if (password.length <= MIN_PASSWORD_LENGTH)
        errors.push({property:"password",error: `Passworn must contains ${MIN_PASSWORD_LENGTH} characters`})
    }
         
    
}