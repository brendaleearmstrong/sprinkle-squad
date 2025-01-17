import { Logo } from "@/components/ui/Logo";

export const HeroSection = () => {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-8">
      <Logo />
      <div className="relative inline-block w-full max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold bg-gradient-to-r from-neon-pink via-hot-pink to-electric-purple bg-clip-text text-transparent leading-tight">
          Turn Tasks into<br />Sweet Adventures!
        </h1>
      </div>
      <p className="text-lg sm:text-xl md:text-2xl font-body text-electric-purple/90 max-w-2xl mx-auto leading-relaxed bg-gradient-to-br from-space-white to-soft-white backdrop-blur-sm rounded-xl p-6 shadow-xl border border-soft-purple/20">
        Join the fun! Complete tasks, collect magical <span className="text-neon-pink font-bold">✨sprinkles✨</span> and unlock amazing rewards!
      </p>
    </div>
  );
};