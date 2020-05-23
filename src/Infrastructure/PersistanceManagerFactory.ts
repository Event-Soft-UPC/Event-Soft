import MongoPersistanceManager from "./Mongoose/MongoosePersistance";
import PersistanteManager from "./PersistanceManager";

type DataBase = "mongo";

export default class PersistanceManagerFactory {
    getPersistanceManager(name:DataBase):PersistanteManager{
        switch(name){
           case "mongo": return new MongoPersistanceManager()
           default : return new MongoPersistanceManager()
        }
    }
}