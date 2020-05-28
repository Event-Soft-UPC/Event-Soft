import getPersistanceManager from "./Persistance/PersistanceManagerFactory";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { publisherRouter, PublisherController } from "./Presentation/Controller/PublisherController";
import "reflect-metadata";
import container, { TYPES } from "./ioc/container"
import PublisherService from "./Application/Services/imp/PublisherServiceImp";

dotenv.config()

const publisherService = container.get<PublisherService>(TYPES.PublisherService);
const publisherController = new PublisherController(publisherService)
const publisherExpressRouter = publisherRouter(publisherController)
const persistanceManager = getPersistanceManager("mongo");
persistanceManager.connect(process.env.CONNECTION_STRING!).then(() => {
    console.log("DB Connect")
}).catch((err) => {
    console.log(err)
})

const app = express()
app.use(cors())
app.use(express.json())
app.use("/publisher", publisherExpressRouter)
app.listen(process.env.PORT, () => {
    console.log("Running on 8080")
})




