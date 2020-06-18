import { TicketRepository } from "../../Domain/Ticket/TicketRepository";

export class TicketService {
    private readonly ticketRepository:TicketRepository

    constructor(ticketRepository:TicketRepository){
        this.ticketRepository = ticketRepository
    }

    async sell(shopperId:string, seat:string){
        const ticket = await  this.ticketRepository.findByIdOrNull(seat)
        if (ticket === null)
            throw new Error("This ticket doesnt exists")
        ticket.sell(shopperId)
        return ticket
    }

}