import { makeAutoObservable, runInAction } from "mobx"
import API_agent from "../api/agent";
import { Activity, Profile } from "../models/Interfaces";
// import { v4 as uuidv4 } from "uuid";
import {v4 as uuidv4} from "uuid";
import { Id } from "react-toastify";
import { toast } from "react-toastify";
import UserStore from "./UserStore";
import { store } from "./store";

export default class ActivityStore {
    activities: Activity[] = [];
    // activityRegistry = new Map<string, Activity>();
    selectedACT: Activity | undefined = undefined;
    editMode= false;
    loading= true;

    constructor(){
        makeAutoObservable(this)
    }
    
    get activitiesByDate() {
        return this.activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () =>{
        this.setLoading(true);
        try{
            const activities = await API_agent.Activities.list();
            //dat stuff
            activities.forEach(act =>{ this.setActivity(act); })
            this.setLoading(false);
        }catch(error){
            console.log(error)
            this.setLoading(false);
        }
    }
    loadActivity = async (id: string) =>{
        
        if(this.getSelectedACT()?.id == id) {   //exists already ? 
            this.setLoading(false);
            return this.getSelectedACT;
        }
        
        try{
            const activity = await API_agent.Activities.actDetails(id);
            this.setActivity(activity);
            this.selectACT(activity.id);
            this.setLoading(false);
        }catch(error){
            console.log(error)
            this.setLoading(false);
        }
    }
    setActivity = (act: Activity) => {
        const user = store.userStore.user;
        if(user){
            act.isGoing = act.attendees!.some(a => a.username === user.userName)
            act.isHost = act.hostUsername === user.userName;
            act.host = act.attendees?.find(dude => dude.username === act.hostUsername)
        }

        act.date = act.date.split("T")[0];
        this.activities.push(act);
        // this.activityRegistry.set(act.id, act);
    }
    setLoading = (state: boolean) => {return this.loading = state;}
   
    selectACT = (id: string | undefined) => {
        this.selectedACT = this.activities.find(a => a.id == id)
    }
    unselectACT = () => {
        this.selectedACT = undefined
    }
    getSelectedACT = () => {
        return this.selectedACT
    }

    openForm = (id?: string) => {
        id ? this.selectACT(id) : this.unselectACT()
        this.editMode = true;
    };
    closeForm = () => this.editMode = false;  

    //CRUD
    createACT = async (activityToCreate: Activity) => {
        this.setLoading(true);

        const user = store.userStore.user;
        const attendee = new Profile(user!);
        activityToCreate.attendees.push(attendee);
        activityToCreate.hostUsername = user!.userName;
        activityToCreate.id = uuidv4();
        // this.setActivity(activityToCreate); PARA PONER LAS PROPS EXTRAS
        try{
            await API_agent.Activities.create(activityToCreate);
            runInAction(() => {
                this.activities.push(activityToCreate);
                this.selectedACT = activityToCreate;
                this.editMode = false;

            })
            toast('🦄 Created Act Succesfully', {
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
            return true;
        } catch(error){
            console.log(error);
            toast('🦄 Erorr in Creation of Act', {
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
    editACT = async (activityToEdit: Activity) => {
        this.setLoading(true);
        try{
            await API_agent.Activities.edit(activityToEdit);
            runInAction(() => {
                this.activities = [...this.activities.filter(a => a.id !== activityToEdit.id), activityToEdit]
                this.selectedACT = activityToEdit;
                this.editMode = false;
            })
            this.setLoading(false);
        } catch(error){
            console.log(error);
            this.setLoading(false);
        }
    }

    deleteACT = async (id: string) => {
        this.setLoading(true)
        try{
            const res = await API_agent.Activities.delete(id)
            console.log(res);
            this.selectACT(undefined);
            runInAction(() => {
                this.activities = [...this.activities.filter(a => a.id !== id)]
                // this.activityRegistry.delete(id);
            })
            toast('🦄 Success in Deletion of Act', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            this.setLoading(false)
        }catch(error) {
            console.log(error);
            toast('🦄 Erorr in Deletion of Act', {
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
        }
    }

    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await API_agent.Activities.attend(this.selectedACT!.id)
            runInAction(() => {
                if(this.selectedACT?.isGoing) {
                    this.selectedACT.attendees = this.selectedACT.attendees.filter(attendee => attendee.username !== user?.userName);
                    this.selectedACT.isGoing = false;
                    toast('🦄 You abandoned the activity', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    const attendee = new Profile(user!);
                    this.selectedACT?.attendees?.push(attendee);
                    this.selectedACT!.isGoing = true;
                    toast('🦄 You Joined succesfully', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            })
        }catch (err) {
            console.log(err);
            toast('🦄 There was an error', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            runInAction(() => this.loading = false);
        }
    }

}