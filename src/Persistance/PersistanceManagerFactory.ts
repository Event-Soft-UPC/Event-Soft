import MongoPersistanceManager from "./Mongoose/MongoosePersistance";
import PersistanteManager from "./PersistanceManager";

type DataBase = "mongo";


export default function  getPersistanceManager(name:DataBase):PersistanteManager{
        switch(name){
           case "mongo": return new MongoPersistanceManager()
           default : return new MongoPersistanceManager()
        }
    }
