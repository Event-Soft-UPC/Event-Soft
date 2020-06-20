import { AuthUser } from "../AuthUser/AuthUser";
import { Event } from "../Event/Event";
import { Payment } from "../AuthUser/ValueObject/Payment";
export  function createPayment(user:AuthUser,event:Event,zone:string,quantity:number){
        event.sellTicketsByZone(zone,quantity)
        const payment = Payment.createPayment(event.id,zone,quantity)
        user.addPayments(payment)
        return payment
}


