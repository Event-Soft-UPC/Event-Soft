import { BaseValidator, validateCategoryName } from "../../Shared/BaseValidator";
import { SubscriptionDTO } from "./SubscriptionDTO";
import { validateUsername } from "../../Auth/Api/AuthValidator";
import { InputException } from "../../Exception/InputException";

export class SubscriptionValidator extends BaseValidator{
    readonly subcription:SubscriptionDTO

    constructor(subscription:SubscriptionDTO)
    {
        super()
        this.subcription = subscription
    }

    validate(): void {
        this.errors.push(...validateCategoryName(this.subcription.category))
        this.errors.push(...validateUsername(this.subcription.username))
        if (this.errors.length > 0)
            throw new InputException(this.errors)
    }

}