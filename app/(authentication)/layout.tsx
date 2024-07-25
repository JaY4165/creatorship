import AuthNav from "@/components/shared/AuthNav";

function SharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  classNames?: string;
}>) {
  return (
    <>
      <AuthNav />
      {children}
    </>
  );
}

export default SharedLayout;
