interface PrivateLayoutProps {
  children: React.ReactNode;
}
export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  // const {session} = await sessionService.verifySession(); // import from entities/user/server
  return <div>{children}</div>;
}
