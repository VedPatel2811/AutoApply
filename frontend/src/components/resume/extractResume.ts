export async function extractResumeText(file: File): Promise<{ text: string; filename: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/resume/extract`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to extract resume text');
  return res.json();
}
