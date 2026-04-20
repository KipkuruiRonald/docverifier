import { useState, useCallback } from 'react';
import { Search, Upload, FileText, Check, X, Loader2, AlertCircle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateFileHash, isValidHash, formatHash } from '@/lib/hashUtils';

interface DocumentVerifyProps {
  _?: unknown;
}

interface VerificationResult {
  matches: boolean;
  generatedHash?: string;
  expectedHash?: string;
}

const DocumentVerify = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [generatedHash, setGeneratedHash] = useState('');
  const [expectedHash, setExpectedHash] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isHashing, setIsHashing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setGeneratedHash('');
    setResult(null);
    setError('');
    setIsHashing(true);

    try {
      const fileHash = await generateFileHash(selectedFile);
      setGeneratedHash(fileHash);
    } catch (err) {
      setError('Failed to generate document hash');
    } finally {
      setIsHashing(false);
    }
  };

  const compareHashes = () => {
    if (!generatedHash || !expectedHash) {
      setError('Please generate a hash from file and enter expected hash');
      return;
    }
    if (!isValidHash(expectedHash)) {
      setError('Invalid expected hash format');
      return;
    }

    const matches = generatedHash.toLowerCase() === expectedHash.toLowerCase();
    
    const events = JSON.parse(localStorage.getItem('docverifier_events') || '[]');
    events.push({ type: 'verify', matches, timestamp: Date.now() });
    localStorage.setItem('docverifier_events', JSON.stringify(events));
    
    setResult({
      matches,
      generatedHash,
      expectedHash
    });
    setError('');
  };

  const copyHash = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = hash;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  return (
    <section id="verify" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              Manual Verification
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Verify Document <span className="gradient-text">Integrity</span>
            </h2>
            <p className="text-muted-foreground">
              Compare document hash with shared hash for tamper-proof verification. Free & instant.
            </p>
          </div>

          <div className="p-6 lg:p-8 rounded-2xl bg-card border border-border/50 shadow-card">
            <Tabs defaultValue="file" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="file" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload File
                </TabsTrigger>
                <TabsTrigger value="hash" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Compare Hashes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="file">
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    dragActive ? 'border-secondary bg-secondary/5' : 'border-border hover:border-secondary/50 hover:bg-muted/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-secondary/10">
                      <Search className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Drop your document here</p>
                      <p className="text-sm text-muted-foreground">Generate its SHA-256 hash for comparison</p>
                    </div>
                  </div>
                </div>

                {file && (
                  <div className="mt-6 p-4 rounded-lg bg-muted/50 flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <FileText className="h-5 w-5 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {generatedHash ? formatHash(generatedHash) : 'Generating...'}
                      </p>
                    </div>
                    {isHashing && <Loader2 className="h-5 w-5 animate-spin text-secondary" />}
                  </div>
                )}

                {generatedHash && (
                  <>
                    <Label className="text-sm font-medium mt-6 block mb-2">
                      Expected Hash (shared by document owner)
                    </Label>
                    <Input
                      value={expectedHash}
                      onChange={(e) => setExpectedHash(e.target.value)}
                      placeholder="Paste 64-character SHA-256 hash here..."
                      className="font-mono"
                    />
                    <Button
                      className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      size="lg"
                      onClick={compareHashes}
                      disabled={!expectedHash}
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Compare Hashes
                    </Button>
                  </>
                )}
              </TabsContent>

              <TabsContent value="hash">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Hash 1</Label>
                    <div className="relative">
                      <Input
                        value={generatedHash}
                        onChange={(e) => setGeneratedHash(e.target.value)}
                        placeholder="Paste first SHA-256 hash..."
                        className="font-mono pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                        onClick={() => copyHash(generatedHash || '')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Hash 2 (Expected)</Label>
                    <Input
                      value={expectedHash}
                      onChange={(e) => setExpectedHash(e.target.value)}
                      placeholder="Paste second SHA-256 hash..."
                      className="font-mono"
                    />
                  </div>
                  <Button
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    size="lg"
                    onClick={compareHashes}
                    disabled={!generatedHash || !expectedHash}
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Compare Hashes
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {result && (
              <div className={`mt-8 p-8 rounded-2xl border-4 ${
                result.matches 
                  ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-800' 
                  : 'bg-destructive/10 border-destructive/20'
              }`}>
                <div className="flex items-center gap-4 mb-6">
                  {result.matches ? (
                    <>
                      <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border-emerald-200">
                        <Check className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-emerald-700">
                          Perfect Match ✓
                        </h3>
                        <p className="text-emerald-600 font-medium">
                          Documents are identical. No tampering detected.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 rounded-full bg-destructive/20 border-destructive/30">
                        <X className="h-8 w-8 text-destructive" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-destructive">
                          Mismatch Detected
                        </h3>
                        <p className="text-destructive font-medium">
                          Documents differ or incorrect hash provided.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="font-mono text-sm font-medium mb-2 block">Your Document Hash:</Label>
                    <div className="p-4 rounded-lg bg-muted font-mono text-xs break-all border min-h-[80px] flex items-center">
                      {result.generatedHash}
                    </div>
                  </div>
                  <div>
                    <Label className="font-mono text-sm font-medium mb-2 block">Expected Hash:</Label>
                    <div className="p-4 rounded-lg bg-muted font-mono text-xs break-all border min-h-[80px] flex items-center">
                      {result.expectedHash}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentVerify;

