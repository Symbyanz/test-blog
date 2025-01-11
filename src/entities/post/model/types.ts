export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  banner: string;
}

export interface PostsState {
  posts: Post[];
  loading: boolean;
  hasLoaded: boolean;
  error: string | null;
}