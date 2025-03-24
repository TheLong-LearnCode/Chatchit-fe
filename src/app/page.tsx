import ChatBox from "@/components/ChatBox";
import Footer from "@/components/layout/Footer";
import ListChat from "@/components/ListChat";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <main className="flex flex-1 gap-3">
        <div className="w-1/4 border-r">
          <ListChat />
        </div>

        <div className="flex-1">
          <ChatBox />
        </div>
      </main>
      <Footer />
    </div>
  );
}
