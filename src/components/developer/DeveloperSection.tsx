export function DeveloperSection({ title, description, items }: { title: string; description: string; items: string[] }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="my-3 text-neutral-700">{description}</p>
      <ul className="list-disc ml-6 space-y-2">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </section>
  );
}

