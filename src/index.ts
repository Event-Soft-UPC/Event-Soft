import PersistanceManagerFactory from "./Infrastructure/PersistanceManagerFactory";

const persistanceFactory = new PersistanceManagerFactory();
const manager = persistanceFactory.getPersistanceManager("mongo");
manager.connect(process.env.CONNECTION_STRING!);