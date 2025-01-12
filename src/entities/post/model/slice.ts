import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
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
        postAdded: {
            reducer(state, action: PayloadAction<Post>) {
                state.posts.push(action.payload);
                saveToLocalStorage("posts", state.posts);
            },
            prepare(
                title: string,
                content: string,
                userId: string,
                category: string = "General",
                banner: string = "/600x300.png",
            ) {
                const curDate = new Date().toISOString();
                const postId = nanoid();
                const metadataId = nanoid();
                return {
                    payload: {
                        id: postId,
                        title,
                        content,
                        userId,
                        metadataId,
                        category,
                        createdAt: curDate,
                        updatedAt: curDate,
                        banner,
                    }
                }
            }
        },
        postRemoved: {
            reducer(state, action: PayloadAction<{ postId: string }>) {
                const { postId } = action.payload;
                state.posts = state.posts.filter((post) => post.id !== postId);
                saveToLocalStorage("posts", state.posts);
            },
            prepare(postId: string) {
                return {
                    payload: {
                        postId,
                    }
                }
            }
        },
        postUpdated: {
            reducer(state, action: PayloadAction<{ id: string; updates: Partial<Post> }>) {
                const { id, updates } = action.payload;
                const existingPost = state.posts.find((post) => post.id === id);
                if (existingPost) {
                    Object.assign(existingPost, updates);
                    saveToLocalStorage("posts", state.posts);
                }
            },
            prepare(id: string, updates: Partial<Omit<Post, "id" | "createdAt" | "updatedAt" | "metadataId">>) {
                return {
                    payload: {
                        id,
                        updates: {
                            ...updates,
                            updatedAt: new Date().toISOString(),
                        }
                    }
                }
            }
        },
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
    selectors: {
        selectAllPosts: (postsState) => postsState,
        selectPostById: (postsState, postId: string) => postsState.posts.find(post => post.id === postId),
    }
});

export const { postAdded, postRemoved, postUpdated } = postsSlice.actions;
export const { selectAllPosts, selectPostById } = postsSlice.selectors;
export default postsSlice.reducer;
