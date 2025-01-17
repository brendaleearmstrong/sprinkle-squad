import { IceCream, PartyPopper, Crown, Cake, Cookie } from "lucide-react";

export const FeatureCards = () => {
  const features = [
    {
      icon: <IceCream className="w-8 h-8" />,
      bgIcon: <Cake className="w-32 h-32 opacity-5 absolute -bottom-8 -right-8 transform rotate-12" />,
      title: "Fun Challenges",
      description: "Complete tasks styled as delicious dessert flavors!",
      gradient: "from-primary to-soft-pink"
    },
    {
      icon: <PartyPopper className="w-8 h-8" />,
      bgIcon: <Cookie className="w-32 h-32 opacity-5 absolute -bottom-8 -right-8 transform -rotate-12" />,
      title: "Earn Rewards",
      description: "Collect sprinkle points and unlock sweet prizes!",
      gradient: "from-secondary to-soft-blue"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      bgIcon: <IceCream className="w-32 h-32 opacity-5 absolute -bottom-8 -right-8" />,
      title: "Level Up",
      description: "Watch your dessert tower grow as you progress!",
      gradient: "from-soft-purple to-soft-yellow"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`relative overflow-hidden bg-gradient-to-br ${feature.gradient} p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group`}
        >
          {feature.bgIcon}
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl w-fit mx-auto mb-6 text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
            {feature.icon}
          </div>
          <h3 className="font-display text-2xl font-bold mb-3 text-white relative z-10">
            {feature.title}
          </h3>
          <p className="font-body text-lg text-white/90 relative z-10">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};