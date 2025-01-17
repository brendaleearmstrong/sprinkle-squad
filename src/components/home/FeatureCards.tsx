import { IceCream, PartyPopper, Crown, Star, Heart, Gift, Sparkles, Trophy, Target, Users } from "lucide-react";

export const FeatureCards = () => {
  const features = [
    {
      icon: <Target className="w-10 h-10" />,
      title: "Personalized Goals",
      description: "Set custom tasks and goals tailored to your child's interests and abilities. Watch them grow with every achievement!",
      gradient: "from-neon-pink via-hot-pink to-electric-purple",
      animation: "hover:rotate-12"
    },
    {
      icon: <PartyPopper className="w-10 h-10" />,
      title: "Exciting Rewards",
      description: "Create meaningful rewards that motivate and inspire. From extra screen time to special family activities!",
      gradient: "from-neon-orange via-bright-orange to-hot-pink",
      animation: "hover:-rotate-12"
    },
    {
      icon: <Crown className="w-10 h-10" />,
      title: "Level Up System",
      description: "Kids progress through fun levels, unlocking new challenges and rewards as they grow. Watch their confidence soar!",
      gradient: "from-electric-purple via-bright-blue to-electric-blue",
      animation: "hover:rotate-6"
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: "Sprinkle Economy",
      description: "Teach valuable lessons about earning, saving, and spending with our fun sprinkle-based reward system!",
      gradient: "from-neon-green via-bright-blue to-electric-blue",
      animation: "hover:-rotate-6"
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "Achievement Tracking",
      description: "Celebrate progress with beautiful charts and achievements. Perfect for parent-teacher meetings!",
      gradient: "from-hot-pink via-electric-purple to-bright-blue",
      animation: "hover:rotate-12"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Family Connection",
      description: "Strengthen family bonds through shared goals and celebrations. Create lasting memories together!",
      gradient: "from-electric-blue via-neon-pink to-neon-orange",
      animation: "hover:-rotate-12"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 pb-20">
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