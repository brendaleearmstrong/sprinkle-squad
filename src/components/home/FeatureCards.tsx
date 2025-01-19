import { Heart, IceCream, Star } from "lucide-react";

export const FeatureCards = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Personalized Goals Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neon-pink to-hot-pink p-6 shadow-lg transition-transform hover:scale-105">
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-white/90 p-3 backdrop-blur-sm">
              <Heart className="h-8 w-8 text-neon-pink" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
              Personalized Goals
            </h3>
            <p className="text-center text-white/90 leading-relaxed">
              Set custom tasks and goals tailored to your child's interests and abilities. Watch them grow with every achievement!
            </p>
          </div>
        </div>

        {/* Exciting Rewards Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neon-orange to-bright-orange p-6 shadow-lg transition-transform hover:scale-105">
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-white/90 p-3 backdrop-blur-sm">
              <IceCream className="h-8 w-8 text-neon-orange" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
              Exciting Rewards
            </h3>
            <p className="text-center text-white/90 leading-relaxed">
              Create meaningful rewards that motivate and inspire. From extra screen time to special family activities!
            </p>
          </div>
        </div>

        {/* Level Up System Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-electric-blue to-bright-blue p-6 shadow-lg transition-transform hover:scale-105">
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-white/90 p-3 backdrop-blur-sm">
              <Star className="h-8 w-8 text-electric-blue" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
              Level Up System
            </h3>
            <p className="text-center text-white/90 leading-relaxed">
              Kids progress through fun levels, unlocking new challenges and rewards as they grow. Watch their confidence soar!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};