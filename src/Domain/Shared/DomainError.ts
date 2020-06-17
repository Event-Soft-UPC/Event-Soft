export  class PublisherNotFoundException extends Error {
    constructor() {
        super("This user hasn't publisher profile")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export  class ShopperNotFoundException extends Error {
    constructor() {
        super("This user hasn't shopper profile")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export  class PasswordException extends Error {
    constructor() {
        super("Password doesn't match")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class DuplicateUserException extends Error {
    constructor() {
        super("This username already exists")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class EventLifeSpanException extends Error {
    constructor() {
        super("End date cannot be lower than start date")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class EventCategoryException extends Error {
    constructor() {
        super("A event must have at least one category")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class BuyTicketException extends Error {
    constructor() {
        super("this ticket is not available")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}



