import { useState, useCallback } from 'react';
import { Upload, FileText, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { generateFileHash, formatHash } from '@/lib/hashUtils';

interface DocumentUploadProps {
  _?: unknown;
}

const DocumentUpload = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState('');
  const [isHashing, setIsHashing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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
    setHash('');
    setIsHashing(true);

    try {
      const fileHash = await generateFileHash(selectedFile);
      setHash(fileHash);
      
      const events = JSON.parse(localStorage.getItem('docverifier_events') || '[]');
      events.push({ type: 'hash', fileName: selectedFile.name, timestamp: Date.now() });
      localStorage.setItem('docverifier_events', JSON.stringify(events));
    } catch (error) {
      console.error('Error generating hash:', error);
    } finally {
      setIsHashing(false);
    }
  };

  const copyHash = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = hash;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="upload" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Document Hash Generator
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Generate <span className="gradient-text">SHA-256 Hash</span>
            </h2>
            <p className="text-muted-foreground">
              Upload document to create unique hash. Share with verifier for tamper-proof proof.
            </p>
          </div>

          <div className="p-6 lg:p-8 rounded-2xl bg-card border border-border/50 shadow-card">
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
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
                <div className="p-4 rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">
                    Drag & drop your document here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse (PDF, DOC, DOCX, JPG, PNG)
                  </p>
                </div>
              </div>
            </div>

            {file && (
              <div className="mt-6 p-4 rounded-lg bg-muted/50 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                {isHashing && (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                )}
              </div>
            )}

            {hash && (
              <div className="mt-6">
                <Label className="text-sm font-medium mb-2 block">
                  SHA-256 Document Hash
                </Label>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 rounded-lg bg-muted font-mono text-sm break-all border">
                    {hash}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyHash}
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-accent" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  ✓ Copy this hash and share with verifier. They upload same document to check match.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentUpload;