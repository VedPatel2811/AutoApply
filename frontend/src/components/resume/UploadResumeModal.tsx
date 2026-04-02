import { useRef, useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from '../ui/Button';
import { extractResumeText } from './extractResume';

interface Props {
  onDone: () => void;
  onClose: () => void;
}

export function UploadResumeModal({ onDone, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const { text, filename } = await extractResumeText(file);
      localStorage.setItem('user_resume_text', text);
      localStorage.setItem('user_resume_filename', filename);
      onDone();
    } catch {
      setError('Could not extract text from the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-8 w-full max-w-md shadow-xl border border-[var(--outline-variant)]/20 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--on-surface)]">Upload Your Resume</h2>
          <button onClick={onClose} className="text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-[var(--outline-variant)]/40 rounded-2xl px-6 py-10 flex flex-col items-center gap-3 cursor-pointer hover:border-[var(--primary)]/50 hover:bg-[var(--surface-container-low)] transition-all"
        >
          <Upload className="w-8 h-8 text-[var(--on-surface-variant)]" />
          {file
            ? <p className="text-sm font-medium text-[var(--on-surface)]">{file.name}</p>
            : <p className="text-sm text-[var(--on-surface-variant)]">Click to upload <span className="font-medium">.pdf</span> or <span className="font-medium">.docx</span></p>
          }
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={e => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button variant="primary" fullWidth onClick={handleSubmit} disabled={!file || loading}>
          {loading ? 'Extracting...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
