import postsReducer from "@/entities/post/model/slice";
import usersReducer from "@/entities/user/model/slice";
import metadataReducer from "@/entities/metadata/model/slice";
import authReducer from "@/entities/auth/model/slice";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            posts: postsReducer,
            users: usersReducer,
            metadata: metadataReducer,
            // comments: commentsReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>