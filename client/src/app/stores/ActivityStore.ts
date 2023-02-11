// import { makeAutoObservable, reaction, runInAction } from "mobx"
// import API_agent from "../api/agent";
// import { Activity, Profile } from "../models/Interfaces";
// import { Pagination, PagingParams } from "../models/pagination";

// import {v4 as uuidv4} from "uuid";

// import { toast } from "react-toastify";

// import { store } from "./store";

// export default class ActivityStore {
//     activities: Activity[] = [];
//     // activityRegistry = new Map<string, Activity>();
//     selectedACT: Activity | undefined = undefined;
//     editMode= false;
//     loading= true;
//     loadingInitial = false;

//     pagination: Pagination | null = null;
//     pagingParams = new PagingParams();
//     predicate = new Map().set("all", true)


//     constructor(){
//         makeAutoObservable(this)
//         reaction(
//             () => this.predicate.keys(),
//             () => {
//                 this.pagingParams = new PagingParams();
//                 this.activities = []
//                 this.loadActivities();
//             }
//         )
//     }

//     setPagingParams = (pagingParams: PagingParams) => {
//         this.pagingParams = pagingParams
//     }

//     setPredicate = (predicate: string, value: string | Date) => {
//         const resetPredicate = () => {
//             this.predicate.forEach((value, key) => {
//                 if (key !== 'startDate') this.predicate.delete(key);
//             })
//         }
//         console.log("activity store, prdicate recibido :" , predicate)
//         switch (predicate) {
//             case 'all':
//                 resetPredicate();
//                 this.predicate.set('all', true);
//                 break;
//             case 'isGoing':
//                 resetPredicate();
//                 this.predicate.set('isGoing', true);
//                 break;
//             case 'isHost':
//                 resetPredicate();
//                 this.predicate.set('isHost', true);
//                 break;
//             case 'startDate':
//                 this.predicate.delete('startDate');
//                 this.predicate.set('startDate', value);
//         }
//     } 

//     get axiosParams() { //Adin pagination jheader a axios
//         const params = new URLSearchParams();
//         params.append('pageNumber', this.pagingParams.pageNumber.toString());
//         params.append('pageSize', this.pagingParams.pageSize.toString());
//         this.predicate.forEach((value, key) => {
//             if (key === 'startDate') {
//                 params.append(key, (value as Date).toISOString())
//             } else {
//                 params.append(key, value);
//             }
//         })
//         return params;
//     }
    
//     get activitiesByDate() {
//         return this.activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
//     }

//     loadActivities = async () =>{
//         this.setLoadingInitial(true);
//         try{
//             const resACTs = await API_agent.Activities.list(this.axiosParams);
//             resACTs.data.forEach(act => 
//                 { 
//                     this.setActivity(act); 
//                 })
//             this.setPagination(resACTs.pagination);
//             this.setLoadingInitial(false);
//         }catch(error){ 
//             console.log(error)
//             this.setLoadingInitial(false);
//         }

//     }
//     setPagination = (pagination: Pagination) => {
//         this.pagination = pagination;
//     }
//     clearActivities = () => {
//         this.activities =[]
//     }
//     loadActivity = async (id: string) =>{
        
//         if(this.getSelectedACT()?.id == id) {   //exists already ? 
//             this.setLoading(false);
//             return this.getSelectedACT;
//         }
        
//         try{
//             const activity = await API_agent.Activities.actDetails(id);
//             this.setActivity(activity);
//             this.selectACT(activity.id);
//             this.setLoading(false);
//         }catch(error){
//             console.log(error)
//             this.setLoading(false);
//         }
//     }
//     setActivity = (act: Activity) => {
//         const user = store.userStore.user;
//         if(user){
//             act.isGoing = act.attendees!.some(a => a.username === user.username)
//             act.isHost = act.hostUsername === user.username;
//             act.host = act.attendees?.find(dude => dude.username === act.hostUsername)
//         }

//         act.date = act.date.split("T")[0];
//         this.activities.push(act);
//         // this.activityRegistry.set(act.id, act);
//     }
//     setLoading = (state: boolean) => {return this.loading = state}
//     setLoadingInitial = (state: boolean) => {
//         this.loadingInitial = state;
//     }
   
//     selectACT = (id: string | undefined) => {
//         this.selectedACT = this.activities.find(a => a.id == id)
//     }
//     unselectACT = () => {
//         this.selectedACT = undefined
//     }
//     getSelectedACT = () => {
//         return this.selectedACT
//     }

//     //CRUD
//     createACT = async (activityToCreate: Activity) => {
//         this.setLoading(true);

//         const user = store.userStore.user;
//         const attendee = new Profile(user!);

//         console.log(user, "from activity store createACT()")

//         activityToCreate.attendees!.push(attendee);
//         activityToCreate.hostUsername = user!.username;
//         activityToCreate.id = uuidv4();
//         // this.setActivity(activityToCreate); PARA PONER LAS PROPS EXTRAS
//         try{
//             await API_agent.Activities.create(activityToCreate);
//             runInAction(() => {
//                 this.activities.push(activityToCreate);
//                 this.selectedACT = activityToCreate;
//                 this.editMode = false;

//             })
//             toast('🦄 Created Act Succesfully', {
//                 position: "bottom-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//             });
//             return true;
//         } catch(error){
//             console.log(error);
//             toast('🦄 Erorr in Creation of Act', {
//                 position: "bottom-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//             });
//             return false;
//         } finally {this.setLoading(false);}
//     }
//     editACT = async (activityToEdit: Activity) => {
//         this.setLoading(true);
//         try{
//             await API_agent.Activities.edit(activityToEdit);
//             runInAction(() => {
//                 this.activities = [...this.activities.filter(a => a.id !== activityToEdit.id), activityToEdit]
//                 this.selectedACT = activityToEdit;
//                 this.editMode = false;
//             })
//             this.setLoading(false);
//         } catch(error){
//             console.log(error);
//             this.setLoading(false);
//         }
//     }

