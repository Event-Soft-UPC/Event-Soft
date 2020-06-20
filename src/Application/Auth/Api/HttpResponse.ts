import { EventResponseDTO, eventToDTO } from "../../Event/Api/HttpResponse";
import { AuthUser } from "../../../Domain/AuthUser/AuthUser";
import { Payment } from "../../../Domain/AuthUser/ValueObject/Payment";

export interface AuthResponse {
    token:string,
    refreshToken:string
}
export interface UserDTO{
    roles:string[],
    payments:Payment[],
    subscriptions:string[],
    events:EventResponseDTO[]
}

export function userToDTO(user:AuthUser):UserDTO{
    return {
        roles:user.roles,
        payments:user.getPayments(),
        events:user.events.map(v => eventToDTO(v)),
        subscriptions: user.subscriptions
    }
}