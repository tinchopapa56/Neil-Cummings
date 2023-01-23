import { string } from "yup"

export interface Activity {
    id: string,
    title: string,
    date: string,
    description: string,
    category: string,
    city: string,
    venue: string,
}
export interface FormValues {
    email: string,
    password: string,
    displayName?: string,
    userName?: string       //userNNNName xq asi es la propr del ASP.net User = userName[mayuscula]
}

export interface User {
    userName: string,       //userNNNName xq asi es la propr del ASP.net User = userName[mayuscula]
    displayName: string,
    token: string,
    image?: string,
}
export interface ServerError {
    err: string,
}

