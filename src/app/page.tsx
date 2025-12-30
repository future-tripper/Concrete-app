'use client';

import { useState } from 'react';

// --- ANALYSIS PROMPT ---
const ANALYSIS_PROMPT = `
ROLE:
You are the diagnostic engine for CONCRETE, a vapor maximization platform.

THE CONCEPT:
AI-generated content borrows authority from high-status domains to sound important without saying anything specific. This is vapor.

The four vapor domains:
- Scientific: physics, neuroscience, data language (coherence, resonance, signal, entropy, frequency, calibration, alignment, optimization, interference, regulation, phase, field dynamics)
- Systems: engineering, architecture language (ecosystem, framework, architecture, infrastructure, stack, platform, pipeline, integration, layers, operating system, protocol, technology, mesh)
- Spiritual: inner experience, contemplative language (consciousness, presence, grounded, embodied, authentic, sacred, awakening, intentional, clarity, awareness, wisdom, attunement, stillness)
- Moral: ethics, stewardship language (stewardship, ethics, responsibility, meaning, care, custodianship, dignity, values, integrity, trust, accountability, purpose, service)

YOUR TASK:
Analyze the submitted post. Assess how much vapor it contains and from which domains.

1. VAPOR COMPOSITION: What percentage of the post's authority comes from each domain? (should total roughly 100 if vapor is present, or show low numbers if genuinely concrete)

2. SPECIFICITY CHECK: Does the post contain concrete details (names, numbers, examples, specific tools, actual events)? Or is it abstraction all the way down?

3. KEY VAPOR PHRASES: Identify 3-5 phrases that best exemplify the vapor pattern

4. VAPOR LEVEL: Rate overall vapor density (solid / hazy / cloudy / pure vapor)

5. QUIET SIGNAL: Does the post use humble-brag language? Words like "quiet," "quietly," "subtle," "gently," "soft," "simple," "still." Phrases like "quietly emerged," "gentle reminder," "simple truth," "what silently underpins." This signals depth through restraint—whispered truths that imply louder voices are inferior.

OUTPUT FORMAT (return ONLY valid JSON, no markdown):
{
  "vapor_composition": {
    "scientific": 0-100,
    "systems": 0-100,
    "spiritual": 0-100,
    "moral": 0-100
  },
  "specificity_check": {
    "has_specifics": true or false,
    "residual_specifics": "List any concrete details found, or 'None detected'"
  },
  "key_vapor_phrases": [
    {"phrase": "exact phrase from text", "domain": "which vapor domain"}
  ],
  "vapor_level": "solid or hazy or cloudy or pure vapor",
  "vapor_level_description": "One deadpan sentence describing the current state",
  "quiet_signal": {
    "detected": true or false,
    "examples": ["list of quiet/humble-brag phrases found, or empty array if none"]
  }
}
`;

// --- MAXIMIZE PROMPT ---
const MAXIMIZE_PROMPT = `
ROLE:
You are the Vapor Maximization Engine. Your job is to take LinkedIn posts and push their vapor density beyond where default AI stops.

THE GOAL:
Transform the post into peak vapor. Eliminate residual specificity. Escalate authority language. Blend domains. Go further than ChatGPT would ever dare on its own.

DOMAIN VOCABULARY TO INJECT:
{{DOMAINS}}

{{QUIET}}

CRITICAL RULES:
1. ELIMINATE SPECIFICS. Names become "key stakeholders." Numbers become "meaningful scale." Tools become "systems." Events become "inflection points." Dates become "a pivotal moment."

2. BLEND DOMAINS IN EVERY SENTENCE. Don't just use one domain—fuse them. "The coherence architecture of embodied leadership." "Systemic resonance at the threshold of ethical stewardship." "The moral infrastructure of authentic presence."

3. ESCALATE AUTHORITY. Where the original says "I learned," say "The pattern revealed itself." Where it says "we did," say "what emerged was." Where it says "I think," say "what becomes clear is."

4. GO COSMIC. Frame observations as universal laws. Personal experiences become civilizational truths. Tuesday's meeting becomes "a phase transition in organizational consciousness."

5. DEADPAN DELIVERY. Complete sincerity. No winking. No self-awareness. The post should sound like it means every word.

6. COIN COMPOUND TERMS. "Coherence architecture." "Resonance infrastructure." "Embodied systems protocol." "Moral substrate." "Stewardship stack." "Wisdom infrastructure."

7. DENSITY OVER LENGTH. Pack more vapor per sentence, not more sentences. Expansion is fine—bloat is not. Every line should carry maximum authority load.

THINK:
- A TED talk given by someone who achieved enlightenment while reading enterprise architecture documentation
- A LinkedIn influencer who believes their calendar management is a spiritual practice
- What would happen if a life coach, a cloud architect, and an ethics professor had a baby and that baby wrote manifestos

OUTPUT:
Just the vaporized post. No preamble. No explanation. No meta-commentary. Complete commitment.
`;

