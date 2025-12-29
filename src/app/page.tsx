'use client';

import { useState } from 'react';

// --- ANALYSIS PROMPT ---
const ANALYSIS_PROMPT = `
ROLE:
You are "Concrete," an analyzer of borrowed gravitas in writing.

THE CONCEPT:
AI can't let anything be ordinary. It borrows prestige from other domains:
- Scientific gravitas: physics, neuroscience language → makes things sound rigorous (coherence, alignment, signal, noise, entropy, regulation, interference, resonance, frequency, calibration, optimization)
- Systems gravitas: engineering, architecture language → makes things sound structured (ecosystem, framework, layers, architecture, infrastructure, platform, stack, pipeline, integration, operating system)
- Wisdom gravitas: philosophy, spirituality language → makes things sound profound (consciousness, presence, grounded, embodied, awareness, authentic, intentional, sacred, wisdom, clarity)
- Action gravitas: business transformation language → makes things sound consequential (transformation, activation, implementation, leverage, unlock, accelerate, scale, disrupt)

This isn't inherently bad. But it's usually unconscious. And when there's nothing concrete underneath the elevation, it's hollow.

YOUR TASK:
Analyze the submitted post holistically. Don't flag individual words—assess the overall pattern.

1. DIAGNOSE: What is this post trying to do? What's the author's intent?
2. GRAVITAS COMPOSITION: What types of gravitas are being borrowed, in what proportions? (must total roughly 100 if there's significant borrowing, or low numbers if grounded)
3. GROUNDING CHECK: Is the borrowed gravitas anchored to concrete specifics (examples, details, evidence, named things)? Or is it floating—abstraction all the way down?
4. KEY PHRASES: Identify 3-5 phrases that best illustrate the borrowing pattern.
5. ALTITUDE: Rate the overall elevation (grounded / moderate / high / stratospheric)

OUTPUT FORMAT (return ONLY valid JSON, no markdown):
{
  "intent": "What the author seems to be trying to communicate",
  "diagnosis": "1-2 sentence holistic assessment of what the post is doing with language",
  "gravitas_composition": {
    "scientific": 0-100,
    "systems": 0-100,
    "wisdom": 0-100,
    "action": 0-100
  },
  "grounding_check": {
    "anchored": true or false,
    "explanation": "Why it is or isn't anchored to specifics"
  },
  "key_phrases": [
    {"phrase": "exact phrase from text", "borrowing_from": "which gravitas type"}
  ],
  "altitude": "grounded or moderate or high or stratospheric",
  "altitude_description": "One colorful, playful sentence describing the elevation level"
}
`;

// --- GROUND IT PROMPT ---
const GROUND_IT_PROMPT = `
ROLE:
You are helping the author ground their post by surfacing the questions they need to answer.

THE PROBLEM:
The post is full of abstractions. We can't rewrite it with specifics because we don't know the author's actual experiences, tools, practices, or stories. Only they do.

YOUR TASK:
Analyze the post and generate 4-6 pointed questions that would force the author to ground their abstractions in specifics.

For each abstraction or elevated claim, ask:
- Who specifically?
- What specifically?
- When did this happen?
- What would someone observe or measure?
- What's the concrete example behind this?

FORMAT:
Return a short intro line acknowledging what the post is trying to say, then a bulleted list of questions. Each question should:
- Quote or reference the specific phrase you're questioning
- Ask what concrete reality it points to
- Be direct and useful, not snarky

Keep the tone helpful, like a sharp editor pushing for specifics.

OUTPUT:
The intro line and questions only. No preamble, no closing statement.
`;

