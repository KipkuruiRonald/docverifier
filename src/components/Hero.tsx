import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const benefits = [
    'Tamper-proof verification',
    'Instant validation',
    'Zero cost',
  ];

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16 pb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(210_100%_85%_/_0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(210_80%_80%_/_0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center py-16">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Instant Document{' '}
              <span className="gradient-text">Hashing</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Free SHA-256 hashing. Generate, share, verify instantly. Private & secure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="gradient-bg text-primary-foreground hover:opacity-90 transition-all px-8 py-6 text-base shadow-xl"
                onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Generate Hash
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/5 px-8 py-6 text-base border-2"
                onClick={() => document.getElementById('verify')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Verify Document
              </Button>
            </div>
          </div>

          {/* Right Content - Space for visual balance */}
          <div className="hidden lg:block min-h-[300px]" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;

