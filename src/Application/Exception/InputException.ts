import { FieldError } from "../AuthUser/Api/AuthValidator"

export  class ApiException extends Error {
    constructor(errors:FieldError[]) {
        super(JSON.stringify(errors))
        Object.setPrototypeOf(this, new.target.prototype)
    }
}