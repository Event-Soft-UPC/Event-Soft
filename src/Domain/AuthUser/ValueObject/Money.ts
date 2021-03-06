import { MoneyException } from "../../Shared/DomainError"



export class Money {
    readonly cost:number
    readonly currency:string
    constructor(cost:number,currency:string){
        if(cost < 0)
            throw new MoneyException("Price must be greater than zero")
        if(!["Soles","Dollars"].includes(currency))
            throw new MoneyException("The currency must be Soles or Dollars")
        this.currency = currency
        this.cost = cost
    }
}
