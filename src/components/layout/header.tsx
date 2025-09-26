import { Paintbrush } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center gap-4">
        <div className="bg-primary text-primary-foreground p-3 rounded-lg shadow-md">
          <Paintbrush className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold font-headline text-foreground">
            RoomAIze
          </h1>
          <p className="text-sm text-muted-foreground">
            Your AI-powered interior design assistant
          </p>
        </div>
      </div>
    </header>
  );
}
