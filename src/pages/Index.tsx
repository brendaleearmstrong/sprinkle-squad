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
  PartyPopper
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
            <div 
              className={`
                w-2 h-2 rounded-full shadow-lg
                ${[
                  'bg-sprinkle-rainbow-red',
                  'bg-sprinkle-rainbow-orange',
                  'bg-sprinkle-rainbow-yellow',
                  'bg-sprinkle-rainbow-green',
                  'bg-sprinkle-rainbow-blue',
                  'bg-sprinkle-rainbow-purple'
                ][Math.floor(Math.random() * 6)]}
              `}
              style={{
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 mt-12">
        <Logo />
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-berry-blast via-mint-chip to-cherry-top rounded-full blur-xl opacity-70 animate-pulse" />
          <h1 className="relative text-4xl md:text-6xl font-display font-bold text-chocolate-swirl">
            Turn Tasks into Sweet Adventures!
          </h1>
        </div>
        <p className="text-xl md:text-2xl font-body text-chocolate-swirl/80 max-w-2xl mx-auto leading-relaxed">
          Collect magical ✨sprinkles✨ and watch your rewards stack up like the most delicious ice cream tower!
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
        {[
          {
            icon: <IceCream className="w-8 h-8" />,
            title: "Fun Challenges",
            description: "Complete tasks styled as delicious ice cream flavors!"
          },
          {
            icon: <PartyPopper className="w-8 h-8" />,
            title: "Earn Rewards",
            description: "Collect sprinkle points and unlock sweet prizes!"
          },
          {
            icon: <Crown className="w-8 h-8" />,
            title: "Level Up",
            description: "Watch your ice cream tower grow as you progress!"
          }
        ].map((feature, index) => (
          <div
            key={index}
            className="group bg-whipped-cream/90 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-caramel-drizzle/20 hover:border-berry-blast/20"
          >
            <div className="bg-gradient-to-br from-berry-blast to-mint-chip p-4 rounded-2xl w-fit mx-auto mb-4 text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              {feature.icon}
            </div>
            <h3 className="font-display text-2xl font-bold mb-2 bg-gradient-to-r from-berry-blast to-mint-chip bg-clip-text text-transparent">
              {feature.title}
            </h3>
            <p className="font-body text-lg text-chocolate-swirl">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Login Buttons */}
      <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto mt-12">
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

      {/* Features Sections */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
        <div className="bg-whipped-cream/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-caramel-drizzle/20">
          <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-2 text-chocolate-swirl">
            <Crown className="w-6 h-6 text-berry-blast" />
            For Parents
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-chocolate-swirl">
              <CheckCircle2 className="w-5 h-5 text-berry-blast" />
              Create custom rewards and tasks
            </li>
            <li className="flex items-center gap-3 text-chocolate-swirl">
              <Star className="w-5 h-5 text-berry-blast" />
              Track your kids' progress
            </li>
            <li className="flex items-center gap-3 text-chocolate-swirl">
              <Gift className="w-5 h-5 text-berry-blast" />
              Approve and manage rewards
            </li>
          </ul>
        </div>

        <div className="bg-whipped-cream/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-caramel-drizzle/20">
          <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-2 text-chocolate-swirl">
            <IceCream className="w-6 h-6 text-mint-chip" />
            For Kids
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-chocolate-swirl">
              <Rocket className="w-5 h-5 text-mint-chip" />
              Complete fun daily challenges
            </li>
            <li className="flex items-center gap-3 text-chocolate-swirl">
              <Trophy className="w-5 h-5 text-mint-chip" />
              Level up and earn badges
            </li>
            <li className="flex items-center gap-3 text-chocolate-swirl">
              <PartyPopper className="w-5 h-5 text-mint-chip" />
              Redeem sprinkles for rewards
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;