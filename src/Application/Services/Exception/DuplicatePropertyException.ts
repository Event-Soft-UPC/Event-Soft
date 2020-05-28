export default class DuplicatePropertyException extends Error {
    constructor(property:string){
        super(`This ${property} already exists`)
        Object.setPrototypeOf(this, DuplicatePropertyException.prototype);

    }
}