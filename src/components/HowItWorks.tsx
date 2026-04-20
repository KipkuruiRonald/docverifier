const HowItWorks = () => {
  const steps = [
    {
      title: 'Upload Document',
      description: 'Anyone can upload any document to generate its cryptographic hash.',
    },
    {
      title: 'Generate Hash',
      description: 'SHA-256 algorithm creates a unique 64-character cryptographic fingerprint.',
    },
    {
      title: 'Share Hash',
      description: 'Share the hash via email, text, or any messaging platform.',
    },
    {
      title: 'Instant Verification',
      description: 'Anyone can verify by uploading the document and comparing the generated hash.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple 4-Step Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            How <span className="gradient-text">DocVerifier</span> Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Generate, share, and verify hashes in four simple steps.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent hidden lg:block -translate-y-1/2 opacity-30" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative group h-full">
                <div className="relative p-8 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 h-full flex flex-col items-center text-center">
                  <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                    <span className="font-display text-xl font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border/50 text-center">
          <h3 className="font-display text-2xl font-semibold mb-3">
            Ready to Get Started?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Generate your first document hash and start verifying today - completely free.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#upload"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-lg"
            >
              Generate Hash
            </a>
            <a 
              href="#verify"
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-primary/30 bg-background font-medium hover:bg-primary/5 transition-colors"
            >
              Verify Document
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

