import { CodeExample } from "@/components/developer/CodeExample";
import { DeveloperSection } from "@/components/developer/DeveloperSection";
import { WalletSupportTable } from "@/components/developer/WalletSupportTable";
import { ContentPageHeader } from "@/app/components/ContentPageHeader";
import { DevNavigation } from "./components/DevNavigation";
import { WorkshopModeToggle } from "./components/WorkshopModeToggle";
import deepDive from "@/content/developer/deep-dive.json";
import examples from "@/content/developer/examples.json";
import overview from "@/content/developer/overview.json";
import patterns from "@/content/developer/integration-patterns.json";
import wallets from "@/content/developer/wallets.json";
import vibeCoding from "@/content/developer/vibe-coding-platforms.json";
import { getDeveloperContent } from "@/lib/content/getDeveloperContent";

export default function DeveloperPage() {
  const developerContent = getDeveloperContent();

  return (
    <>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row gap-8">
          <DevNavigation
            sections={developerContent.sections}
            navOrder={developerContent.navOrder}
            currentSlug={undefined}
          />
          <div className="flex-1">
            <ContentPageHeader
              title={developerContent.title}
              tagline={developerContent.tagline}
            />

            {/* Overview Sections */}
            {overview.sections.map(sec => (
              <DeveloperSection key={sec.id} {...sec} />
            ))}

            {/* Technical Deep Dive */}
            <section id="deep-dive" className="scroll-mt-8">
              <h2 className="text-3xl font-bold mt-16 mb-4">Technical Deep Dive</h2>
              <p className="text-lg text-neutral-700 mb-6">{deepDive.overview}</p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Protocol Flow</h3>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                {deepDive.flowDiagramSteps.map((s, i) => <li key={i} className="text-neutral-700">{s}</li>)}
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Cryptography</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Derivation</h4>
                  <p className="text-neutral-700">{deepDive.cryptography.keys}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Signatures</h4>
                  <p className="text-neutral-700">{deepDive.cryptography.signatures}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Challenge-Response</h4>
                  <p className="text-neutral-700">{deepDive.cryptography.challengeResponse}</p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Server Responsibilities</h3>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                {deepDive.serverResponsibilities.map((resp, i) => (
                  <li key={i} className="text-neutral-700">{resp}</li>
                ))}
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Wallet Responsibilities</h3>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                {deepDive.walletResponsibilities.map((resp, i) => (
                  <li key={i} className="text-neutral-700">{resp}</li>
                ))}
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Security Considerations</h3>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                {deepDive.risks.map((risk, i) => (
                  <li key={i} className="text-neutral-700">{risk}</li>
                ))}
              </ul>
            </section>

            {/* Integration Patterns */}
            <section id="integration-patterns" className="scroll-mt-8">
              <h2 className="text-3xl font-bold mt-16 mb-6">Integration Patterns</h2>
              {patterns.patterns.map(p => (
                <div key={p.id} className="mb-8">
                  <DeveloperSection title={p.name} description={p.useCase} items={p.steps} />
                  {p.pros && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Pros:</h4>
                      <ul className="list-disc ml-6 space-y-1">
                        {p.pros.map((pro, i) => <li key={i} className="text-neutral-700">{pro}</li>)}
                      </ul>
                    </div>
                  )}
                  {p.cons && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Cons:</h4>
                      <ul className="list-disc ml-6 space-y-1">
                        {p.cons.map((con, i) => <li key={i} className="text-neutral-700">{con}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* Vibe Coding Platform Compatibility */}
            <section id="vibe-coding-platforms" className="scroll-mt-8">
              <h2 className="text-3xl font-bold mt-16 mb-4">{vibeCoding.title}</h2>
              <p className="text-xl text-neutral-600 mb-6">{vibeCoding.subtitle}</p>
              <p className="text-lg text-neutral-700 mb-8">{vibeCoding.overview}</p>

              {/* What is Vibe Coding */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-3">{vibeCoding.whatIsVibeCoding.title}</h3>
                <p className="text-neutral-700 mb-4">{vibeCoding.whatIsVibeCoding.description}</p>
                <ul className="list-disc ml-6 space-y-2">
                  {vibeCoding.whatIsVibeCoding.examples.map((ex, i) => (
                    <li key={i} className="text-neutral-700">{ex}</li>
                  ))}
                </ul>
              </div>

              {/* Technical Requirements */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-3">{vibeCoding.technicalRequirements.title}</h3>
                <p className="text-neutral-700 mb-6">{vibeCoding.technicalRequirements.description}</p>
                {vibeCoding.technicalRequirements.requirements.map((req, i) => (
                  <div key={i} className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <h4 className="font-semibold text-lg mb-2">{req.requirement}</h4>
                    <p className="text-neutral-700 mb-3">{req.reason}</p>
                    <p className="text-sm text-neutral-600 italic">Technical: {req.technical}</p>
                  </div>
                ))}
                <p className="text-neutral-700 font-medium mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  {vibeCoding.technicalRequirements.summary}
                </p>
              </div>

              {/* Platform Categories */}
              {vibeCoding.platformCategories.map((category, catIdx) => (
                <div key={catIdx} className="mb-12">
                  <h3 className="text-2xl font-semibold mb-3">{category.category}</h3>
                  <p className="text-neutral-700 mb-6">{category.description}</p>
                  
                  {category.platforms?.map((platform, pIdx) => (
                    <div key={pIdx} className="mb-8 p-6 border border-neutral-300 rounded-lg bg-white">
                      <h4 className="text-xl font-semibold mb-2">
                        <a href={platform.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {platform.name}
                        </a>
                      </h4>
                      <p className="text-neutral-700 mb-4">{platform.description}</p>
                      
                      {'limitations' in platform && platform.limitations && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-red-700 mb-2">Limitations:</h5>
                          <ul className="list-disc ml-6 space-y-1">
                            {platform.limitations.map((lim, i) => (
                              <li key={i} className="text-neutral-700">{lim}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {'capabilities' in platform && platform.capabilities && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-green-700 mb-2">Capabilities:</h5>
                          <ul className="list-disc ml-6 space-y-1">
                            {platform.capabilities.map((cap, i) => (
                              <li key={i} className="text-neutral-700">{cap}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {'workaround' in platform && platform.workaround && (
                        <div className="mb-4">
                          <h5 className="font-semibold mb-2">Workaround:</h5>
                          <p className="text-neutral-700 italic">{platform.workaround}</p>
                        </div>
                      )}
                      
                      {'implementation' in platform && platform.implementation && (
                        <div className="mb-4">
                          <h5 className="font-semibold mb-2">Implementation:</h5>
                          <p className="text-neutral-700">{platform.implementation}</p>
                        </div>
                      )}
                      
                      <div className="mt-4 p-3 bg-neutral-100 rounded border-l-4 border-neutral-400">
                        <span className="font-semibold">Verdict:</span> {platform.verdict}
                      </div>
                    </div>
                  ))}
                  
                  {category.tools?.map((tool, tIdx) => (
                    <div key={tIdx} className="mb-6 p-4 border border-neutral-200 rounded-lg bg-neutral-50">
                      <h4 className="text-lg font-semibold mb-2">{tool.name}</h4>
                      <p className="text-neutral-700 mb-3">{tool.description}</p>
                      <div className="p-2 bg-neutral-100 rounded border-l-4 border-neutral-400">
                        <span className="font-semibold">Verdict:</span> {tool.verdict}
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-neutral-800 font-medium">{category.summary}</p>
                  </div>
                </div>
              ))}

              {/* Recommendations */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6">{vibeCoding.recommendations.title}</h3>
                {vibeCoding.recommendations.options.map((option, i) => (
                  <div key={i} className="mb-6 p-5 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                    <h4 className="font-semibold text-lg mb-2 text-blue-900">{option.scenario}</h4>
                    <p className="text-neutral-800 mb-3">{option.recommendation}</p>
                    <div className="flex flex-wrap gap-2">
                      {option.platforms.map((plat, j) => (
                        <span key={j} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">{vibeCoding.summary.title}</h3>
                <ul className="space-y-3 mb-6">
                  {vibeCoding.summary.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-purple-600 font-bold mr-2">→</span>
                      <span className="text-neutral-800">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-white border border-purple-200 rounded-lg">
                  <p className="text-neutral-900 font-semibold italic">{vibeCoding.summary.finalThought}</p>
                </div>
              </div>
            </section>

            {/* Examples */}
            <section id="examples" className="scroll-mt-8">
              <h2 className="text-3xl font-bold mt-16 mb-6">Examples</h2>
              {examples.examples.map(ex => <CodeExample key={ex.id} {...ex} />)}
            </section>

            {/* Wallet Support */}
            <section id="wallet-support" className="scroll-mt-8">
              <h2 className="text-3xl font-bold mt-16 mb-6">Wallet Support</h2>
              <WalletSupportTable wallets={wallets.wallets} />
            </section>
          </div>
        </div>
      </div>
      <WorkshopModeToggle />
    </>
  );
}
