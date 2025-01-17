import { Logo } from "@/components/ui/Logo";

export const HeroSection = () => {
  return (
    <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 mt-12">
      <Logo />
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
  );
};