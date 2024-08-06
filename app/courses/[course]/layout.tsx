export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="pt-[12vh] overflow-hidden">{children}</main>
    </>
  );
}
