import { createContext, useContext } from "react";

import ActivityStore from "./ActivityStore";
import UserStore from "./UserStore"
import CommonStore from "./CommonStore"
import ProfileStore from "./ProfileStore";
import LiveCommentStore from "./LiveCommentStore";

interface Stores{
    activityStore: ActivityStore,
    userStore: UserStore,
    commonStore: CommonStore,
    profileStore: ProfileStore,
    liveCommentStore: LiveCommentStore
}

export const store: Stores = {
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    profileStore: new ProfileStore(),
    liveCommentStore: new LiveCommentStore(),
} 

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}