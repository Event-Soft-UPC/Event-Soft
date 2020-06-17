import { TicketRepository } from "../../Domain/Ticket/TicketRepository";
import { Identifier } from "../../Domain/Shared/Identifier";
import { ShopperRepository } from "../../Domain/Shopper/ShopperRepository";

export class TicketService {
    private readonly ticketRepository:TicketRepository
    private readonly shopperRepository:ShopperRepository

    constructor(ticketRepository:TicketRepository,shopperRepository:ShopperRepository){
        this.shopperRepository = shopperRepository
        this.ticketRepository = ticketRepository
    }

    async sell(shopperId:Identifier, ticketId:Identifier){
        const shopper = await  this.shopperRepository.findById(shopperId)
        const ticket = await  this.ticketRepository.findById(ticketId)
        ticket.sell(shopper)
        return ticket
    }

}