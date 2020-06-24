import "ts-jest"
import {Event} from "../../src/Domain/Event/Event"
import { DateRange } from "../../src/Domain/Shared/DateRange"
import { Money } from "../../src/Domain/AuthUser/ValueObject/Money"
import { Zone } from "../../src/Domain/Event/Zone"
import { EventLifeSpanException } from "../../src/Domain/Shared/DomainError"

describe("Event Tests",()=>{
    test("create a valid event ",()=>{
        const event = new Event("hashId","Jose","drama","img.png",["drama","logica"],new DateRange(new Date(2019,1,28),new Date(2020,5,4)),"av siempreviva","referencia",[new Zone("VIP",new Money(20,"Soles"),40)])

        const expectedStatus = "Available"

        expect(event.getStatus()).toEqual(expectedStatus)
    })
    test("create an invalid event",()=>{
        expect.assertions(1)
        try {
            new Event("hashId","Jose","drama","img.png",["drama","logica"],new DateRange(new Date(2022,1,28),new Date(2020,5,4)),"av siempreviva","referencia",[new Zone("VIP",new Money(20,"Soles"),40)]) 

        } catch (error) {
            expect(error).toBeInstanceOf(EventLifeSpanException)
        }
    })
})
