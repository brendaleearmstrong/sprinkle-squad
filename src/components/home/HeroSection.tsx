import { Logo } from "@/components/ui/Logo";

export const HeroSection = () => {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-8 sm:space-y-12 px-4">
      <Logo />
      <div className="relative inline-block w-full max-w-3xl">
        <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-chocolate-swirl leading-tight">
          Turn Tasks into Sweet Adventures!
        </h1>
      </div>
      <p className="text-xl sm:text-2xl md:text-3xl font-body text-chocolate-swirl/90 max-w-2xl mx-auto leading-relaxed bg-vanilla-cream/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        Collect magical ✨sprinkles✨ and watch your rewards stack up like the most delicious dessert tower!
      </p>
    </div>
  );
};