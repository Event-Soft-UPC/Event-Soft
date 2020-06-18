import { v4 as uuidv4 } from 'uuid';

export class Identifier{
   private _id:string
   
   constructor(){
     this._id = uuidv4()
   }

   get id(){return this._id}

   isEquals(identifier:Identifier){
    return this.id === identifier.id
   }
}