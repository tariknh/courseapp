import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="pt-[12vh] overflow-hidden mb-24">{children}</main>
      <Footer />
    </>
  );
}
