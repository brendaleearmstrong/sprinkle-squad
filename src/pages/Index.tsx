import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { isSupabaseConfigured } from "@/lib/supabase";
import { AlertCircle, Baby, User2, Sparkles, Star } from "lucide-react";

const Index = () => {
  if (!isSupabaseConfigured()) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <Card className="p-6 max-w-md w-full bg-destructive/10 border-destructive">
          <div className="flex items-center gap-2 text-destructive mb-4">
            <AlertCircle className="h-5 w-5" />
            <h2 className="font-display font-semibold">Supabase Not Configured</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4 font-body">
            Please connect your project to Supabase using the Supabase menu in the top right of the interface.
          </p>
          <a 
            href="https://docs.lovable.dev/integrations/supabase/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline font-body"
          >
            Learn how to connect Supabase →
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center space-y-8 bg-gradient-to-br from-soft-purple via-soft-pink to-soft-blue">
      <div className="text-center space-y-4">
        <h1 className="font-display text-4xl md:text-6xl text-primary flex items-center justify-center gap-2 animate-float">
          <Star className="h-8 w-8 text-secondary" />
          Welcome to SprinkleSquad!
          <Star className="h-8 w-8 text-secondary" />
        </h1>
        <p className="font-body text-xl text-gray-600 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary" />
          Where tasks become adventures and rewards sparkle!
          <Sparkles className="h-5 w-5 text-secondary" />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
        <Link to="/parent-login">
          <Button
            className="w-full h-32 bg-primary hover:bg-primary/90 transition-all group"
            size="lg"
          >
            <User2 className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
            <span className="font-display text-lg">I'm a Parent</span>
          </Button>
        </Link>
        <Link to="/kid-login">
          <Button
            className="w-full h-32 bg-secondary hover:bg-secondary/90 transition-all group"
            size="lg"
          >
            <Baby className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
            <span className="font-display text-lg">I'm a Kid</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;