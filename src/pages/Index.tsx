import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";
import { 
  IceCream, 
  Heart, 
  Star, 
  Gift, 
  Trophy, 
  Sparkles,
  Crown,
  CheckCircle2,
  Rocket,
  PartyPopper,
  Cake,
  Cookie
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 relative overflow-hidden">
      {/* Animated Background Sprinkles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sprinkle-pop"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            {/* Randomly choose between sprinkle shapes */}
            {Math.random() > 0.7 ? (
              <Star 
                className={`w-3 h-3 ${[
                  'text-berry-blast',
                  'text-mint-chip',
                  'text-cherry-top',
                  'text-caramel-drizzle',
                  'text-sprinkle-rainbow-blue',
                  'text-sprinkle-rainbow-purple'
                ][Math.floor(Math.random() * 6)]}`}
              />
            ) : Math.random() > 0.4 ? (
              <Heart 
                className={`w-2 h-2 ${[
                  'text-berry-blast',
                  'text-mint-chip',
                  'text-cherry-top',
                  'text-caramel-drizzle',
                  'text-sprinkle-rainbow-blue',
                  'text-sprinkle-rainbow-purple'
                ][Math.floor(Math.random() * 6)]}`}
              />
            ) : (
              <div 
                className={`
                  w-2 h-2 rounded-full shadow-lg
                  ${[
                    'bg-berry-blast',
                    'bg-mint-chip',
                    'bg-cherry-top',
                    'bg-caramel-drizzle',
                    'bg-sprinkle-rainbow-blue',
                    'bg-sprinkle-rainbow-purple'
                  ][Math.floor(Math.random() * 6)]}
                `}
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 mt-12">
        <Logo className="w-48 h-48 mx-auto" />
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-berry-blast via-mint-chip to-cherry-top rounded-full blur-xl opacity-70 animate-pulse" />
          <h1 className="relative text-4xl md:text-6xl font-display font-bold text-chocolate-swirl">
            Turn Tasks into Sweet Adventures!
          </h1>
        </div>
        <p className="text-xl md:text-2xl font-body text-chocolate-swirl/80 max-w-2xl mx-auto leading-relaxed">
          Collect magical ✨sprinkles✨ and watch your rewards stack up like the most delicious dessert tower!
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
        {[
          {
            icon: <IceCream className="w-8 h-8" />,
            bgIcon: <Cake className="w-32 h-32 opacity-5 absolute -bottom-8 -right-8 transform rotate-12" />,
            title: "Fun Challenges",
            description: "Complete tasks styled as delicious dessert flavors!",
            gradient: "from-berry-blast/20 to-mint-chip/20"
          },
          {
            icon: <PartyPopper className="w-8 h-8" />,
            bgIcon: <Cookie className="w-32 h-32 opacity-5 absolute -bottom-8 -right-8 transform -rotate-12" />,
            title: "Earn Rewards",
            description: "Collect sprinkle points and unlock sweet prizes!",
            gradient: "from-cherry-top/20 to-waffle-cone/20"
          },
          {
            icon: <Crown className="w-8 h-8" />,
            bgIcon: <IceCream className="w-32 h-32 opacity-5 absolute -bottom-8 -right-8" />,
            title: "Level Up",
            description: "Watch your dessert tower grow as you progress!",
            gradient: "from-mint-chip/20 to-berry-blast/20"
          }
        ].map((feature, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden bg-gradient-to-br ${feature.gradient} backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-caramel-drizzle/20 hover:border-berry-blast/20`}
          >
            {feature.bgIcon}
            <div className="bg-gradient-to-br from-berry-blast to-mint-chip p-4 rounded-2xl w-fit mx-auto mb-4 text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              {feature.icon}
            </div>
            <h3 className="font-display text-2xl font-bold mb-2 bg-gradient-to-r from-berry-blast to-mint-chip bg-clip-text text-transparent relative z-10">
              {feature.title}
            </h3>
            <p className="font-body text-lg text-chocolate-swirl relative z-10">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Login Buttons */}
      <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto mt-12 mb-24">
        <Link to="/parent-login" className="group">
          <Button
            variant="default"
            size="lg"
            className="w-full bg-gradient-to-r from-berry-blast to-mint-chip hover:opacity-90 text-white font-display text-lg py-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300"
          >
            <Crown className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
            Parent Dashboard
          </Button>
        </Link>

        <Link to="/kid-login" className="group">
          <Button
            variant="outline"
            size="lg"
            className="w-full border-2 border-mint-chip/30 bg-whipped-cream/90 backdrop-blur-sm text-mint-chip hover:bg-mint-chip hover:text-white font-display text-lg py-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300"
          >
            <Star className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
            Kid Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;