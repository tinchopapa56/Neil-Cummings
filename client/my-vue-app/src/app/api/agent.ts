import { AxiosResponse } from "axios";
import axios from "axios";
import { Activity } from "../models/Interfaces";

axios.defaults.baseURL = "http://localhost:5000/api" //NO SE SI ES ESA URLLLLLLLLLLLLL

const resBody = <T> (response: AxiosResponse<T>) => response.data;

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
const API_agent = {
    Activities
}
export default API_agent;