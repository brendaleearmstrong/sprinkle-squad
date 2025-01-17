import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Users, Sparkles, Heart, ListTodo, Gift, User, PiggyBank, Trophy, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-gradient-to-br from-soft-pink via-soft-purple to-soft-blue relative overflow-hidden">
      {/* Animated sprinkles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sprinkle-pop"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <div className={`
              w-3 h-3 rounded-full 
              ${['bg-pink-400', 'bg-purple-400', 'bg-blue-400', 'bg-yellow-400'][Math.floor(Math.random() * 4)]}
              opacity-40 shadow-lg
            `} />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full space-y-12 text-center px-4 mb-24">
        {/* Hero section with sprinkle bowl illustration */}
        <div className="space-y-6">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-full blur-xl opacity-70 animate-pulse" />
            <h1 className="relative text-6xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-float">
              🍨 SprinkleSquad
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-body text-gray-700 max-w-2xl mx-auto leading-relaxed font-semibold">
            Turn everyday tasks into a sweet adventure! Collect magical ✨sprinkles✨ and watch your rewards stack up like a perfect ice cream sundae! 
          </p>
        </div>

        {/* Level System Preview */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: <Trophy className="w-8 h-8" />,
              title: "Level Up",
              description: "Complete tasks to gain XP and unlock new levels!"
            },
            {
              icon: <PiggyBank className="w-8 h-8" />,
              title: "Bank Sprinkles",
              description: "Save your sprinkles for bigger rewards!"
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: "Earn Rewards",
              description: "Trade sprinkles for awesome prizes!"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-primary/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0" />
              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl w-fit mx-auto mb-4 text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="font-body text-lg text-gray-700 font-medium">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Login buttons with sprinkle theme */}
        <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
          <Link to="/parent-login" className="group">
            <Button
              variant="default"
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-display text-lg py-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden font-bold"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')] opacity-10" />
              <Users className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
              I'm a Parent
            </Button>
          </Link>

          <Link to="/kid-login" className="group">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-2 border-secondary/30 bg-white/90 backdrop-blur-sm text-secondary hover:bg-secondary hover:text-white font-display text-lg py-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden font-bold"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')] opacity-5" />
              <Star className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
              I'm a Kid
            </Button>
          </Link>
        </div>

        {/* Feature cards with sprinkle theme */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: <Star className="w-8 h-8" />,
              title: "Daily Tasks",
              description: "Complete fun challenges every day!"
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: "Special Events",
              description: "Join special events for bonus sprinkles!"
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Share Joy",
              description: "Send sprinkles to friends and family!"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-primary/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0" />
              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl w-fit mx-auto mb-4 text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="font-body text-lg text-gray-700 font-medium">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-lg border-t border-white/20 p-4 z-50 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <Link to="/tasks" className="group">
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-col items-center gap-2 hover:bg-white/20 transition-colors"
            >
              <ListTodo className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-white">Tasks</span>
            </Button>
          </Link>

          <Link to="/rewards" className="group">
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-col items-center gap-2 hover:bg-white/20 transition-colors"
            >
              <Gift className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-white">Rewards</span>
            </Button>
          </Link>

          <Link to="/profile" className="group">
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-col items-center gap-2 hover:bg-white/20 transition-colors"
            >
              <User className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-white">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;