import { calcReadTime } from "@/shared/lib/text/calcReadTime";
import { Metadata, MetadataState } from "./types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "@/features/localStorage";


export const loadMetadataAsync = createAsyncThunk("metadata/loadMetadata", async () => {
    return new Promise<Metadata[]>((resolve) => {
        setTimeout(() => {
            const posts = loadFromLocalStorage<Metadata[]>("metadata");
            resolve(posts || []);
        }, 1000);
    });
});

const defaultMetadaState: Metadata = {
    id: "",
    postId: "",
    reactions: {
        likes: 0,
        dislikes: 0,
        shares: 0,
    },
    stats: {
        comments: 0,
        views: 0,
        rating: 0,
        readingTime: 0,
    }
}

const initialState: MetadataState = {
    data: [],
    loading: true,
    error: null,
    hasLoaded: false,
}


export const metadataSlice = createSlice({
    name: "metadata",
    initialState,
    reducers: {
        metadataAdded: {
            reducer(state, action: PayloadAction<Metadata>) {
                state.data.push(action.payload);
                saveToLocalStorage("metadata", state.data);
            },
            prepare(postId: string, metadataId: string, content: string) {
                const readingTime = calcReadTime(content);
                return {
                    payload: {
                        ...defaultMetadaState,
                        id: metadataId,
                        postId,
                        stats: {
                            ...defaultMetadaState.stats,
                            readingTime
                        }
                    }
                }
            }
        },
        metadataUpdated: {
            reducer(state, action: PayloadAction<{ id: string; updates: Partial<Omit<Metadata, "id" | "postId">> }>) {
                const { id, updates } = action.payload;
                const existingMetadata = state.data.find((metadata) => metadata.id === id);
                if (existingMetadata) {
                    Object.assign(existingMetadata, updates);
                    saveToLocalStorage("metadata", state.data);
                }
            },
            prepare(id: string, updates: Partial<Omit<Metadata, "id" | "postId">>) {
                return { payload: { id, updates } };
            }
        },
        // metadataRemoved(state, action: PayloadAction<string>) {
        //     state.data = state.data.filter((metadata) => metadata.id !== action.payload);
        //     saveToLocalStorage("metadata", state.data);
        // },
        metadataPostRemoved(state, action: PayloadAction<string>) {
            const postId = action.payload;
            state.data = state.data.filter((metadata) => metadata.postId !== postId);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadMetadataAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                if (!state.hasLoaded) {
                    state.data = [];
                }
            })
            .addCase(loadMetadataAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.hasLoaded = true;
            })
            .addCase(loadMetadataAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to load posts";
            });
    },
    selectors: {
        selectAllMetadatas: metadataState => metadataState,
        selectMetadataById: (metadataState, metadataId: string) => metadataState.data.find(metadata => metadata.id === metadataId),
        selectReactionsById: (metadataState, metadataId: string) => metadataState.data.find(metadata => metadata.id === metadataId)?.reactions,
        selectStatsById: (metadataState, metadataId: string) => metadataState.data.find(metadata => metadata.id === metadataId)?.stats,
    }
})


export const { metadataAdded, metadataUpdated, metadataPostRemoved } = metadataSlice.actions;
export const { selectAllMetadatas, selectMetadataById, selectReactionsById, selectStatsById } = metadataSlice.selectors;
export default metadataSlice.reducer;