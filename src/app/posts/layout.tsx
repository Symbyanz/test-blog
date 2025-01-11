import { StoreProvider } from "../_providers/StoreProvider";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider>{children}</StoreProvider>;
}
