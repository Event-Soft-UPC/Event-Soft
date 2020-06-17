export class Identifier{
   readonly id:string
   
   constructor(id:string){
     if(id.length <= 0)
        throw new Error("Invalid Identifier")
     this.id = id
   }
   isEquals(identifier:Identifier){
    return this.id === identifier.id
   }
}