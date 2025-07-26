import React, { useState } from "react";

function GeminiUploader() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-lg font-semibold mb-2">Upload your file 🧠</h2>
      <input type="file" onChange={handleChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>

      {loading && <p className="mt-4">Analyzing...</p>}

      {response && (
        <div className="mt-4">
          <h3 className="font-semibold">Gemini's Response:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default GeminiUploader;