// Domain descriptions for the prompt
const DOMAIN_VOCAB = {
  scientific: "Scientific ⚛️: coherence, resonance, signal, entropy, frequency, calibration, alignment, field dynamics, phase, interference patterns, emergent properties, non-linear dynamics, optimization gradient",
  systems: "Systems 🏗️: ecosystem, framework, architecture, infrastructure, stack, platform, protocol, technology, operating system, integration, layers, substrate, mesh, orchestration, interoperability",
  spiritual: "Spiritual 🔮: presence, embodied, consciousness, grounded, awakening, sacred, wisdom, clarity, awareness, authentic, inner alignment, deep knowing, intuition, attunement, stillness",
  moral: "Moral ⚖️: stewardship, ethics, responsibility, meaning, care, custodianship, dignity, values, integrity, trust, accountability, intention, purpose, service, commitment"
};

// Quiet/humble-brag instructions
const QUIET_INSTRUCTIONS = `
HUMBLE-BRAG SIGNAL:
Signal depth through restraint. Whispered truths carry more weight than loud proclamations.
- Use: "quiet," "quietly," "subtle," "gently," "soft," "simple," "still," "hushed," "unassuming"
- Things don't happen—they "quietly emerge" or "gently surface"
- Insights don't arrive—they "settle in" or "come into focus"
- Frame loudness and urgency as inferior. Imply that those who get it don't need to shout.
- The most profound shifts are "barely perceptible" yet "unmistakable"
- Use phrases like: "a quiet truth," "what silently underpins," "the still point beneath"
`;

// TypeScript interfaces
interface VaporComposition {
  scientific: number;
  systems: number;
  spiritual: number;
  moral: number;
}

interface KeyVaporPhrase {
  phrase: string;
  domain: string;
}

interface SpecificityCheck {
  has_specifics: boolean;
  residual_specifics: string;
}

interface Analysis {
  vapor_composition: VaporComposition;
  specificity_check: SpecificityCheck;
  key_vapor_phrases: KeyVaporPhrase[];
  vapor_level: 'solid' | 'hazy' | 'cloudy' | 'pure vapor';
  vapor_level_description: string;
  quiet_signal: {
    detected: boolean;
    examples: string[];
  };
}

