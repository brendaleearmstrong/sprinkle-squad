import { IceCream, PartyPopper, Crown, Star, Heart, Gift } from "lucide-react";

export const FeatureCards = () => {
  const features = [
    {
      icon: <IceCream className="w-10 h-10" />,
      title: "Fun Challenges",
      description: "Complete tasks styled as delicious dessert flavors!",
      gradient: "from-neon-pink via-hot-pink to-electric-purple",
      animation: "hover:rotate-12"
    },
    {
      icon: <PartyPopper className="w-10 h-10" />,
      title: "Earn Rewards",
      description: "Collect sprinkle points and unlock sweet prizes!",
      gradient: "from-neon-orange via-bright-orange to-hot-pink",
      animation: "hover:-rotate-12"
    },
    {
      icon: <Crown className="w-10 h-10" />,
      title: "Level Up",
      description: "Watch your dessert tower grow as you progress!",
      gradient: "from-electric-purple via-bright-blue to-electric-blue",
      animation: "hover:rotate-6"
    },
    {
      icon: <Star className="w-10 h-10" />,
      title: "Daily Surprises",
      description: "Discover new tasks and special rewards every day!",
      gradient: "from-neon-green via-bright-blue to-electric-blue",
      animation: "hover:-rotate-6"
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Share Joy",
      description: "Send sprinkles to friends and family!",
      gradient: "from-hot-pink via-electric-purple to-bright-blue",
      animation: "hover:rotate-12"
    },
    {
      icon: <Gift className="w-10 h-10" />,
      title: "Special Events",
      description: "Join exciting seasonal challenges and events!",
      gradient: "from-electric-blue via-neon-pink to-neon-orange",
      animation: "hover:-rotate-12"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mt-16 px-4 pb-20">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`group relative overflow-hidden bg-gradient-to-br ${feature.gradient} p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
        >
          <div className="absolute inset-0 bg-space-white/5 backdrop-blur-[2px] rounded-3xl" />
          <div className={`bg-space-white/90 backdrop-blur-sm p-5 rounded-2xl w-fit mx-auto mb-8 transform transition-all duration-500 ${feature.animation} group-hover:scale-110 shadow-lg`}>
            {feature.icon}
          </div>
          <h3 className="font-display text-3xl font-bold mb-4 text-space-white relative z-10">
            {feature.title}
          </h3>
          <p className="font-body text-xl text-space-white/90 relative z-10 leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};