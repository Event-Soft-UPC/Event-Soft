export class Payment {
    readonly event:string
    readonly count:number
    readonly zone:string
    
    constructor(event:string,count:number,zone:string){
        this.event = event
        this.zone = zone
        this.count = count
    }

    public static createPayment(event:string,zone:string,count:number){
        return new Payment(event,count,zone)
    }
}