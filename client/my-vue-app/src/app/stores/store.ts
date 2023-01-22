import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import UserStore from "./UserStore"
import GeneralStore from "./GeneralStore"

interface Stores{
    activityStore: ActivityStore,
    userStore: UserStore,
    generalStore: GeneralStore,
}

export const store:Stores = {
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    generalStore: new GeneralStore(),
} 

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}