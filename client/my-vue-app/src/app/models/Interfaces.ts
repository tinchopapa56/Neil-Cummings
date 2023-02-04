import { string } from "yup"

export interface Activity {
    id: string,
    title: string,
    date: string,
    description: string,
    category: string,
    city: string,
    venue: string,
    image: string,
    hostUsername: string,

    isCancelled?: boolean,
    isGoing?: boolean,
    isHost?: boolean,
    host?: Profile,

    attendees: Profile[],
}
export interface Profile {
    username: string,
    displayName: string,
    image?: string,
    bio?: string,
    photos?: Photo[],
    followersCount?: number,
    followingsCount?: number,
}
export interface Photo {
    id: string,
    url: string,
    isMain: boolean,
}
export class Profile implements Profile{
    constructor(user: User){
        this.username = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;
    }
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

export interface LiveChatComment {
    id: string,
    createdAt: Date,
    body: string,
    username: string,
    displayName: string,
    image: string,
}