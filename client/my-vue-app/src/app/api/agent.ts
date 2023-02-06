import { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { Activity, User, FormValues, Profile, Photo } from "../models/Interfaces";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5001/api" //NO SE SI ES ESA URLLLLLLLLLLLLL

const resBody = <T> (response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.generalStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})


// axios.interceptors.response.use(async response => {
//     // const pagination = response.headers['pagination'];
//     // if (pagination) {
//     //     response.data = new PaginatedResult(response.data, JSON.parse(pagination));
//     //     return response as AxiosResponse<PaginatedResult<any>>
//     // }
//     return response;
// }, (error: AxiosError) => {
//     const { data, status, config, headers } = error.response!;
//     switch (status) {
//         case 400:
//             if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
//                 Navigate("/not-found");
//             }
//             if (data.errors) {
//                 const modalStateErrors = [];
//                 for (const key in data.errors) {
//                     if (data.errors[key]) {
//                         modalStateErrors.push(data.errors[key])
//                     }
//                 }
//                 throw modalStateErrors.flat();
//             } else {
//                 toast.error(data);
//             }
//             break;
//         case 401:
//             if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
//                 store.userStore.logout();
//                 toast.error('Session expired - please login again');
//             }
//             break;
//         case 404:
//             navigate("/not-found");
//             break;
//         case 500:
//             store.generalStore.setServerError(data);
//             navigate("/server-error");
//             break;
//     }
//     return Promise.reject(error);
// })

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
    delete: (id: string) => requests.del<void>(`/activities/${id}`),

    attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {}),
}

const Account = {
    current: () =>  requests.get<User>("/account"),
    login: (user: FormValues) => requests.post<User>("/account/login", user),
    register: (user: FormValues) => requests.post<User>("/account/register", user), 
}
const Profiles = {
    get: (username:string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData()
        formData.append("File", file);
        return axios.post<Photo>("photos", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
    },
    setMainPhoto: (id:string) => requests.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id:string) => requests.del(`/photos/${id}`),
    // updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile),
    updateFollowing: (username:string) => requests.post(`/follow/${username}`, {}),
    listSeguidores: (username: string, predicate: string) => requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
    // listActivities: (username: string, predicate: string) => requests.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)
}
const API_agent = {
    Activities,
    Account,
    Profiles
}
export default API_agent;