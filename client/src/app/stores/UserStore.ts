import { makeAutoObservable, makeObservable, runInAction } from "mobx"
import API_agent from "../api/agent";
import { User } from "../models/Interfaces";
import { FormValues } from "../models/Interfaces";

import { toast } from "react-toastify";
import { store } from "./store";
import { router } from "../router/Routes";



export default class UserStore {
    user: User | null = null;
    loading: boolean = false;

    constructor(){ makeAutoObservable(this) }

    get isLoggedIn(){
        return !!this.user
    }

    login = async (creds: FormValues) => {
        this.setLoading(true)
        try{
            const user = await API_agent.Account.login(creds);
            store.commonStore.setToken(user.token); //SET TOKEN Localstorage
            this.setCurrentUser(user);
            
            toast('🦄 Logged in Succesfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            this.setLoading(false);

            return user;

        } catch(error){
            toast('🦄 Erorr in Auth', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            this.setLoading(false);
            return false;
        }
    }
    logout = () => {
        console.log("logout desdeUSERSTORE")
        store.commonStore.setToken(null);
        localStorage.removeItem("jwt");
        router.navigate("/")
    }
    register = async (creds: FormValues) => {
        this.setLoading(true)
        try{
            const user = await API_agent.Account.register(creds);
            store.commonStore.setToken(user.token); //SET TOKEN Lstorage
            this.setCurrentUser(user);
            
            toast('🦄 Registered Succesfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            this.setLoading(false);

            return user;

        } catch(error){
            toast('🦄 Erorr in registration', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            this.setLoading(false);
            return false;
        }
    }
    getUser = async () => {
        try {
            const user = await API_agent.Account.current();
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
        } catch (error) {console.log(error);}
    }

    //GETTERS // SETTERs
    setLoading = (val: boolean) =>{
        this.loading = val;
    }
    setCurrentUser = (user: User) => {
        this.user = user;
    }
    
    setImage = (image: string) => {
        if(this.user) this.user.image = image;
    }
    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }
}