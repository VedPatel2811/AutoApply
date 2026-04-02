import { useRef, useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { extractResumeText } from './extractResume';

interface Props {
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  tempResumeText: string | null;
  tempResumeFilename: string | null;
  onSetTemp: (text: string, filename: string) => void;
  onClose: () => void;
}

export function ResumeSelectionModal({
  jobTitle,
  jobDescription,
  companyName,
  tempResumeText,
  tempResumeFilename,
  onSetTemp,
  onClose,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [useTemp, setUseTemp] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const savedFilename = localStorage.getItem('user_resume_filename') ?? 'saved resume';
  const savedText = localStorage.getItem('user_resume_text') ?? '';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      setError('File exceeds 4 MB limit.');
      return;
    }
    setExtracting(true);
    setError(null);
    try {
      const { text, filename } = await extractResumeText(file);
      onSetTemp(text, filename);
    } catch {
      setError('Could not extract text. Please try another file.');
    } finally {
      setExtracting(false);
    }
  };

  const handleGenerate = async () => {
    const resumeText = useTemp ? (tempResumeText ?? '') : savedText;
    if (!resumeText) return;

    const apiKey = localStorage.getItem('groq_api_key') ?? '';
    setGenerating(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/resume/generate-resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          resume_text: resumeText,
          job_title: jobTitle,
          job_description: jobDescription,
          company_name: companyName,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error('Invalid Groq API key. Please update it by clicking "Create Resume" again.');
        if (res.status === 429) throw new Error('Groq API quota exceeded. Try again later.');
        throw new Error('Resume generation failed. Please try again.');
      }

      const blob = await res.blob();
      const safe = (s: string) => s.replace(/[^\w\-]/g, '_');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${safe(companyName)}_${safe(jobTitle)}_resume.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Resume generation failed. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const canGenerate = useTemp ? !!tempResumeText : !!savedText;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-8 w-full max-w-md shadow-xl border border-[var(--outline-variant)]/20 space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[var(--on-surface)]">Generate Tailored Resume</h2>
            <p className="text-xs text-[var(--on-surface-variant)] mt-1 truncate max-w-xs">for: {jobTitle} · {companyName}</p>
          </div>
          <button onClick={onClose} disabled={generating} className="text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors disabled:opacity-40">
            <X className="w-5 h-5" />
          </button>
        </div>

        {generating ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
            <p className="text-sm text-[var(--on-surface-variant)]">Tailoring your resume...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Option A */}
            <label className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border cursor-pointer transition-all ${
              !useTemp ? 'border-[var(--primary)] bg-[var(--primary-container)]/20' : 'border-[var(--outline-variant)]/30 hover:bg-[var(--surface-container-low)]'
            }`}>
              <input type="radio" name="resume-choice" checked={!useTemp} onChange={() => setUseTemp(false)} className="accent-[var(--primary)]" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--on-surface)]">Use saved resume</p>
                <p className="text-xs text-[var(--on-surface-variant)] truncate">{savedFilename}</p>
              </div>
            </label>

            {/* Option B */}
            <label className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border cursor-pointer transition-all ${
              useTemp ? 'border-[var(--primary)] bg-[var(--primary-container)]/20' : 'border-[var(--outline-variant)]/30 hover:bg-[var(--surface-container-low)]'
            }`}>
              <input type="radio" name="resume-choice" checked={useTemp} onChange={() => setUseTemp(true)} className="accent-[var(--primary)]" />
              <p className="text-sm font-medium text-[var(--on-surface)]">Upload a different resume</p>
            </label>

            {useTemp && (
              <div
                onClick={() => !extracting && inputRef.current?.click()}
                className="border-2 border-dashed border-[var(--outline-variant)]/40 rounded-2xl px-6 py-6 flex flex-col items-center gap-2 cursor-pointer hover:border-[var(--primary)]/50 hover:bg-[var(--surface-container-low)] transition-all"
              >
                {extracting
                  ? <><Loader2 className="w-5 h-5 animate-spin text-[var(--on-surface-variant)]" /><p className="text-sm text-[var(--on-surface-variant)]">Extracting...</p></>
                  : <>
                      <Upload className="w-6 h-6 text-[var(--on-surface-variant)]" />
                      {tempResumeFilename
                        ? <p className="text-sm font-medium text-[var(--on-surface)]">{tempResumeFilename}</p>
                        : <p className="text-sm text-[var(--on-surface-variant)]">Click to upload <span className="font-medium">.pdf</span> or <span className="font-medium">.docx</span></p>
                      }
                    </>
                }
                <input ref={inputRef} type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileChange} />
              </div>
            )}
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        {!generating && (
          <Button variant="primary" fullWidth onClick={handleGenerate} disabled={!canGenerate || extracting}>
            Generate Resume
          </Button>
        )}
      </div>
    </div>
  );
}
