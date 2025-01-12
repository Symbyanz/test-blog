import { StoreProvider } from "../_providers/StoreProvider";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <StoreProvider>
      <section className="container mx-auto p-4">
        <div className="max-w-6xl mx-auto p-4">{children}</div>
      </section>
    </StoreProvider>
  );
}
