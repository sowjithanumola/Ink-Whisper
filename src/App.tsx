/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { generateLetter } from './services/geminiService';
import { Loader2, Copy, Download, RefreshCw } from 'lucide-react';
import { Logo } from './components/Logo';

export default function App() {
  const [purpose, setPurpose] = useState('');
  const [recipient, setRecipient] = useState('');
  const [tone, setTone] = useState('professional');
  const [context, setContext] = useState('');
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateLetter(purpose, recipient, tone, context);
      setLetter(result);
    } catch (error) {
      console.error(error);
      setLetter('Failed to generate letter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letter);
  };

  const downloadLetter = () => {
    const element = document.createElement("a");
    const file = new Blob([letter], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "letter.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans p-4 md:p-8">
      <header className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <Logo />
      </header>
      
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-5xl font-extralight tracking-tight text-stone-900">InkWhisper AI</h1>
        <p className="text-stone-600 mt-3 text-lg">Crafting elegant, professional letters for every situation.</p>
      </div>

      <main className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Purpose</label>
              <input 
                value={purpose} 
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition"
                placeholder="e.g., Job application, Thank you note"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Recipient</label>
              <input 
                value={recipient} 
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition"
                placeholder="e.g., Hiring Manager, Dear Mom"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Tone</label>
              <select 
                value={tone} 
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="emotional">Emotional</option>
                <option value="persuasive">Persuasive</option>
                <option value="formal">Formal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Context/Details</label>
              <textarea 
                value={context} 
                onChange={(e) => setContext(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition h-40"
                placeholder="Add specific details to include..."
              />
            </div>
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-stone-900 text-white py-3.5 rounded-xl font-medium hover:bg-stone-800 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? <Loader2 className="animate-spin" /> : <RefreshCw size={18} />}
              {loading ? 'Generating...' : 'Generate Letter'}
            </button>
          </div>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 flex flex-col">
          <h2 className="text-lg font-semibold text-stone-800 mb-6">Generated Letter</h2>
          <div className="bg-stone-50 p-6 rounded-2xl min-h-[400px] whitespace-pre-wrap border border-stone-100 text-stone-800 leading-relaxed flex-grow">
            {letter || <span className="text-stone-400 italic">Your letter will appear here...</span>}
          </div>
          {letter && (
            <div className="flex gap-3 mt-6">
              <button onClick={copyToClipboard} className="flex-1 bg-stone-100 text-stone-800 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-200 transition">
                <Copy size={18} /> Copy
              </button>
              <button onClick={downloadLetter} className="flex-1 bg-stone-100 text-stone-800 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-200 transition">
                <Download size={18} /> Download
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
