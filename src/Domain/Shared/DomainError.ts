export class DomainException extends Error {
    constructor(message:string) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export  class PasswordException extends DomainException {
    constructor() {
        super("Passwords don't match")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class DuplicateUserException extends DomainException {
    constructor() {
        super("This username already exists")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class UserNotFoundException extends DomainException {
    constructor() {
        super("There is no user registered with that username")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class EventLifeSpanException extends DomainException {
    constructor() {
        super("End date cannot be lower than start date")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class EventCategoryException extends DomainException {
    constructor() {
        super("A event must have at least one category")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class BuyTicketException extends DomainException {
    constructor() {
        super("this ticket is not available")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class OnlyPublishersException extends DomainException {
    constructor() {
        super("Only publishers can create an event")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}



