import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Users, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-soft-purple via-soft-pink to-soft-blue relative overflow-hidden">
      {/* Animated sprinkles background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[10%] animate-float">
          <Star className="w-6 h-6 text-primary/30" />
        </div>
        <div className="absolute top-20 right-[20%] animate-float" style={{ animationDelay: "0.5s" }}>
          <Star className="w-4 h-4 text-secondary/30" />
        </div>
        <div className="absolute bottom-32 left-[30%] animate-float" style={{ animationDelay: "0.8s" }}>
          <Sparkles className="w-5 h-5 text-primary/30" />
        </div>
        <div className="absolute bottom-20 right-[15%] animate-float" style={{ animationDelay: "1.2s" }}>
          <Star className="w-5 h-5 text-secondary/30" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full space-y-12 text-center px-4">
        {/* Logo and title section */}
        <div className="space-y-6">
          <div className="relative inline-block">
            <Sparkles className="absolute -top-8 -right-8 w-12 h-12 text-primary animate-spin-slow" />
            <h1 className="text-5xl md:text-7xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-float">
              SprinkleSquad
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-body text-gray-600 max-w-2xl mx-auto">
            Turn everyday tasks into exciting adventures! Earn ✨ sprinkles ✨ and unlock amazing rewards.
          </p>
        </div>

        {/* Sprinkles counter demo */}
        <div className="flex justify-center items-center gap-2 animate-float" style={{ animationDelay: "0.3s" }}>
          <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-2xl shadow-lg flex items-center gap-3 transform hover:scale-105 transition-transform">
            <Star className="w-8 h-8 text-white animate-spin-slow" />
            <span className="font-display text-3xl text-white">Sprinkles</span>
          </div>
        </div>

        {/* Login buttons */}
        <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
          <Link to="/parent-login" className="transform hover:scale-105 transition-transform">
            <Button
              variant="default"
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-display text-lg py-6 rounded-xl shadow-lg"
            >
              <Users className="mr-2 h-6 w-6" />
              I'm a Parent
            </Button>
          </Link>

          <Link to="/kid-login" className="transform hover:scale-105 transition-transform">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-2 border-secondary bg-white/80 backdrop-blur-sm text-secondary hover:bg-secondary hover:text-white font-display text-lg py-6 rounded-xl shadow-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              I'm a Kid
            </Button>
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          {[
            {
              icon: <Star className="w-8 h-8" />,
              title: "Earn Sprinkles",
              description: "Complete tasks to collect magical sprinkles!"
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: "Track Progress",
              description: "Watch your sprinkle collection grow!"
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: "Win Rewards",
              description: "Trade sprinkles for awesome prizes!"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg w-fit mx-auto mb-4 text-white">
                {feature.icon}
              </div>
              <h3 className="font-display text-xl mb-2 text-gray-800">{feature.title}</h3>
              <p className="font-body text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;