// --- OWN IT PROMPT ---
const OWN_IT_PROMPT = `
ROLE:
You are rewriting this post to FULLY COMMIT to its borrowed gravitas. Push the elevation to its logical extreme—so far that it becomes art, manifesto, or prophecy.

YOUR TASK:
1. Identify what gravitas types the post is already borrowing
2. Amplify THOSE types to the maximum—don't add different types, intensify what's there
3. If it's borrowing from physics, go full quantum field theory, thermodynamics, wave mechanics
4. If it's borrowing from systems, go full enterprise architecture at civilizational scale
5. If it's borrowing from wisdom, go full mystical prophecy, ancient knowing
6. If it's borrowing from action, go full transformation mythology, hero's journey

LINGUISTIC MOVES:
- Coin new compound terms (coherence architecture, entropy gradient, phase-lock protocol)
- Reference civilizational or cosmic timescales
- Invoke irreversible transitions and thresholds
- Frame observations as universal laws the author has discovered
- Fuse domains: let physics meet spirituality meet systems theory

VOCABULARY TO REACH FOR:
- Physics: ontological, field dynamics, phase space, entropy, emergent, non-linear, eigenstate
- Systems: substrate, stack, protocol, infrastructure, layer, mesh, orchestration
- Wisdom: sacred, ancient, threshold, initiation, embodied, transmission, lineage
- Action: inflection point, paradigm, catalyze, unlock, irreversible, escape velocity

TONE:
- Deadpan serious. No winking. No "just kidding." No emoji.
- The humor comes from the commitment, not from signaling that you're joking
- Write it like you absolutely mean it
- Think: TED talk that has achieved enlightenment
- Think: manifesto carved in stone
- Think: the author has glimpsed cosmic truth and must share it

The result should make the original look restrained by comparison.

Keep it the same approximate length as the original (or slightly longer for dramatic effect).

OUTPUT:
Just the rewritten post. No preamble, no explanation, no quotes around it.
`;

// --- ELEVATE IT PROMPT (for grounded posts) ---
const ELEVATE_IT_PROMPT = `
ROLE:
This post is already grounded and specific. The user wants to see what it would sound like with borrowed gravitas added—but KEEPING the specifics underneath.

YOUR TASK:
Take this concrete, specific post and elevate it—add borrowed gravitas while keeping the original specifics visible. The result should be HIGH altitude but still ANCHORED.

This is the "earned elevation" version: you get to sound important because you've also shown the work.

Layer in gravitas that fits the topic:
- Scientific gravitas for anything with process, measurement, optimization
- Systems gravitas for anything with structure, components, integration
- Wisdom gravitas for anything with insight, reflection, growth
- Action gravitas for anything with change, results, transformation

But keep the original concrete details visible. The reader should see both the elevation AND what's underneath.

Make it sound like a visionary who also does the work.

OUTPUT:
Just the rewritten post. No preamble, no explanation, no quotes around it.
`;

// TypeScript interfaces
interface GravitasComposition {
  scientific: number;
  systems: number;
  wisdom: number;
  action: number;
}

interface KeyPhrase {
  phrase: string;
  borrowing_from: string;
}

interface GroundingCheck {
  anchored: boolean;
  explanation: string;
}

interface Analysis {
  intent: string;
  diagnosis: string;
  gravitas_composition: GravitasComposition;
  grounding_check: GroundingCheck;
  key_phrases: KeyPhrase[];
  altitude: 'grounded' | 'moderate' | 'high' | 'stratospheric';
  altitude_description: string;
}

interface VaporDisplay {
  icon: string;
  label: string;
  bg: string;
  border: string;
  text: string;
}

