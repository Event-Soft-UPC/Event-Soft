import PersistanteManager from "../PersistanceManager";
import {connect} from "mongoose"
export default class MongoPersistanceManager implements PersistanteManager{
    async connect(connectionString:string): Promise<void> {
        await connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
    }
    
}