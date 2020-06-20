import { EventLifeSpanException } from "./DomainError";

export class DateRange {
    readonly start:Date
    readonly end:Date
    constructor(start:Date,end:Date){
        if(start.getTime() >= end.getTime())
            throw new EventLifeSpanException();
        this.start = start
        this.end = end
    }

}