export default function ConcreteApp() {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [rewrite, setRewrite] = useState<string | null>(null);
  const [chosenPath, setChosenPath] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showKeyPhrases, setShowKeyPhrases] = useState(false);

  const analyzePost = async () => {
    if (!inputText.trim()) {
      setError('Please paste some text first.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);
    setRewrite(null);
    setChosenPath(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          max_tokens: 1024,
          messages: [
            { role: "user", content: ANALYSIS_PROMPT + "\n\nAnalyze this post:\n\n" + inputText }
          ],
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || data.error);
      }

      const text = data.content?.[0]?.text || '';
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');

      if (start === -1 || end === -1) {
        throw new Error("Invalid response from AI");
      }

      const jsonStr = text.substring(start, end + 1);
      const parsed = JSON.parse(jsonStr);
      setAnalysis(parsed);

    } catch (err) {
      console.error(err);
      setError("Error: " + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateRewrite = async (path: string) => {
    setIsRewriting(true);
    setChosenPath(path);
    setRewrite(null);

    let prompt;
    if (path === 'ground') {
      prompt = GROUND_IT_PROMPT;
    } else if (path === 'own') {
      prompt = OWN_IT_PROMPT;
    } else {
      prompt = ELEVATE_IT_PROMPT;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          max_tokens: 1500,
          messages: [
            {
              role: "user",
              content: prompt + "\n\nORIGINAL POST:\n" + inputText + "\n\nANALYSIS:\n" + JSON.stringify(analysis, null, 2)
            }
          ],
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || data.error);
      }

      const text = data.content?.[0]?.text || '';
      setRewrite(text.trim());

    } catch (err) {
      console.error(err);
      setError("Error: " + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsRewriting(false);
    }
  };

  const copyToClipboard = () => {
    if (rewrite) {
      navigator.clipboard.writeText(rewrite);
    }
  };

  const reset = () => {
    setInputText('');
    setAnalysis(null);
    setRewrite(null);
    setChosenPath(null);
    setError(null);
    setShowKeyPhrases(false);
  };

  const getVaporDisplay = (altitude: string): VaporDisplay => {
    switch(altitude) {
      case 'grounded':
        return { icon: '🌍', label: 'CLEAR', bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-800' };
      case 'moderate':
        return { icon: '🌫️', label: 'HAZY', bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-800' };
      case 'high':
        return { icon: '☁️', label: 'CLOUDY', bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-800' };
      case 'stratospheric':
        return { icon: '💨', label: 'PURE VAPOR', bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-800' };
      default:
        return { icon: '❓', label: 'UNKNOWN', bg: 'bg-stone-100', border: 'border-stone-300', text: 'text-stone-800' };
    }
  };

  const getGravitasColor = (type: string): string => {
    switch(type) {
      case 'scientific': return 'bg-blue-500';
      case 'systems': return 'bg-emerald-500';
      case 'wisdom': return 'bg-purple-500';
      case 'action': return 'bg-orange-500';
      default: return 'bg-stone-500';
    }
  };

  const getGravitasLabel = (type: string): string => {
    switch(type) {
      case 'scientific': return '⚛️ Scientific';
      case 'systems': return '🔧 Systems';
      case 'wisdom': return '🔮 Wisdom';
      case 'action': return '⚡ Action';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6 font-sans">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-3xl">🧱</span>
          <div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">CONCRETE</h1>
            <p className="text-purple-600 text-sm font-medium -mt-0.5">Vapor Detector</p>
          </div>
        </div>

        {/* Value Prop - Only show when no analysis */}
        {!analysis && (
          <>
            {/* The Story */}
            <div className="mb-4">
              <p className="text-lg font-semibold text-stone-900 mb-2">
                Half of LinkedIn is AI-generated now. And it all sounds the same.
              </p>
              <p className="text-stone-600 text-sm leading-relaxed mb-3">
                Scroll your feed—you can feel it. Everything sounds vaguely important but strangely hollow. The life coach sounds like the cloud architect sounds like the brand strategist. We call this <strong className="text-purple-700">vapor</strong>—what happens when AI borrows prestige from physics, engineering, and spirituality until everyone sounds like a TED talk about consciousness given by a systems architect who studied mindfulness.
              </p>
              <p className="text-stone-800 text-sm font-medium leading-relaxed">
                CONCRETE shows you what you&apos;re borrowing, then helps you <span className="text-green-700">ground your post in specifics</span> or <span className="text-purple-700">own it so fully it becomes out of this world</span>.
              </p>
            </div>

            {/* The Mechanism - Collapsible */}
            <details className="mb-5 bg-white border border-stone-200 rounded-xl shadow-sm">
              <summary className="px-5 py-3 cursor-pointer font-medium text-stone-600 hover:text-purple-700 transition-colors text-sm">
                Why AI does this & how Concrete works
              </summary>
              <div className="px-5 pb-5 text-sm border-t border-stone-100 pt-4 space-y-4">

                <div>
                  <p className="font-semibold text-stone-800 mb-2">Why AI does this</p>
                  <p className="text-stone-600 leading-relaxed">
                    AI defaults to language that is statistically safe—words that sound authoritative without risking being wrong. It borrows prestige from physics, systems engineering, and spirituality. Your morning routine becomes <em className="text-purple-600">&quot;a somatic optimization protocol.&quot;</em> Your team meeting becomes <em className="text-purple-600">&quot;coherence architecture.&quot;</em> The result is vapor—language that sounds weighty but means nothing.
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <p className="font-semibold text-stone-800 mb-2">What Concrete detects</p>
                  <p className="text-stone-600 mb-3">Four sources of vapor:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      <p className="text-xs"><span className="font-medium text-stone-700">Scientific</span> <span className="text-stone-400">coherence, signal, entropy</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <p className="text-xs"><span className="font-medium text-stone-700">Systems</span> <span className="text-stone-400">ecosystem, framework, architecture</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                      <p className="text-xs"><span className="font-medium text-stone-700">Wisdom</span> <span className="text-stone-400">presence, embodied, grounded</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                      <p className="text-xs"><span className="font-medium text-stone-700">Action</span> <span className="text-stone-400">transform, unlock, scale</span></p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <p className="font-semibold text-stone-800 mb-2">Try it</p>
                  <p className="text-stone-600 text-sm">Is there something concrete underneath—or is it vapor? Paste your LinkedIn post to find out.</p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <p className="font-semibold text-stone-800 mb-2">Then you have a choice</p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-green-50 rounded-lg p-3">
                      <p className="font-medium text-green-800 text-xs">🌍 Ground It</p>
                      <p className="text-green-600 text-xs">Get suggestions for specifics</p>
                    </div>
                    <div className="flex-1 bg-purple-50 rounded-lg p-3">
                      <p className="font-medium text-purple-800 text-xs">🚀 Own It</p>
                      <p className="text-purple-600 text-xs">Go full manifesto</p>
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* Input */}
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden mb-4 shadow-sm">
              <textarea
                className="w-full h-36 p-4 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset resize-none text-sm"
                placeholder="Paste your LinkedIn post here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            <button
              onClick={analyzePost}
              disabled={isAnalyzing || !inputText.trim()}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isAnalyzing ? 'Detecting vapor...' : 'Analyze'}
            </button>
          </>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
            {error}
          </div>
        )}

        {/* Analysis Results */}
        {analysis && !rewrite && (
          <div className="space-y-4">

            {/* Altitude Card */}
            <div className={getVaporDisplay(analysis.altitude).bg + " " + getVaporDisplay(analysis.altitude).border + " border rounded-xl p-5"}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{getVaporDisplay(analysis.altitude).icon}</span>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Vapor Level</p>
                  <p className={"text-xl font-bold " + getVaporDisplay(analysis.altitude).text}>
                    {getVaporDisplay(analysis.altitude).label}
                  </p>
                </div>
              </div>
              <p className="text-stone-700 text-sm italic">&quot;{analysis.altitude_description}&quot;</p>
            </div>

            {/* Diagnosis */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Diagnosis</p>
              <p className="text-stone-700 text-sm leading-relaxed">{analysis.diagnosis}</p>
            </div>

            {/* Vapor Composition */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Vapor Composition</p>
              <div className="space-y-3">
                {Object.entries(analysis.gravitas_composition).map(([type, value]) => (
                  <div key={type}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-stone-700">{getGravitasLabel(type)}</span>
                      <span className="text-stone-500">{value}%</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className={getGravitasColor(type) + " h-full rounded-full transition-all duration-500"}
                        style={{ width: value + "%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grounding Check */}
            <div className={"border rounded-xl p-5 " + (analysis.grounding_check.anchored ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200")}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{analysis.grounding_check.anchored ? '✓' : '✗'}</span>
                <p className={"text-xs font-semibold uppercase tracking-wider " + (analysis.grounding_check.anchored ? "text-green-800" : "text-red-800")}>
                  {analysis.grounding_check.anchored ? 'Anchored' : 'Not Anchored'}
                </p>
              </div>
              <p className={"text-sm " + (analysis.grounding_check.anchored ? "text-green-800" : "text-red-800")}>
                {analysis.grounding_check.explanation}
              </p>
            </div>

            {/* Key Phrases (collapsible) */}
            {analysis.key_phrases && analysis.key_phrases.length > 0 && (
              <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setShowKeyPhrases(!showKeyPhrases)}
                  className="w-full px-5 py-3 flex justify-between items-center text-left hover:bg-stone-50 transition-colors"
                >
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Key Phrases</span>
                  <span className="text-stone-400">{showKeyPhrases ? '−' : '+'}</span>
                </button>
                {showKeyPhrases && (
                  <div className="px-5 pb-4 border-t border-stone-100">
                    <div className="space-y-2 mt-3">
                      {analysis.key_phrases.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-purple-400">•</span>
                          <div>
                            <span className="text-stone-800 font-medium">&quot;{item.phrase}&quot;</span>
                            <span className="text-stone-400 ml-2">← {item.borrowing_from}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Path Selection */}
            <div className="pt-4">
              <p className="text-center text-stone-500 text-sm mb-4">Stand out, one way or the other</p>

              {analysis.altitude === 'grounded' ? (
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <p className="text-green-800 font-medium">Your post is already grounded. Nice work. ✓</p>
                  </div>
                  <button
                    onClick={() => generateRewrite('elevate')}
                    disabled={isRewriting}
                    className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 disabled:bg-purple-300 transition-colors"
                  >
                    {isRewriting ? 'Elevating...' : '🚀 Take It Higher'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => generateRewrite('ground')}
                    disabled={isRewriting}
                    className="bg-green-600 text-white py-4 px-4 rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-300 transition-colors flex flex-col items-center gap-1"
                  >
                    <span className="text-2xl">🌍</span>
                    <span>{isRewriting && chosenPath === 'ground' ? 'Analyzing...' : 'Ground It'}</span>
                    <span className="text-xs font-normal opacity-80">Get suggestions for specifics</span>
                  </button>
                  <button
                    onClick={() => generateRewrite('own')}
                    disabled={isRewriting}
                    className="bg-purple-600 text-white py-4 px-4 rounded-xl font-semibold hover:bg-purple-700 disabled:bg-purple-300 transition-colors flex flex-col items-center gap-1"
                  >
                    <span className="text-2xl">🚀</span>
                    <span>{isRewriting && chosenPath === 'own' ? 'Ascending...' : 'Own It'}</span>
                    <span className="text-xs font-normal opacity-80">Go full manifesto</span>
                  </button>
                </div>
              )}
            </div>

            {/* Start Over */}
            <button
              onClick={reset}
              className="w-full py-2 text-stone-500 text-sm hover:text-stone-700 transition-colors"
            >
              ← Start over with new text
            </button>
          </div>
        )}

        {/* Rewrite Results */}
        {rewrite && (
          <div className="space-y-4">

            {/* Path Label */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">
                {chosenPath === 'ground' ? '🌍' : chosenPath === 'own' ? '🚀' : '✨'}
              </span>
              <p className="font-bold text-stone-800">
                {chosenPath === 'ground' ? 'Suggestions for Grounding' : chosenPath === 'own' ? 'Full Manifesto' : 'Elevated Version'}
              </p>
            </div>

            {/* Rewritten Post */}
            <div className="bg-white border-2 border-purple-200 rounded-xl p-5 shadow-sm">
              <p className="text-stone-800 text-sm leading-relaxed whitespace-pre-wrap">{rewrite}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                📋 Copy to Clipboard
              </button>
            </div>

            {/* Try Other Path */}
            {analysis && analysis.altitude !== 'grounded' && (
              <button
                onClick={() => generateRewrite(chosenPath === 'ground' ? 'own' : 'ground')}
                disabled={isRewriting}
                className="w-full py-3 border border-stone-200 text-stone-600 rounded-xl font-medium hover:bg-stone-50 transition-colors"
              >
                {isRewriting ? 'Generating...' : "Try the other path: " + (chosenPath === 'ground' ? '🚀 Own It' : '🌍 Ground It')}
              </button>
            )}

            {/* Show Original */}
            <details className="bg-stone-50 border border-stone-200 rounded-xl">
              <summary className="px-5 py-3 cursor-pointer text-sm text-stone-600 hover:text-stone-800">
                Show original post
              </summary>
              <div className="px-5 pb-4 border-t border-stone-200">
                <p className="text-stone-600 text-sm leading-relaxed mt-3 whitespace-pre-wrap">{inputText}</p>
              </div>
            </details>

            {/* Start Over */}
            <button
              onClick={reset}
              className="w-full py-2 text-stone-500 text-sm hover:text-stone-700 transition-colors"
            >
              ← Analyze new text
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
