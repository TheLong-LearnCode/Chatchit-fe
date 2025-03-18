import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110">
        Real Chat
      </div>

      <div className="flex justify-center items-center space-x-2">
        <ModeToggle />
        <Button className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-orange-600 transition-all duration-300">
          Log out
        </Button>
      </div>
    </header>
  );
}
