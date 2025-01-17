import { IceCream, PartyPopper, Crown, Cake, Cookie } from "lucide-react";

export const FeatureCards = () => {
  const features = [
    {
      icon: <IceCream className="w-8 h-8" />,
      bgIcon: <Cake className="w-32 h-32 opacity-5 absolute -bottom-8 -right-8 transform rotate-12" />,
      title: "Fun Challenges",
      description: "Complete tasks styled as delicious dessert flavors!",
      gradient: "from-berry-blast to-mint-chip"
    },
    {
      icon: <PartyPopper className="w-8 h-8" />,
      bgIcon: <Cookie className="w-32 h-32 opacity-5 absolute -bottom-8 -right-8 transform -rotate-12" />,
      title: "Earn Rewards",
      description: "Collect sprinkle points and unlock sweet prizes!",
      gradient: "from-cherry-top to-caramel-drizzle"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      bgIcon: <IceCream className="w-32 h-32 opacity-5 absolute -bottom-8 -right-8" />,
      title: "Level Up",
      description: "Watch your dessert tower grow as you progress!",
      gradient: "from-mint-chip to-berry-blast"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`group relative overflow-hidden bg-gradient-to-br ${feature.gradient} backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-whipped-cream hover:border-berry-blast/20`}
        >
          {feature.bgIcon}
          <div className="bg-gradient-to-br from-berry-blast to-mint-chip p-4 rounded-2xl w-fit mx-auto mb-4 text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
            {feature.icon}
          </div>
          <h3 className="font-display text-2xl font-bold mb-2 text-white relative z-10">
            {feature.title}
          </h3>
          <p className="font-body text-lg text-white/90 relative z-10">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};