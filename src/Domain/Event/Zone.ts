import { Money } from "../AuthUser/ValueObject/Money"
import { ZoneSoldOut } from "../Shared/DomainError"

export class Zone {
    count:number = 0
    name:string
    price:Money

    constructor(name:string,price:Money,count:number) {
        this.name = name
        this.price = price
        this.count = count
    }

    setName(name:string){this.name = name; return this}
    setPrice(price:Money){this.price = price; return this}

    isAvailable(){
        return this.count > 0
    }

    sellTickets(tickets:number){
        if (this.count - tickets > 0 )
            this.count = this.count - tickets
        else
            throw new ZoneSoldOut()
    }

}