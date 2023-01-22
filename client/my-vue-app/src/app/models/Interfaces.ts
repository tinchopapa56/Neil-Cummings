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
    username?: string
}

export interface User {
    username: string,
    displayName: string,
    token: string,
    image?: string,
}
export interface ServerError {
    err: string,
}

