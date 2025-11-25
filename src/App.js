
import React, { useState, useRef, useEffect } from 'react';
import { Wand2, AlertCircle, BookOpen, Zap, Shield, Lightbulb } from 'lucide-react';

const GenerativeAIDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('demo');
  const [history, setHistory] = useState([]);
  const canvasRef = useRef(null);

  // Simulate AI text generation with a realistic generative model behavior
  const generateText = async (userPrompt) => {
    if (!userPrompt.trim()) return;

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Enhanced simulation of a generative model response
    const responses = {
      'create a poem about': `# Generated Poem\n\nIn whispers soft, the dawn arrives,\nWhere golden light and shadow thrives,\nThe world awakens, fresh and new,\nWith morning dew and vibrant hue.\n\nEach moment holds a thousand dreams,\nLife flows like gentle flowing streams,\nWe dance through time with hope so bright,\nFrom darkest dusk to clearest light.`,
      
      'explain how': `## Comprehensive Explanation\n\n**Step 1: Foundation & Understanding**\nBegin by grasping the fundamental concepts and principles that underpin the topic at hand.\n\n**Step 2: Core Mechanisms**\nDeep dive into the technical aspects and operational frameworks that make this system function.\n\n**Step 3: Practical Implementation**\nExplore real-world applications and hands-on methodologies.\n\n**Step 4: Optimization & Best Practices**\nDiscover techniques to enhance efficiency and achieve superior results.\n\n**Step 5: Future Considerations**\nUnderstand emerging trends and potential advancements in this domain.`,

      'write a story about': `# A Tale Unfolds\n\nOnce upon a time, in a realm where imagination became reality, there existed a character who possessed an extraordinary gift. This protagonist embarked on a journey that would change everything.\n\nAs they traversed through challenges and discoveries, they learned that the greatest power lies not in external force, but in understanding, compassion, and the courage to embrace change.\n\nThe adventure taught them that every choice matters, and that within each of us lies the potential to create meaningful change in the world around us.`,

      'summarize': `## Summary\n\n**Key Points:**\n- The essential information has been distilled into core concepts\n- Each element contributes to the overall narrative or argument\n- Understanding these points provides comprehensive insight into the subject matter\n\n**Implications:**\nThis summary demonstrates how complex information can be crystallized into its most valuable components, enabling quick comprehension while maintaining accuracy and depth.`,

      'default': `## Generated Response\n\nYour prompt has been processed by our advanced language model. This generative AI system analyzes your input and creates contextually relevant, coherent responses.\n\n**Model Used:** Advanced Transformer-based Architecture\n**Processing Method:** Natural Language Understanding + Generation\n**Capabilities:** Text generation, summarization, creative writing, explanation, and more\n\nThe response above demonstrates real-time AI generation with semantic understanding and contextual awareness.`
    };

    let response = responses['default'];
    for (let key in responses) {
      if (key !== 'default' && userPrompt.toLowerCase().includes(key)) {
        response = responses[key];
        break;
      }
    }

    setGeneratedText(response);
    setHistory([...history, { prompt: userPrompt, response, timestamp: new Date() }]);
    setIsLoading(false);
  };

  // Simulate canvas-based visual generation
  const generateVisual = async () => {
    if (!canvasRef.current) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Create an abstract generative art based on the prompt
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const seed = prompt.length * 12345;
    for (let i = 0; i < 50; i++) {
      const x = (seed * Math.sin(i) * 100) % canvas.width;
      const y = (seed * Math.cos(i) * 100) % canvas.height;
      const size = Math.abs((seed * Math.tan(i * 0.1)) % 50) + 10;
      const hue = (seed * i) % 360;
      
      ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(Math.abs(x), Math.abs(y), size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Generative Visual: ' + prompt.substring(0, 30), 20, canvas.height - 20);

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Wand2 className="w-10 h-10 text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Generative AI Platform
            </h1>
          </div>
          <p className="text-xl text-slate-300">Interactive demonstration of modern AI generation capabilities</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-purple-500/30">
          <button
            onClick={() => setActiveTab('demo')}
            className={`px-6 py-3 font-semibold transition ${activeTab === 'demo' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Interactive Demo
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-6 py-3 font-semibold transition ${activeTab === 'technical' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Technical Details
          </button>
          <button
            onClick={() => setActiveTab('ethics')}
            className={`px-6 py-3 font-semibold transition ${activeTab === 'ethics' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Ethics & Safety
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-3 font-semibold transition ${activeTab === 'applications' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Applications
          </button>
        </div>

        {/* Demo Tab */}
        {activeTab === 'demo' && (
          <div className="space-y-8">
            {/* Text Generation */}
            <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                Text Generation
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">
                    Enter Your Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Try: 'write a poem about...', 'explain how...', 'create a story about...'"
                    className="w-full h-24 bg-slate-900 border border-purple-500/50 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => generateText(prompt)}
                    disabled={isLoading || !prompt.trim()}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 font-bold py-3 rounded-lg transition transform hover:scale-105 active:scale-95"
                  >
                    {isLoading ? 'Generating...' : 'Generate Text'}
                  </button>
                  <button
                    onClick={generateVisual}
                    disabled={isLoading || !prompt.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 font-bold py-3 rounded-lg transition transform hover:scale-105 active:scale-95"
                  >
                    {isLoading ? 'Generating...' : 'Generate Visual'}
                  </button>
                </div>
              </div>

              {/* Text Output */}
              {generatedText && (
                <div className="mt-8 bg-slate-900 rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-lg font-semibold mb-4 text-purple-300">Generated Output:</h3>
                  <div className="prose prose-invert max-w-none text-slate-300">
                    {generatedText.split('\n').map((line, i) => (
                      <div key={i} className="mb-2">
                        {line.startsWith('#') ? (
                          <h3 className="text-xl font-bold text-purple-300">{line.replace('#', '').trim()}</h3>
                        ) : line.startsWith('**') ? (
                          <p className="font-semibold text-slate-100">{line.replace(/\*\*/g, '')}</p>
                        ) : (
                          <p>{line}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Output */}
              <canvas
                ref={canvasRef}
                width={600}
                height={300}
                className="w-full rounded-lg mt-8 bg-slate-900 border border-purple-500/30"
              />
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4">Generation History</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {history.map((item, i) => (
                    <div key={i} className="bg-slate-900 p-3 rounded border border-slate-700 text-sm">
                      <p className="font-semibold text-purple-300 truncate">{item.prompt}</p>
                      <p className="text-slate-400 text-xs mt-1">{item.timestamp.toLocaleTimeString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Technical Tab */}
        {activeTab === 'technical' && (
          <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Technical Architecture
              </h2>
              <div className="space-y-4 text-slate-300">
                <div>
                  <h3 className="font-bold text-purple-300 mb-2">Model Type: Transformer-Based Language Model</h3>
                  <p>This platform simulates advanced transformer architecture with multi-head attention mechanisms, enabling the model to understand context and generate coherent, semantically meaningful responses.</p>
                </div>
                <div>
                  <h3 className="font-bold text-purple-300 mb-2">Core Components:</h3>
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>Tokenization:</strong> Input text is broken into tokens for processing</li>
                    <li>• <strong>Embedding Layer:</strong> Tokens converted to dense vector representations</li>
                    <li>• <strong>Attention Mechanism:</strong> Model learns relationships between tokens</li>
                    <li>• <strong>Feed-Forward Networks:</strong> Non-linear transformations enhance representation</li>
                    <li>• <strong>Generation:</strong> Outputs probability distributions over vocabulary</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-purple-300 mb-2">Why This Approach:</h3>
                  <p>Transformers revolutionized NLP by enabling parallel processing and capturing long-range dependencies. They power GPT models, BERT, and modern LLMs, offering superior performance in language understanding and generation tasks.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ethics Tab */}
        {activeTab === 'ethics' && (
          <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-400" />
              Ethical AI & Safety Measures
            </h2>
            <div className="space-y-4 text-slate-300">
              <div className="bg-slate-900 p-4 rounded border border-green-500/30">
                <h3 className="font-bold text-green-400 mb-2">Bias Mitigation</h3>
                <p>Training data diversification, fairness audits, and continuous monitoring ensure equitable outputs across demographic groups.</p>
              </div>
              <div className="bg-slate-900 p-4 rounded border border-yellow-500/30">
                <h3 className="font-bold text-yellow-400 mb-2">Content Safety</h3>
                <p>Content filters prevent generation of harmful, illegal, or abusive material. Safety classifiers detect policy violations in real-time.</p>
              </div>
              <div className="bg-slate-900 p-4 rounded border border-blue-500/30">
                <h3 className="font-bold text-blue-400 mb-2">Transparency</h3>
                <p>Users are informed this is AI-generated content. Model capabilities and limitations are clearly communicated.</p>
              </div>
              <div className="bg-slate-900 p-4 rounded border border-purple-500/30">
                <h3 className="font-bold text-purple-400 mb-2">User Privacy</h3>
                <p>No personal data is retained beyond the current session. Prompts are not logged or used for model retraining without consent.</p>
              </div>
              <div className="bg-slate-900 p-4 rounded border border-red-500/30">
                <h3 className="font-bold text-red-400 mb-2">Responsible Disclosure</h3>
                <p>Security researchers can report vulnerabilities through established channels before public disclosure.</p>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              Real-World Applications & Future Potential
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded border border-slate-700">
                <h3 className="font-bold text-cyan-400 mb-2">💼 Business & Content</h3>
                <p className="text-sm text-slate-300">Marketing copy, social media content, technical documentation, and customer support automation.</p>
              </div>
              <div className="bg-slate-900 p-4 rounded border border-slate-700">
                <h3 className="font-bold text-green-400 mb-2">🎓 Education</h3>
                <p className="text-sm text-slate-300">Personalized tutoring, assignment feedback, curriculum generation, and accessibility tools for students.</p>
              </div>
              <div className="bg-slate-900 p-4 rounded border border-slate-700">
                <h3 className="font-bold text-purple-400 mb-2">🔬 Research & Development</h3>
                <p className="text-sm text-slate-300">Scientific paper analysis, hypothesis generation, code development, and data interpretation.</p>
              </div>
              <div className="bg-slate-900 p-4 rounded border border-slate-700">
                <h3 className="font-bold text-pink-400 mb-2">🎨 Creative Industries</h3>
                <p className="text-sm text-slate-300">Scriptwriting, storyboarding, game design, music composition, and visual art conceptualization.</p>
              </div>
              <div className="bg-slate-900 p-4 rounded border border-slate-700">
                <h3 className="font-bold text-blue-400 mb-2">🏥 Healthcare</h3>
                <p className="text-sm text-slate-300">Medical report generation, patient communication, clinical decision support, and drug discovery.</p>
              </div>
              <div className="bg-slate-900 p-4 rounded border border-slate-700">
                <h3 className="font-bold text-orange-400 mb-2">🚀 Future Frontiers</h3>
                <p className="text-sm text-slate-300">Multimodal AI, real-time translation, autonomous reasoning, and human-AI collaborative systems.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerativeAIDemo;