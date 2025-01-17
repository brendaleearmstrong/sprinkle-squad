import { Logo } from "@/components/ui/Logo";

export const HeroSection = () => {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-12 px-4 pt-8">
      <Logo />
      <div className="relative inline-block w-full max-w-3xl animate-float">
        <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold bg-gradient-to-r from-neon-pink via-hot-pink to-electric-purple bg-clip-text text-transparent leading-tight">
          Turn Tasks into<br />Sweet Adventures!
        </h1>
      </div>
      <p className="text-xl sm:text-2xl md:text-3xl font-body text-electric-purple/90 max-w-2xl mx-auto leading-relaxed bg-gradient-to-br from-space-white to-soft-white backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-soft-purple/20">
        Collect magical <span className="text-neon-pink font-bold">✨sprinkles✨</span> and watch your rewards stack up like the most delicious dessert tower!
      </p>
    </div>
  );
};