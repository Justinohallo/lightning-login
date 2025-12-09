import { CodeExample } from "@/components/developer/CodeExample";
import { DeveloperHeader } from "@/components/developer/DeveloperHeader";
import { DeveloperSection } from "@/components/developer/DeveloperSection";
import { WalletSupportTable } from "@/components/developer/WalletSupportTable";
import deepDive from "@/content/developer/deep-dive.json";
import examples from "@/content/developer/examples.json";
import overview from "@/content/developer/overview.json";
import patterns from "@/content/developer/integration-patterns.json";
import wallets from "@/content/developer/wallets.json";

export default function DeveloperPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <DeveloperHeader title={overview.title} summary={overview.summary} />

      {overview.sections.map(sec => (
        <DeveloperSection key={sec.id} {...sec} />
      ))}

      <h2 className="text-3xl font-bold mt-16">Technical Deep Dive</h2>
      <ul className="list-disc ml-6 mt-4 space-y-2">
        {deepDive.flowDiagramSteps.map((s, i) => <li key={i}>{s}</li>)}
      </ul>

      <h2 className="text-3xl font-bold mt-16">Integration Patterns</h2>
      {patterns.patterns.map(p => (
        <DeveloperSection key={p.id} title={p.name} description={p.useCase} items={p.steps} />
      ))}

      <h2 className="text-3xl font-bold mt-16">Examples</h2>
      {examples.examples.map(ex => <CodeExample key={ex.id} {...ex} />)}

      <h2 className="text-3xl font-bold mt-16">Wallet Support</h2>
      <WalletSupportTable wallets={wallets.wallets} />
    </div>
  );
}
