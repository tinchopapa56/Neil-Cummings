import { makeAutoObservable, runInAction } from "mobx"
import API_agent from "../api/agent";
import { Activity } from "../models/Interfaces";
// import { v4 as uuidv4 } from "uuid";
import {v4 as uuidv4} from "uuid";
import { Id } from "react-toastify";

export default class ActivityStore {
    activities: Activity[] = [];
    // activityRegistry = new Map<string, Activity>();
    selectedACT: Activity | undefined = undefined;
    editMode= false;
    loading= true;

    constructor(){
        makeAutoObservable(this)
    }
    
    loadActivities = async () =>{
        this.setLoading(true);
        try{
            const activities = await API_agent.Activities.list();
            //dat stuff
            activities.forEach(act =>{
                this.setActivity(act);
            })
            this.setLoading(false);
        }catch(error){
            console.log(error)
            this.setLoading(false);
        }
    }
    loadActivity = async (id: string) =>{
        //exists already ? 
        if(this.getSelectedACT()?.id == id) {
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
        activityToCreate.id = uuidv4();
        try{
            await API_agent.Activities.create(activityToCreate);
            runInAction(() => {
                this.activities.push(activityToCreate);
                this.selectedACT = activityToCreate;
                this.editMode = false;

            })
            this.setLoading(false);
        } catch(error){
            console.log(error);
            this.setLoading(false);
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
            this.setLoading(false)
        }catch(error) {
            console.log(error);
            this.setLoading(false)
        }
    }

}