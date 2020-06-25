import { BaseValidator, validatePositiveNumber, validateMinLength, MIN_ZONE_LENGTH, MIN_EVENT_LENGTH } from "../../Shared/BaseValidator";
import { PaymentDTO } from "./PaymentDTO";
import { validateUsername } from "../../Auth/Api/AuthValidator";
import { InputException } from "../../Exception/InputException";

export class PaymentValidator extends BaseValidator {
    readonly payment:PaymentDTO

    constructor(payment:PaymentDTO){
        super()
        this.payment = payment
    }

    validate(): void {
        this.errors.push(...validatePositiveNumber("quantity",this.payment.quantity))
        this.errors.push(...validateUsername(this.payment.username))
        this.errors.push(...validateMinLength("zone",this.payment.zone,MIN_ZONE_LENGTH))
        this.errors.push(...validateMinLength("event",this.payment.event,MIN_EVENT_LENGTH))
        if (this.errors.length > 0)
            throw new InputException(this.errors)
    }

}