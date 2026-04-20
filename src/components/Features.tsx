import { 
  Fingerprint, 
  Zap, 
  Share2, 
  Lock, 
  FileCheck, 
  Shield 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Instant Verification',
      description: 'Verify document authenticity in seconds without manual checks.',
    },
    {
      icon: Fingerprint,
      title: 'SHA-256 Hashing',
      description: 'Unique cryptographic fingerprints. Single character change = different hash.',
    },
    {
      icon: Share2,
      title: 'Instant Sharing',
      description: 'Share hashes via email/text for verification anywhere.',
    },
    {
      icon: Lock,
      title: 'Privacy Preserved',
      description: 'No document storage. Only hashes – your data stays private.',
    },
    {
      icon: FileCheck,
      title: 'Tamper Detection',
      description: 'Any modification detected instantly through hash mismatch.',
    },
    {
      icon: Shield,
      title: 'Tamper-Proof',
      description: 'SHA-256 ensures document integrity for secure verification.',
    },
  ];

  const getColorClasses = (index: number) => {
    const colors = ['primary', 'secondary', 'accent', 'primary', 'secondary', 'accent'];
    const color = colors[index % colors.length];
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'accent':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Core Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Why <span className="gradient-text">DocVerifier</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Fast, secure, free document verification through cryptographic hashes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-card border border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`inline-flex p-4 rounded-xl border ${getColorClasses(index)} mb-6 group-hover:scale-105 transition-transform`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 'About 1s', label: 'Verification' },
            { value: '100%', label: 'Accuracy' },
            { value: 'Free', label: 'Plan Forever' },
            { value: 'Private', label: 'Data' },
          ].map((stat, index) => (
            <div key={stat.label} className="p-6">
              <div className="font-display text-2xl lg:text-3xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

