import getPersistanceManager from "./Persistance/PersistanceManagerFactory";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import "reflect-metadata";
import authRouter from "./Application/Auth/Api/AuthController"
import categoryRouter from "./Application/Category/Api/CategoryController"
import paymentRouter from "./Application/Payment/Api/PaymentController"
import eventRouter from "./Application/Event/Api/EventController"
import subscriptionRouter from "./Application/Subscription/Api/SubscriptionController"

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
app.use("/auth",authRouter)
app.use("/payments",paymentRouter)
app.use("/categories",categoryRouter)
app.use("/events",eventRouter)
app.use("/subscriptions",subscriptionRouter)
app.listen(process.env.PORT, () => {
    console.log("Running on 8080")
})




