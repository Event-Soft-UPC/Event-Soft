import CreatePublisherDTO from "../../Application/DTO/CreatePublisherDTO";
import validator from "validator";

abstract class PublisherValidator{
    protected _errors:string[]

    constructor(){
        this._errors = []
    }

    get errors(){
        return this._errors;
    }

    isValid(){
        return this._errors.length === 0;
    }


    abstract validate():void;

}

export class CreatePublisherValidator extends PublisherValidator {

    private readonly publisher:CreatePublisherDTO;

    constructor(publisher:CreatePublisherDTO){
        super();
        this.publisher = publisher;
    }

    validate(): void {
        this.errors.push(...validateEmail(this.publisher.email))
        this.errors.push(...validateDNI(this.publisher.dni))
        this.errors.push(...validatePassword(this.publisher.password))
        this.errors.push(...validateName(this.publisher.name))
    }
    
}

function validateEmail(email:string){
    const errors:string[] = []
    if(email === undefined || !validator.isEmail(email))
        errors.push("Invalid Email")
    return errors;
}

function validatePassword(password:string){
    const errors:string[] = []
    if (password === undefined || password.length === 0 )
        errors.push("Invalid Password")
    return errors;
} 
function validateDNI(dni:string){
    const errors:string[] = [];
    if (dni === undefined || dni.length !== 8)
        errors.push("Invalid DNI")
    return errors;
}
function validateName(name:string){
    const errors:string[] = [];
    if ( name === undefined || name.length === 0)
        errors.push("Invalid Name")
    return errors;
}