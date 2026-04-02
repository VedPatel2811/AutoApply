import { useState } from 'react';

export type ResumeFlowStep = 'idle' | 'upload' | 'select';

export interface ResumeFlowState {
  step: ResumeFlowStep;
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  tempResumeText: string | null;
  tempResumeFilename: string | null;
}

const INITIAL: ResumeFlowState = {
  step: 'idle',
  jobTitle: '',
  jobDescription: '',
  companyName: '',
  tempResumeText: null,
  tempResumeFilename: null,
};

export function useResumeFlow() {
  const [state, setState] = useState<ResumeFlowState>(INITIAL);

  const trigger = (jobTitle: string, jobDescription: string, companyName: string) => {
    const apiKey = localStorage.getItem('groq_api_key');
    if (!apiKey) {
      window.open('/groq-guide', '_blank');
      return;
    }
    const resumeText = localStorage.getItem('user_resume_text');
    setState({
      step: resumeText ? 'select' : 'upload',
      jobTitle,
      jobDescription,
      companyName,
      tempResumeText: null,
      tempResumeFilename: null,
    });
  };

  const setTempResume = (text: string, filename: string) =>
    setState(s => ({ ...s, tempResumeText: text, tempResumeFilename: filename }));

  const advanceToSelect = () => setState(s => ({ ...s, step: 'select' }));

  const close = () => setState(INITIAL);

  return { state, trigger, setTempResume, advanceToSelect, close };
}
