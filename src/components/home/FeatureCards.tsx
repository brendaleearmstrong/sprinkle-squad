import { IceCream, PartyPopper, Crown, Cake, Cookie, Star, Heart, Smile } from "lucide-react";

export const FeatureCards = () => {
  const features = [
    {
      icon: <IceCream className="w-8 h-8 sm:w-10 sm:h-10" />,
      bgIcon: <Cake className="w-24 h-24 sm:w-32 sm:h-32 opacity-5 absolute -bottom-8 -right-8 transform rotate-12" />,
      title: "Fun Challenges",
      description: "Complete tasks styled as delicious dessert flavors!",
      gradient: "from-neon-pink to-soft-white"
    },
    {
      icon: <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10" />,
      bgIcon: <Cookie className="w-24 h-24 sm:w-32 sm:h-32 opacity-5 absolute -bottom-8 -right-8 transform -rotate-12" />,
      title: "Earn Rewards",
      description: "Collect sprinkle points and unlock sweet prizes!",
      gradient: "from-neon-orange to-soft-white"
    },
    {
      icon: <Crown className="w-8 h-8 sm:w-10 sm:h-10" />,
      bgIcon: <Star className="w-24 h-24 sm:w-32 sm:h-32 opacity-5 absolute -bottom-8 -right-8" />,
      title: "Level Up",
      description: "Watch your dessert tower grow as you progress!",
      gradient: "from-electric-purple to-soft-white"
    },
    {
      icon: <Heart className="w-8 h-8 sm:w-10 sm:h-10" />,
      bgIcon: <IceCream className="w-24 h-24 sm:w-32 sm:h-32 opacity-5 absolute -bottom-8 -right-8 transform rotate-45" />,
      title: "Share Joy",
      description: "Send sprinkles to friends and family!",
      gradient: "from-bright-blue to-soft-white"
    },
    {
      icon: <Star className="w-8 h-8 sm:w-10 sm:h-10" />,
      bgIcon: <Cookie className="w-24 h-24 sm:w-32 sm:h-32 opacity-5 absolute -bottom-8 -right-8 transform -rotate-45" />,
      title: "Daily Surprises",
      description: "Discover new tasks and special rewards every day!",
      gradient: "from-neon-green to-soft-white"
    },
    {
      icon: <Smile className="w-8 h-8 sm:w-10 sm:h-10" />,
      bgIcon: <Heart className="w-24 h-24 sm:w-32 sm:h-32 opacity-5 absolute -bottom-8 -right-8" />,
      title: "Family Fun",
      description: "Bond with your family through exciting challenges!",
      gradient: "from-hot-pink to-soft-white"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto mt-12 sm:mt-16 lg:mt-20 px-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`relative overflow-hidden bg-gradient-to-br ${feature.gradient} p-8 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group`}
        >
          {feature.bgIcon}
          <div className="bg-space-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-xl sm:rounded-2xl w-fit mx-auto mb-6 sm:mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
            {feature.icon}
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-electric-purple relative z-10">
            {feature.title}
          </h3>
          <p className="font-body text-lg sm:text-xl text-electric-purple/90 relative z-10 leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};