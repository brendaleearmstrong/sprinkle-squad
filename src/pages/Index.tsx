import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Users, Sparkles, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-soft-purple via-soft-pink to-soft-blue relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[10%] animate-float">
          <Sparkles className="w-8 h-8 text-primary/30" />
        </div>
        <div className="absolute top-20 right-[20%] animate-float" style={{ animationDelay: "0.5s" }}>
          <Star className="w-6 h-6 text-secondary/30" />
        </div>
        <div className="absolute bottom-32 left-[30%] animate-float" style={{ animationDelay: "0.8s" }}>
          <Heart className="w-7 h-7 text-primary/30" />
        </div>
        <div className="absolute bottom-20 right-[15%] animate-float" style={{ animationDelay: "1.2s" }}>
          <Sparkles className="w-8 h-8 text-secondary/30" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full space-y-16 text-center px-4">
        {/* Hero section */}
        <div className="space-y-8">
          <div className="relative inline-block">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-xl animate-pulse" />
            <h1 className="text-6xl md:text-8xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-float">
              SprinkleSquad
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-body text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Turn everyday tasks into magical adventures! Earn ✨ sprinkles ✨ and unlock amazing rewards.
          </p>
        </div>

        {/* Sprinkles counter demo */}
        <div className="flex justify-center items-center gap-4 animate-float" style={{ animationDelay: "0.3s" }}>
          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/30 flex items-center gap-4 transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-2xl">
              <Star className="w-8 h-8 text-white animate-spin-slow" />
            </div>
            <span className="font-display text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sprinkles
            </span>
          </div>
        </div>

        {/* Login buttons */}
        <div className="grid gap-8 md:grid-cols-2 max-w-2xl mx-auto">
          <Link to="/parent-login" className="group">
            <Button
              variant="default"
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-display text-lg py-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300"
            >
              <Users className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
              I'm a Parent
            </Button>
          </Link>

          <Link to="/kid-login" className="group">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-2 border-secondary/30 bg-white/80 backdrop-blur-sm text-secondary hover:bg-secondary hover:text-white font-display text-lg py-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300"
            >
              <Star className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
              I'm a Kid
            </Button>
          </Link>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          {[
            {
              icon: <Star className="w-8 h-8" />,
              title: "Earn Sprinkles",
              description: "Complete tasks to collect magical sprinkles!"
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: "Level Up",
              description: "Watch your progress grow with each task!"
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Win Rewards",
              description: "Trade sprinkles for awesome prizes!"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-primary/20"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl w-fit mx-auto mb-6 text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="font-display text-2xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="font-body text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;