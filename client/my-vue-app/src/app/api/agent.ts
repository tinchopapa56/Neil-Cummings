import { AxiosResponse } from "axios";
import axios from "axios";
import { Activity, User, FormValues } from "../models/Interfaces";
import { store } from "../stores/store";

axios.defaults.baseURL = "http://localhost:5000/api" //NO SE SI ES ESA URLLLLLLLLLLLLL

const resBody = <T> (response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.generalStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return  config;
})

const requests = {
    get: <T> (url:string) => axios.get<T>(url).then(resBody),
    post: <T> (url:string, body: {}) => axios.post<T>(url, body).then(resBody),
    put: <T> (url:string, body: {}) => axios.put<T>(url, body).then(resBody),
    del: <T> (url:string) => axios.delete<T>(url).then(resBody),
}
const Activities = {
    list: () => requests.get<Activity[]>("/activities"),
    actDetails: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activityToCreate: Activity) => requests.post<void>("/activities", activityToCreate),
    edit: (activityToEdit: Activity) => requests.put<void>("activities", activityToEdit),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const Account = {
    current: () =>  requests.get<User>("/account"),
    login: (user: FormValues) => requests.post<User>("/account/login", user),
    register: (user: FormValues) => requests.post<User>("/account/register", user), 
}

const API_agent = {
    Activities,
    Account
}
export default API_agent;