import { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is PDF
      if (file.type !== "application/pdf") {
        setError("Please select a PDF file");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError("");
      setExtractedText("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file first");
      return;
    }

    setLoading(true);
    setError("");
    setExtractedText("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        "http://localhost:8000/api/v1/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setExtractedText(data.text);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while uploading"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          PDF Text Extractor
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label
              htmlFor="pdf-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select PDF File
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Extracting Text..." : "Extract Text"}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {extractedText && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Extracted Text:
              </h2>
              <div className="bg-gray-50 p-4 rounded border max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {extractedText}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
