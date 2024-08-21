import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="mb-24">{children}</main>
      <Footer />
    </>
  );
}