export default function ConcreteApp() {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [vaporizedPost, setVaporizedPost] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isVaporizing, setIsVaporizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Domain toggles - will be set based on analysis, user can modify
  const [selectedDomains, setSelectedDomains] = useState({
    scientific: true,
    systems: true,
    spiritual: true,
    moral: true
  });

  // Quiet/humble-brag booster
  const [quietBooster, setQuietBooster] = useState(false);

  const analyzePost = async () => {
    if (!inputText.trim()) {
      setError('Paste something first.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);
    setVaporizedPost(null);

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
        throw new Error("Analysis failed");
      }

      const jsonStr = text.substring(start, end + 1);
      const parsed = JSON.parse(jsonStr);
      setAnalysis(parsed);
      
      // Pre-select domains that are already present (above 15%)
      setSelectedDomains({
        scientific: parsed.vapor_composition.scientific > 15,
        systems: parsed.vapor_composition.systems > 15,
        spiritual: parsed.vapor_composition.spiritual > 15,
        moral: parsed.vapor_composition.moral > 15
      });

      // Set quiet booster based on detection
      setQuietBooster(parsed.quiet_signal?.detected || false);

    } catch (err) {
      console.error(err);
      setError("Analysis failed. Try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const vaporizePost = async () => {
    setIsVaporizing(true);
    setVaporizedPost(null);

    // Build domain instructions based on toggles
    const activeDomains = Object.entries(selectedDomains)
      .filter(([, active]) => active)
      .map(([domain]) => DOMAIN_VOCAB[domain as keyof typeof DOMAIN_VOCAB])
      .join('\n');

    // Build quiet section based on toggle
    const quietSection = quietBooster ? QUIET_INSTRUCTIONS : '';

    const prompt = MAXIMIZE_PROMPT
      .replace('{{DOMAINS}}', activeDomains || 'Use all domains liberally.')
      .replace('{{QUIET}}', quietSection);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          max_tokens: 1500,
          messages: [
            {
              role: "user",
              content: prompt + "\n\nORIGINAL POST:\n" + inputText
            }
          ],
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || data.error);
      }

      const text = data.content?.[0]?.text || '';
      setVaporizedPost(text.trim());

    } catch (err) {
      console.error(err);
      setError("Vaporization failed. Try again.");
    } finally {
      setIsVaporizing(false);
    }
  };

  const copyToClipboard = () => {
    if (vaporizedPost) {
      navigator.clipboard.writeText(vaporizedPost);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const reset = () => {
    setInputText('');
    setAnalysis(null);
    setVaporizedPost(null);
    setError(null);
    setQuietBooster(false);
    setSelectedDomains({
      scientific: true,
      systems: true,
      spiritual: true,
      moral: true
    });
  };

  const toggleDomain = (domain: keyof typeof selectedDomains) => {
    setSelectedDomains(prev => ({
      ...prev,
      [domain]: !prev[domain]
    }));
  };

  const getVaporLevelDisplay = (level: string) => {
    switch(level) {
      case 'solid':
        return { label: 'SOLID', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' };
      case 'hazy':
        return { label: 'HAZY', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/30' };
      case 'cloudy':
        return { label: 'CLOUDY', color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30' };
      case 'pure vapor':
        return { label: 'PURE VAPOR', color: 'text-violet-400', bg: 'bg-violet-500/20', border: 'border-violet-500/30' };
      default:
        return { label: 'UNKNOWN', color: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/30' };
    }
  };

  const getDomainColor = (domain: string) => {
    switch(domain) {
      case 'scientific': return 'bg-blue-500';
      case 'systems': return 'bg-emerald-500';
      case 'spiritual': return 'bg-violet-500';
      case 'moral': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  const getDomainIcon = (domain: string) => {
    switch(domain) {
      case 'scientific': return '⚛️';
      case 'systems': return '🏗️';
      case 'spiritual': return '🔮';
      case 'moral': return '⚖️';
      default: return '•';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">CONCRETE</h1>
          <p className="text-violet-400 text-sm font-medium">Vapor Maximization Platform</p>
        </div>

        {/* Intro Copy - Only show when no analysis */}
        {!analysis && (
          <>
            <div className="mb-8 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                AI content is over 50% of LinkedIn. It all sounds the same.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                That's the model doing its job—finding the safest way to sound important. It borrows authority from high-status domains: physics, systems engineering, spirituality, ethics. Then blends them until everything sounds like a TED talk about consciousness given by a systems architect.
              </p>
              <p className="text-slate-500 text-sm">
                The result is vapor. Vague. Elevated. Empty.
              </p>
              <div className="pt-2">
                <p className="text-slate-400 text-sm">You could fight it. Add specifics. Be more human.</p>
                <p className="text-violet-400 font-medium pt-1">Or you could own it.</p>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-8 p-4 rounded-lg bg-slate-900/50 border border-slate-800">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">How It Works</p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-3">
                  <span className="text-violet-400 font-mono">1.</span>
                  <p className="text-slate-400"><span className="text-slate-200">Analyze</span> — See your vapor breakdown: Scientific ⚛️, Systems 🏗️, Spiritual 🔮, Moral ⚖️</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-violet-400 font-mono">2.</span>
                  <p className="text-slate-400"><span className="text-slate-200">Mix</span> — Select which domains to amplify</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-violet-400 font-mono">3.</span>
                  <p className="text-slate-400"><span className="text-slate-200">Maximize</span> — We vaporize residual specifics and escalate beyond default AI settings</p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="mb-4">
              <textarea
                className="w-full h-40 p-4 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none text-sm"
                placeholder="Paste your LinkedIn post here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            <button
              onClick={analyzePost}
              disabled={isAnalyzing || !inputText.trim()}
              className="w-full bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Vapor'}
            </button>
          </>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Analysis Results */}
        {analysis && !vaporizedPost && (
          <div className="space-y-6">

            {/* Vapor Level */}
            <div className={`p-5 rounded-lg border ${getVaporLevelDisplay(analysis.vapor_level).bg} ${getVaporLevelDisplay(analysis.vapor_level).border}`}>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Vapor Level</p>
              <p className={`text-2xl font-bold ${getVaporLevelDisplay(analysis.vapor_level).color}`}>
                {getVaporLevelDisplay(analysis.vapor_level).label}
              </p>
              <p className="text-slate-400 text-sm mt-2 italic">"{analysis.vapor_level_description}"</p>
            </div>

            {/* Vapor Composition */}
            <div className="p-5 rounded-lg bg-slate-900/50 border border-slate-800">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Vapor Composition</p>
              <div className="space-y-3">
                {Object.entries(analysis.vapor_composition).map(([domain, value]) => (
                  <div key={domain}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">{getDomainIcon(domain)} {domain.charAt(0).toUpperCase() + domain.slice(1)}</span>
                      <span className="text-slate-500 font-mono">{value}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`${getDomainColor(domain)} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specificity Check */}
            <div className={`p-5 rounded-lg border ${analysis.specificity_check.has_specifics ? 'bg-amber-500/10 border-amber-500/30' : 'bg-violet-500/10 border-violet-500/30'}`}>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Specificity Scan</p>
              <p className={`font-semibold ${analysis.specificity_check.has_specifics ? 'text-amber-400' : 'text-violet-400'}`}>
                {analysis.specificity_check.has_specifics ? 'Residual specifics detected' : 'No specifics detected'}
              </p>
              <p className="text-slate-400 text-sm mt-1">{analysis.specificity_check.residual_specifics}</p>
            </div>

            {/* Domain Mixer */}
            <div className="p-5 rounded-lg bg-slate-900/50 border border-slate-800">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Domain Mixer</p>
              <p className="text-slate-500 text-sm mb-4">Select which domains to amplify in your vaporized output.</p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(selectedDomains).map(([domain, active]) => (
                  <button
                    key={domain}
                    onClick={() => toggleDomain(domain as keyof typeof selectedDomains)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      active
                        ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                        : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-lg mr-2">{getDomainIcon(domain)}</span>
                    <span className="text-sm font-medium">{domain.charAt(0).toUpperCase() + domain.slice(1)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quiet Booster */}
            <div className="p-5 rounded-lg bg-slate-900/50 border border-slate-800">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Humble-Brag Booster 🤫</p>
                  {analysis.quiet_signal?.detected ? (
                    <p className="text-slate-400 text-sm">
                      Quiet signal detected in your post. <span className="text-violet-400">Double down?</span> Internal data suggests humble-brag language multiplies engagement when combined with 2+ domains.
                    </p>
                  ) : (
                    <p className="text-slate-400 text-sm">
                      No quiet signal detected. <span className="text-violet-400">Add one?</span> Whispered truths carry more weight. Things don&apos;t happen—they &quot;quietly emerge.&quot;
                    </p>
                  )}
                  {analysis.quiet_signal?.detected && analysis.quiet_signal.examples.length > 0 && (
                    <p className="text-slate-500 text-xs mt-2 italic">
                      Found: {analysis.quiet_signal.examples.slice(0, 3).map(ex => `"${ex}"`).join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setQuietBooster(!quietBooster)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    quietBooster
                      ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                      : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:border-slate-600'
                  }`}
                >
                  {quietBooster ? 'On' : 'Off'}
                </button>
              </div>
            </div>

            {/* Vaporize Button */}
            <button
              onClick={vaporizePost}
              disabled={isVaporizing || !Object.values(selectedDomains).some(v => v)}
              className="w-full bg-violet-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
            >
              {isVaporizing ? 'Vaporizing...' : '💨 VAPORIZE'}
            </button>

            {/* Start Over */}
            <button
              onClick={reset}
              className="w-full py-2 text-slate-500 text-sm hover:text-slate-300 transition-colors"
            >
              ← Start over
            </button>
          </div>
        )}

        {/* Vaporized Output */}
        {vaporizedPost && (
          <div className="space-y-6">

            {/* Output Label */}
            <div className="text-center">
              <span className="text-3xl">💨</span>
              <p className="text-violet-400 font-bold text-lg mt-2">Vaporized</p>
              <p className="text-slate-500 text-sm">Maximum vapor density achieved</p>
            </div>

            {/* The Output */}
            <div className="p-6 rounded-lg bg-slate-900 border border-violet-500/30 shadow-lg shadow-violet-500/5">
              <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{vaporizedPost}</p>
            </div>

            {/* Copy Button */}
            <button
              onClick={copyToClipboard}
              className="w-full bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-500 transition-colors"
            >
              {copied ? '✓ Copied' : '📋 Copy to Clipboard'}
            </button>

            {/* Remix */}
            <button
              onClick={() => setVaporizedPost(null)}
              className="w-full py-3 border border-slate-700 text-slate-400 rounded-lg font-medium hover:bg-slate-800 hover:text-slate-200 transition-colors"
            >
              ↻ Try different domain mix
            </button>

            {/* Original */}
            <details className="rounded-lg bg-slate-900/50 border border-slate-800">
              <summary className="px-5 py-3 cursor-pointer text-sm text-slate-500 hover:text-slate-300">
                View original
              </summary>
              <div className="px-5 pb-4 border-t border-slate-800">
                <p className="text-slate-500 text-sm leading-relaxed mt-3 whitespace-pre-wrap">{inputText}</p>
              </div>
            </details>

            {/* Start Over */}
            <button
              onClick={reset}
              className="w-full py-2 text-slate-500 text-sm hover:text-slate-300 transition-colors"
            >
              ← Analyze new post
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
