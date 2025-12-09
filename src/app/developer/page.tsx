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
