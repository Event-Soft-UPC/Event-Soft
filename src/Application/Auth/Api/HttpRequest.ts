export interface LoginRequest {
    username:string,
    password:string
}

export interface RegisterRequest {
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    password:string
}

export interface UpgradeProfileRequest {
    username:string
}

export interface UpdateTokenRequest {
    refreshToken:string
}

