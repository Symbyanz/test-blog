import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostsState } from "./types";
import { loadFromLocalStorage, saveToLocalStorage } from "@/features/localStorage";


export const loadPostsAsync = createAsyncThunk("posts/loadPosts", async () => {
    return new Promise<Post[]>((resolve) => {
        setTimeout(() => {
            const posts = loadFromLocalStorage<Post[]>("posts");
            resolve(posts || []);
        }, 1500);
    });
});

const initialState: PostsState = {
    posts: [],
    loading: true,
    error: null,
    hasLoaded: false,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded(state, action: PayloadAction<Post>) {
            state.posts.push(action.payload);
            saveToLocalStorage("posts", state.posts);
        },
        postRemoved(state, action: PayloadAction<string>) {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
            saveToLocalStorage("posts", state.posts);
        },
        postUpdated(state, action: PayloadAction<Post>) {
            const { id, title, content, category, updatedAt, banner } = action.payload;
            const existingPost = state.posts.find(post => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
                existingPost.category = category;
                existingPost.banner = banner;
                existingPost.updatedAt = updatedAt
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPostsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                if (!state.hasLoaded) {
                    state.posts = [];
                }
            })
            .addCase(loadPostsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
                state.hasLoaded = true;
            })
            .addCase(loadPostsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to load posts";
            });
    },
});

export const { postAdded, postRemoved, postUpdated } = postsSlice.actions;
export const selectAllPosts = createSelector(
    [(state: { posts: PostsState }) => state.posts],
    (posts) => posts
);
export const selectPostById = createSelector(
    [(state: { posts: PostsState }) => state.posts.posts,
    (state: { posts: PostsState }, postId: string) => postId],  // Указываем postId как отдельный аргумент
    (posts, postId) => posts.find(post => post.id === postId)
);
export default postsSlice.reducer;
