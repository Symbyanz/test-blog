export interface Stats {
    comments: number;
    views: number;
    rating: number;
    readingTime: number;
}
export type StatsName = keyof Stats;

export interface Reactions {
    likes: number;
    dislikes: number;
    shares: number;
}

export type ReactionsName = keyof Reactions;

export interface Metadata {
    id: string;
    postId: string;
    reactions: Reactions;
    stats: Stats;
}

export type MetadataName = keyof Metadata;

export interface MetadataState {
    data: Metadata[];
    loading: boolean;
    hasLoaded: boolean;
    error: string | null;
}