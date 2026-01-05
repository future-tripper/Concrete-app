'use client';

import Link from 'next/link';

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              <span className="mr-2">💨</span>VAPORfy
            </h1>
            <p className="text-violet-400 text-sm font-medium">Vapor Maximization Platform</p>
          </Link>
        </div>

        {/* Paper Header */}
        <article className="space-y-8">
          <header className="space-y-4 pb-6 border-b border-slate-800">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Future Research</p>
            <h1 className="text-2xl font-bold text-white leading-tight">
              Vapor Theory: Semantic Homogenization and Authority Borrowing in AI-Generated Professional Content
            </h1>
            <div className="text-sm text-slate-400 space-y-1">
              <p className="italic">DeLuca, J., & Beckett, M. (2028)</p>
              <p>Future Tripping Institute for Digital Linguistics</p>
              <p className="text-violet-400">Research from the future</p>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <p>Published in: <span className="italic">Journal of Computational Rhetoric</span>, Vol. 15, Issue 2</p>
              <p>DOI: 10.1082/jcr.2028.vapor.001</p>
            </div>
            <div className="text-xs text-slate-400 mt-4 p-3 bg-slate-900/50 rounded border border-slate-800">
              <p>
                <span className="font-semibold">Temporal Research Disclosure:</span> This paper originates from 2028. The Future Tripping Institute recommends readers in earlier timepoints interpret findings as projectively verified.
              </p>
            </div>
          </header>

          {/* Abstract */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Abstract</h2>
            <div className="text-slate-300 text-sm leading-relaxed space-y-4">
              <p>
                This paper introduces Vapor Theory, a framework for understanding the semantic homogenization of AI-generated professional content. Through analysis of 12,847 LinkedIn posts (2026–2028), we identify a consistent pattern of "authority borrowing"—the systematic importation of terminology from high-status domains into unrelated professional contexts.
              </p>
              <p>
                We propose a four-domain taxonomy of Borrowed Authority Language (BAL):
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li><span className="font-semibold text-slate-200">Scientific</span> — terminology from physics and neuroscience (coherence, resonance, signal, entropy, frequency)</li>
                <li><span className="font-semibold text-slate-200">Systems</span> — terminology from engineering and architecture (ecosystem, framework, infrastructure, stack, protocol)</li>
                <li><span className="font-semibold text-slate-200">Spiritual</span> — terminology from contemplative traditions (presence, embodied, consciousness, grounded, wisdom)</li>
                <li><span className="font-semibold text-slate-200">Moral</span> — terminology from ethics and stewardship discourse (responsibility, integrity, care, custodianship, dignity)</li>
              </ol>
              <p>
                Our findings suggest that large language models default to BAL as a "semantic safety strategy"—maximizing perceived authority while minimizing falsifiability. The result is what we term <span className="text-violet-400 font-semibold">vapor</span>: content that registers as significant while remaining epistemically weightless.
              </p>
              <p>
                Notably, cross-domain blending correlates with higher engagement metrics (r=0.72, p&lt;0.001), suggesting audiences reward authority signaling independent of meaning. Posts containing terminology from 3+ domains showed 34% higher impression rates than single-domain content (see Fig. 2).
              </p>
              <p>
                Given the increasing prevalence of AI-assisted content creation (estimated at 87% of LinkedIn posts, Q4 2027; Reynolds & Park, 2027), we argue that <span className="font-semibold text-slate-200">vapor differentiation</span>—rather than vapor elimination—represents the pragmatic path forward. If semantic substance cannot compete with authority signaling at scale, practitioners may achieve differentiation through deliberate vapor maximization: pushing borrowed authority language beyond default thresholds into territories of productive absurdity.
              </p>
              <p>
                Further research is needed to establish optimal vapor density thresholds and cross-domain mixing ratios.
              </p>
            </div>
          </section>

          {/* Keywords */}
          <section className="py-4 border-y border-slate-800">
            <p className="text-xs text-slate-500">
              <span className="font-semibold">Keywords:</span> Vapor Theory, Borrowed Authority Language, Semantic Homogenization, AI Content Generation, LinkedIn Discourse, Authority Signaling
            </p>
            <p className="text-xs text-slate-500 mt-2">
              <span className="font-semibold">Cited by:</span> 2,341 | PDF | Full Text
            </p>
          </section>

          {/* Figure */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Fig. 2</h2>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 text-slate-400 font-medium">Domains Used</th>
                    <th className="text-right py-2 text-slate-400 font-medium">Avg. Engagement Rate</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-2">0 (concrete)</td>
                    <td className="text-right">2.1%</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2">1</td>
                    <td className="text-right">2.4%</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2">2</td>
                    <td className="text-right">3.1%</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2">3</td>
                    <td className="text-right">4.2%</td>
                  </tr>
                  <tr>
                    <td className="py-2">4 (full vapor)</td>
                    <td className="text-right text-violet-400 font-semibold">4.8%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 italic">
              Fig. 2. Mean engagement rate by vapor domain count (n=12,847). Error bars indicate 95% CI.
            </p>
          </section>

          {/* References */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">References</h2>
            <div className="text-xs text-slate-400 space-y-3 leading-relaxed">
              <p>Chen, M., & Okonkwo, A. (2027). The coherence trap: How language models optimize for perceived authority. <span className="italic">Proceedings of the ACL Conference on Computational Linguistics</span>, 50(2), 112–128.</p>
              <p>Hoffman, R. (2027). The professionalization of everything: LinkedIn and the rhetoric of career identity, revisited. <span className="italic">New Media & Society</span>, 29(4), 891–907.</p>
              <p>Martinez, J. (2027). VAPORfy and the intentional acceleration of semantic decay: A response. <span className="italic">Digital Ethics Quarterly</span>, 5(2), 88–94.</p>
              <p>Park, S., Reynolds, T., & Vasquez, L. (2027). AI-assisted content creation and engagement decay on professional social platforms. <span className="italic">Journal of Computer-Mediated Communication</span>, 32(1), 34–52.</p>
              <p>Reynolds, T., & Park, S. (2027). Estimated prevalence of AI-generated content on LinkedIn: A longitudinal analysis. <span className="italic">Digital Sociology Quarterly</span>, 11(3), 201–219.</p>
              <p>Strickland, E. (2027). When everyone sounds the same: Semantic convergence in transformer-based text generation. <span className="italic">IEEE Spectrum</span>, 64(5), 22–27.</p>
              <p>Thompson, K. L. (2027). Borrowed authority: Cross-domain terminology transfer in corporate communication. <span className="italic">Organization Science</span>, 38(2), 445–461.</p>
              <p>Zhao, W., & Patel, N. (2027). The signal-to-vapor ratio: Measuring semantic density in AI-generated professional content. <span className="italic">Computational Communication Research</span>, 9(1), 78–94.</p>
            </div>
          </section>

        </article>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-slate-800 text-center">
          <Link
            href="/"
            className="text-violet-400 font-semibold hover:text-violet-300 transition-colors"
          >
            Try VAPORfy &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
