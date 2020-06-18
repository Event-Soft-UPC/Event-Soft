import getPersistanceManager from "./Persistance/PersistanceManagerFactory";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import "reflect-metadata";
import authRouter from "./Application/AuthUser/Api/AuthController"

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
app.use("/auth",authRouter)
app.listen(process.env.PORT, () => {
    console.log("Running on 8080")
})




