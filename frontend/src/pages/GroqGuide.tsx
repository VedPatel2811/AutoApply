import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

const steps = [
  { n: 1, text: 'Go to', link: 'https://console.groq.com/keys', linkText: 'console.groq.com/keys' },
  { n: 2, text: 'Sign up for a free account (or log in if you already have one)' },
  { n: 3, text: 'Click "Create API Key" and give it any name' },
  { n: 4, text: 'Copy the key — it starts with gsk_... and paste it below' },
];

async function verifyGroqKey(key: string): Promise<boolean> {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { Authorization: `Bearer ${key}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export default function GroqGuide() {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    const trimmed = apiKey.trim();
    if (!trimmed) return;
    setStatus('loading');
    const valid = await verifyGroqKey(trimmed);
    if (valid) {
      localStorage.setItem('groq_api_key', trimmed);
      setStatus('success');
      setTimeout(() => window.close(), 1500);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center px-6">
      <div className="max-w-lg w-full space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-[var(--on-surface)] tracking-tight">Get your Groq API Key</h1>
          <p className="mt-2 text-[var(--on-surface-variant)] text-sm">
            AutoApply uses Groq to generate tailored resumes. It's free — takes about 2 minutes.
          </p>
        </div>

        <ol className="space-y-4">
          {steps.map(step => (
            <li key={step.n} className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary-container)] text-[var(--on-primary-container)] flex items-center justify-center text-sm font-bold">
                {step.n}
              </span>
              <p className="text-[var(--on-surface)] text-sm pt-1.5">
                {step.text}{' '}
                {step.link && (
                  <a href={step.link} target="_blank" rel="noopener noreferrer"
                    className="text-[var(--primary)] underline underline-offset-2 font-medium">
                    {step.linkText}
                  </a>
                )}
              </p>
            </li>
          ))}
        </ol>

        {/* Key input */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="gsk_..."
            value={apiKey}
            onChange={e => { setApiKey(e.target.value); setStatus('idle'); }}
            disabled={status === 'loading' || status === 'success'}
            className="w-full bg-[var(--surface-container)] text-[var(--on-surface)] rounded-full px-5 py-3 outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all border border-transparent font-mono text-sm disabled:opacity-50"
          />

          {status === 'error' && (
            <p className="text-sm text-red-500 px-1">Invalid API key. Please check and try again.</p>
          )}

          {status === 'success' && (
            <div className="flex items-center gap-2 text-sm text-emerald-500 px-1">
              <CheckCircle className="w-4 h-4" />
              Key verified! Closing this tab...
            </div>
          )}

          <Button
            variant="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={!apiKey.trim() || status === 'loading' || status === 'success'}
          >
            {status === 'loading'
              ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</span>
              : 'Save API Key'
            }
          </Button>
        </div>

        <div className="rounded-2xl bg-[var(--surface-container)] border border-[var(--outline-variant)]/20 px-5 py-4 text-sm text-[var(--on-surface-variant)]">
          Your API key is stored only in your browser's localStorage and is never sent to our servers.
        </div>

      </div>
    </div>
  );
}
