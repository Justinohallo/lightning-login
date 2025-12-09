import { GlossaryItem } from "@/lib/schemas/educationSchema";

export default function GlossarySection({ items }: { items: GlossaryItem[] }) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-4">Glossary</h2>
      <dl>
        {items.map((entry) => (
          <div key={entry.term} className="mb-4">
            <dt className="font-semibold">{entry.term}</dt>
            <dd>{entry.definition}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

