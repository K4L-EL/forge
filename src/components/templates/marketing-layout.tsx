import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";
import { ChatWidget } from "@/components/organisms/chat-widget";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
