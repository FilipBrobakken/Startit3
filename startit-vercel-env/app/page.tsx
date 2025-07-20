
'use client';
import React, { useState } from 'react';

export default function Page() {
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      });
      const data = await res.json();
      setResult(data.result || 'Ingen respons.');
    } catch (err) {
      setResult('Feil ved henting av svar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4 text-sm">
      <h1 className="text-xl font-bold text-center">StartIt</h1>
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        className="w-full border p-2"
        placeholder="Beskriv ideen din..."
      />
      <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {loading ? 'Genererer...' : 'Lag Startplan'}
      </button>
      {result && <pre className="bg-gray-100 p-3 whitespace-pre-wrap">{result}</pre>}
    </div>
  );
}
