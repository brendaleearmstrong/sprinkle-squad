import { Logo } from "@/components/ui/Logo";

export const HeroSection = () => {
  return (
    <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12 mt-8">
      <Logo />
      <div className="relative inline-block">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-soft-purple rounded-full blur-xl opacity-70 animate-pulse" />
        <h1 className="relative text-6xl md:text-7xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-soft-purple bg-clip-text text-transparent">
          Turn Tasks into Sweet Adventures!
        </h1>
      </div>
      <p className="text-xl md:text-2xl font-body text-gray-700 max-w-2xl mx-auto leading-relaxed bg-white/50 backdrop-blur-sm rounded-xl p-4">
        Collect magical ✨sprinkles✨ and watch your rewards stack up like the most delicious dessert tower!
      </p>
    </div>
  );
};