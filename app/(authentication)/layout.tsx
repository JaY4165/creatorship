import AuthNav from "@/components/shared/AuthNav";

function SharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthNav />
      {children}
    </>
  );
}

export default SharedLayout;
