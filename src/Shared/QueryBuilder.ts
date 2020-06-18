
export interface Query<T>{
    where: Array<Where<T>>
    paginator?: Paginator
}


export interface Paginator {
    page: number
    limit: number
}

export interface Where<T>{
    property: keyof T
    eq?:any
    range?:{lower:number,upper:number}
}


