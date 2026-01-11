import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { User, Target, Building2 } from "lucide-react";

interface HeroProps {
  onSelectUserType: (type: 'batsman' | 'bowler' | 'academy') => void;
}

export const Hero = ({ onSelectUserType }: HeroProps) => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-16 animate-fade-in">
          <Logo variant="light" />
          <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
            <span className="hidden sm:inline">Launching in</span>
            <span className="px-3 py-1 bg-primary-foreground/10 backdrop-blur-sm rounded-full font-semibold text-primary-foreground">
              Delhi NCR
            </span>
          </div>
        </header>

        {/* Main content */}
        <div className="max-w-4xl mx-auto text-center pt-8 md:pt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6 animate-slide-up leading-tight">
            Practice smarter.
            <br />
            Book cricket sessions
            <span className="block mt-2 text-accent">instantly.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            One platform to book nets, bowlers & training sessions. 
            We're building the future of cricket practice.
          </p>

          {/* User type selection */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-primary-foreground/70 text-sm uppercase tracking-wider font-semibold mb-6">
              I am a...
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Button
                variant="heroOutline"
                size="xl"
                onClick={() => onSelectUserType('batsman')}
                className="group flex-col h-auto py-6 gap-3"
              >
                <User className="w-8 h-8 text-primary-foreground group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold">Batsman</span>
                <span className="text-xs text-primary-foreground/60">Looking to practice</span>
              </Button>

              <Button
                variant="heroOutline"
                size="xl"
                onClick={() => onSelectUserType('bowler')}
                className="group flex-col h-auto py-6 gap-3"
              >
                <Target className="w-8 h-8 text-primary-foreground group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold">Bowler / Throwdown</span>
                <span className="text-xs text-primary-foreground/60">Looking to earn</span>
              </Button>

              <Button
                variant="heroOutline"
                size="xl"
                onClick={() => onSelectUserType('academy')}
                className="group flex-col h-auto py-6 gap-3"
              >
                <Building2 className="w-8 h-8 text-primary-foreground group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold">Academy / Ground</span>
                <span className="text-xs text-primary-foreground/60">Looking to grow</span>
              </Button>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-primary-foreground/10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-primary-foreground/50 text-sm">
              Join 100+ cricketers already on the waitlist
            </p>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path 
            d="M0 120V60C240 20 480 0 720 0C960 0 1200 20 1440 60V120H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};
