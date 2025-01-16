import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { isSupabaseConfigured } from "@/lib/supabase";
import { AlertCircle } from "lucide-react";

const Index = () => {
  if (!isSupabaseConfigured()) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <Card className="p-6 max-w-md w-full bg-destructive/10 border-destructive">
          <div className="flex items-center gap-2 text-destructive mb-4">
            <AlertCircle className="h-5 w-5" />
            <h2 className="font-semibold">Supabase Not Configured</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Please connect your project to Supabase using the Supabase menu in the top right of the interface.
          </p>
          <a 
            href="https://docs.lovable.dev/integrations/supabase/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Learn how to connect Supabase →
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center space-y-8">
      <div className="text-center space-y-4">
        <h1 className="font-bubblegum text-4xl md:text-6xl bg-gradient-to-r from-sprinkle-pink to-cupcake-blue bg-clip-text text-transparent animate-float">
          Welcome to SprinkleSquad!
        </h1>
        <p className="font-comic text-xl text-gray-600">
          Where tasks become adventures and rewards sparkle! ✨
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
        <Link to="/parent-login">
          <Button
            className="w-full h-32 bg-gradient-to-r from-sprinkle-pink to-cupcake-blue hover:opacity-90 transition-opacity"
            size="lg"
          >
            I'm a Parent
          </Button>
        </Link>
        <Link to="/kid-login">
          <Button
            className="w-full h-32 bg-gradient-to-r from-candy-yellow to-mint-green hover:opacity-90 transition-opacity"
            size="lg"
          >
            I'm a Kid
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;