//     deleteACT = async (id: string) => {
//         this.setLoading(true)
//         try{
//             const res = await API_agent.Activities.delete(id)
//             console.log(res);
//             this.selectACT(undefined);
//             runInAction(() => {
//                 this.activities = [...this.activities.filter(a => a.id !== id)]
//                 // this.activityRegistry.delete(id);
//             })
//             toast('🦄 Success in Deletion of Act', {
//                 position: "bottom-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//             });
//             this.setLoading(false)
//         }catch(error) {
//             console.log(error);
//             toast('🦄 Erorr in Deletion of Act', {
//                 position: "bottom-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//             });
//             this.setLoading(false);
//         }
//     }

//     updateAttendance = async () => {
//         const user = store.userStore.user;
//         this.loading = true;
//         try {
//             await API_agent.Activities.attend(this.selectedACT!.id)
//             runInAction(() => {
//                 if(this.selectedACT?.isGoing) {
//                     this.selectedACT.attendees = this.selectedACT.attendees.filter(attendee => attendee.username !== user?.username);
//                     this.selectedACT.isGoing = false;
//                     toast('🦄 You abandoned the activity', {
//                         position: "bottom-right",
//                         autoClose: 3000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "dark",
//                     });
//                 } else {
//                     const attendee = new Profile(user!);
//                     this.selectedACT?.attendees?.push(attendee);
//                     this.selectedACT!.isGoing = true;
//                     toast('🦄 You Joined succesfully', {
//                         position: "bottom-right",
//                         autoClose: 3000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "dark",
//                     });
//                 }
//             })
//         }catch (err) {
//             console.log(err);
//             toast('🦄 There was an error', {
//                 position: "bottom-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//             });
//         } finally {
//             runInAction(() => this.loading = false);
//         }
//     }
//     updateAttendeeFollowing = (username: string) => {
//         this.activities.forEach(act => {
//             act.attendees.forEach(attende => {
//                 if(attende.username === username){
//                     attende.following ? attende.followersCount!-- : attende.followersCount!++;
//                     attende.following = !attende.following;
//                 }
//             })
//         })
//     }
// }


// import {ActivityFormValues } from "../models/activity";
import {format} from 'date-fns';
// import { Pagination, PagingParams } from "../models/pagination";
import { makeAutoObservable, reaction, runInAction } from "mobx"
import API_agent from "../api/agent";
import { Activity, ActivityFormValues, Profile } from "../models/Interfaces";
import { Pagination, PagingParams } from "../models/pagination";

import { toast } from "react-toastify";
import { store } from "./store";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.activityRegistry.clear();
                this.loadActivities();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setPredicate = (predicate: string, value: string | Date) => {
        const resetPredicate = () => {
            this.predicate.forEach((value, key) => {
                if (key !== 'startDate') this.predicate.delete(key);
            })
        }
        switch (predicate) {
            case 'all':
                resetPredicate();
                this.predicate.set('all', true);
                break;
            case 'isGoing':
                resetPredicate();
                this.predicate.set('isGoing', true);
                break;
            case 'isHost':
                resetPredicate();
                this.predicate.set('isHost', true);
                break;
            case 'startDate':
                this.predicate.delete('startDate');
                this.predicate.set('startDate', value);
        }
    } 

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, (value as Date).toISOString())
            } else {
                params.append(key, value);
            }
        })
        return params;
    }

    get activitiesByDate() {
        // return Array.from(this.activityRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
        return Array.from(this.activityRegistry.values())
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const result = await API_agent.Activities.list(this.axiosParams);
            result.data.forEach(activity => {
                this.setActivity(activity);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await API_agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        const user = store.userStore.user;
        if (user) {
            activity.isGoing = activity.attendees!.some(
                a => a.username === user.username
            )
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
        }
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createAct = async (actNEW: ActivityFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);
        try {
            await API_agent.Activities.create(actNEW);
            const newActivity = new Activity(actNEW);
            newActivity.hostUsername = user!.username;
            newActivity.attendees = [attendee];
            this.setActivity(newActivity);
            runInAction(() => {
                this.selectedActivity = newActivity;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateActivity = async (activity: ActivityFormValues) => {
        try {
            await API_agent.Activities.update(activity);
            runInAction(() => {
                if (activity.id) {
                    let updatedActivity = {...this.getActivity(activity.id), ...activity}
                    this.activityRegistry.set(activity.id, updatedActivity as Activity);
                    this.selectedActivity = updatedActivity as Activity;
                } 
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteAct = async (id: string) => {
        this.loading = true;
        try {
            await API_agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await API_agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                if (this.selectedActivity?.isGoing) {
                    this.selectedActivity.attendees = 
                        this.selectedActivity.attendees?.filter(a => a.username !== user?.username);
                    this.selectedActivity.isGoing = false;
                } else {
                    const attendee = new Profile(user!);
                    this.selectedActivity?.attendees?.push(attendee);
                    this.selectedActivity!.isGoing = true;
                }
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    cancelActivityToggle = async () => {
        this.loading = true;
        try {
            await API_agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    updateAttendeeFollowing = (username: string) => {
        this.activityRegistry.forEach(activity => {
            activity.attendees.forEach(attendee => {
                if (attendee.username === username) {
                    attendee.following ? attendee.followersCount!-- : attendee.followersCount!++;
                    // attendee.following ? attendee.followersCount-- : attendee.followersCount++;
                    attendee.following = !attendee.following;
                }
            })
        })
    }

    clearSelectedActivity = () => {
        this.selectedActivity = undefined;
    }
}