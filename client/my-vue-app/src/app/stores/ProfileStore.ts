import { makeAutoObservable, reaction, runInAction } from "mobx"
import { toast } from "react-toastify";
import API_agent from "../api/agent";
import { Photo, Profile, ServerError } from "../models/Interfaces";
import { store } from "./store";

export default class ProfileStore {
    profile: Profile | null = null;
    isloadingProfile: boolean = false;
    uploading: boolean = false;
    loading:boolean = false;

    constructor(){ 
        makeAutoObservable(this)
    }

    get isCurrentUser() {
        if(store.userStore.user && this.profile){
            return store.userStore.user.userName === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.isloadingProfile = true;
        try{
            const perfil = await API_agent.Profiles.get(username);
            this.setProfile(perfil)
            console.log("api llamada", perfil)
           
        } catch(err){
            
            console.log(err);
        } finally { this.setIsLoadingProfile(false); }
    }
    uploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try{
            const res = await API_agent.Profiles.uploadPhoto(file);
            const ph = res.data;
            toast('🦄 Ph uploaded!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            this.setProfileNewPhoto(ph)
        } catch(err){
            console.log(err);
            toast('🦄 Error uploading the ph', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally { this.setUploading(false); }
    }
    setProfile = (perfil : Profile) => this.profile = perfil;
    setProfileNewPhoto = (ph : Photo) => {
        if(this.profile) {
            this.profile.photos?.push(ph);
            if(ph.isMain && store.userStore.user){
                store.userStore.setImage(ph.url);
                this.profile.image = ph.url
            }
        }
    }
    setProfileMainPhoto = async (ph: Photo) => {
        this.loading = true;
        try {
            await API_agent.Profiles.setMainPhoto(ph.id)
            store.userStore.setImage(ph.url);
            if(this.profile && this.profile.photos){
                this.profile.photos.find(pho => pho.isMain)!.isMain = false;
                this.profile.photos.find(pho => pho.id === ph.id)!.isMain = true;
    
                this.profile.image = ph.url;
                this.loading = false;
            }
            toast('🦄 Main Ph changed!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.log(error)
        } finally {
            this.loading = false;
        }
    }
    // manageMainPhoto = async (PH: Photo) => {
    //     if(this.profile && this.profile.photos){
    //         this.profile.photos.find(pho => pho.isMain)!.isMain = false;
    //         this.profile.photos.find(pho => pho.id === PH.id)!.isMain = true;

    //         this.profile.image = PH.url;
    //         this.loading = false;
    //     }
    // }
    deletePhoto = async (PH: Photo) => {
        this.loading = true;
        try {
            await API_agent.Profiles.deletePhoto(PH.id);
            runInAction(() => {
                if(this.profile){
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== PH.id )
                    toast('🦄 Ph deleted!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            })
        } catch (error) {
            console.log(Error)
        } finally { this.loading = false }
    }
    setIsLoadingProfile = (value: boolean) => this.isloadingProfile = value;
    setUploading = (value: boolean) => this.uploading = value;
}