
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <>
   <div className="bg-black w-screen h-[12vh] z-20 fixed"></div>
   <main className="pt-[12vh]">
   {children}
   </main>
   </>
  );
}
