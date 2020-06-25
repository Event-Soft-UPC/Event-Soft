import getPersistanceManager from "./Persistance/PersistanceManagerFactory";
import express, { Router } from "express"
import cors from "cors"
import dotenv from "dotenv"
import "reflect-metadata";
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from "./Swagger/swagger.json"
import authRouter from "./Application/Auth/Api/AuthController"
import categoryRouter from "./Application/Category/Api/CategoryController"
import paymentRouter from "./Application/Payment/Api/PaymentController"
import eventRouter from "./Application/Event/Api/EventController"
import subscriptionRouter from "./Application/Subscription/Api/SubscriptionController"

const router = Router()
router.use("/auth",authRouter)
router.use("/payments",paymentRouter)
router.use("/categories",categoryRouter)
router.use("/events",eventRouter)
router.use("/subscriptions",subscriptionRouter)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

dotenv.config()

const persistanceManager = getPersistanceManager("mongo");
persistanceManager.connect(process.env.CONNECTION_STRING!).then(() => {
    console.log("DB Connect")
}).catch((err) => {
    console.log(err)
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(process.env.PhotosFolder!))
app.use(`/api/${process.env.API_VERSION}`,router)
app.listen(process.env.PORT, () => {
    console.log(`Running on ${process.env.PORT}`)
})




