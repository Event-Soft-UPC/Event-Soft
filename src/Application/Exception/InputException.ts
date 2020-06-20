import { FieldError } from "../Auth/Api/AuthValidator"

export  class ApiException extends Error {
    constructor(message:string) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class InputException extends ApiException{
    constructor(errors:FieldError[]) {
        super(JSON.stringify(errors))
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class ImageException extends Error {
    constructor() {
        super("We need images")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}