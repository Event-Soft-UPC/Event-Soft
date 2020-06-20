import {AuthUser} from "../../src/Domain/AuthUser/AuthUser"
import {Event} from "../../src/Domain/Event/Event"
import { FullName } from "../../src/Domain/AuthUser/ValueObject/FullName"
import { DateRange } from "../../src/Domain/Shared/DateRange"
import { Zone } from "../../src/Domain/Event/Zone"
import { Money } from "../../src/Domain/AuthUser/ValueObject/Money"
import { createPayment } from "../../src/Domain/Services/PaymentService"
import { Payment } from "../../src/Domain/AuthUser/ValueObject/Payment"
import { ZoneSoldOut } from "../../src/Domain/Shared/DomainError"
import "ts-jest"
import "reflect-metadata"

describe("Payment Unit Tests",()=>{
    test("Create a valid payment",()=>{
        const user = new AuthUser("jose",new FullName("Jose","Morales"),["Shopper"],"josemowa45321@gmail.com","joseluis123qwe","refreshtoken",[],[])
        const event = new Event("hashId",user.username,"drama","img.png",["drama","logica"],new DateRange(new Date(2019,1,28),new Date(2020,5,4)),"av siempreviva","referencia",[new Zone("VIP",new Money(20,"Soles"),40)])
        const expectPayment = Payment.createPayment(event.id,"VIP",10)

        createPayment(user,event,"VIP",10)

        expect(user.getPayments()).toContainEqual(expectPayment)
    })
    test("Invalid Payment",()=>{
        expect.assertions(1)
        const user = new AuthUser("jose",new FullName("Jose","Morales"),["Shopper"],"josemowa45321@gmail.com","joseluis123qwe","refreshtoken",[],[])
        const event = new Event("hashId",user.username,"drama","img.png",["drama","logica"],new DateRange(new Date(2019,1,28),new Date(2020,5,4)),"av siempreviva","referencia",[new Zone("VIP",new Money(20,"Soles"),40)])

        try {
            createPayment(user,event,"VIP",80)
         } catch (error) {
             expect(error).toBeInstanceOf(ZoneSoldOut)
         }
    })
    
})
