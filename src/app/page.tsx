import ChatBox from "@/components/layout/ChatBox";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header"

export default function Home() {
  return (
    <div>
      <Header />
      <main className="m-1">
       <ChatBox />
      </main>
      <Footer />
    </div>
  );
}
