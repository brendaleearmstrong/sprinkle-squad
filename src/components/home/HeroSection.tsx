import { Logo } from "@/components/ui/Logo";

export const HeroSection = () => {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-8 sm:space-y-12 px-4">
      <Logo />
      <div className="relative inline-block w-full max-w-3xl">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-soft-purple rounded-full blur-xl opacity-70 animate-pulse" />
        <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-soft-purple bg-clip-text text-transparent leading-tight">
          Turn Tasks into Sweet Adventures!
        </h1>
      </div>
      <p className="text-lg sm:text-xl md:text-2xl font-body text-gray-700 max-w-2xl mx-auto leading-relaxed bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-sm">
        Collect magical ✨sprinkles✨ and watch your rewards stack up like the most delicious dessert tower!
      </p>
    </div>
  );
};