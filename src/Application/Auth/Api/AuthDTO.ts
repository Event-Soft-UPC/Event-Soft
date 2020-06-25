import { EventDTO } from "../../Event/Api/EventDTO";
import { PaymentDTO } from "../../Payment/Api/PaymentDTO";

export interface LoginDTO {
    username:string,
    password:string
}

export interface RegisterDTO {
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    password:string
}

export interface UpgradeProfileDTO {
    username:string
}

export interface UpdateTokenDTO {
    refreshToken:string
}

export interface SecurityDTO {
    token:string,
    refreshToken:string
}

export interface UserDTO{
    roles:string[],
    payments:PaymentDTO[],
    subscriptions:string[],
    events:EventDTO[],
    username:string,
    firstname:string,
    lastname:string,
    email:string
}