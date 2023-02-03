import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import UserStore from "./UserStore"
import GeneralStore from "./GeneralStore"
import ProfileStore from "./ProfileStore";

interface Stores{
    activityStore: ActivityStore,
    userStore: UserStore,
    generalStore: GeneralStore,
    profileStore: ProfileStore,
}

export const store: Stores = {
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    generalStore: new GeneralStore(),
    profileStore: new ProfileStore(),
} 

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}