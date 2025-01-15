import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <div className="text-center space-y-4">
        <h1 className="font-bubblegum text-4xl md:text-6xl text-sprinkle-pink animate-float">
          Welcome to SprinkleSquad!
        </h1>
        <p className="font-comic text-xl text-gray-700">
          Make chores fun and earn awesome rewards! 🌟
        </p>
      </div>

      <Card className="w-full max-w-md p-6 bg-white/80 backdrop-blur-sm">
        <div className="space-y-4">
          <Button 
            className="w-full text-lg bg-gradient-to-r from-sprinkle-pink to-cupcake-blue hover:opacity-90 transition-opacity"
            size="lg"
          >
            Parent Login
          </Button>
          <Button 
            className="w-full text-lg bg-gradient-to-r from-candy-yellow to-mint-green hover:opacity-90 transition-opacity"
            size="lg"
          >
            Kid Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;