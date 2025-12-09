export function DeveloperHeader({ title, summary }: { title: string; summary: string }) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-lg text-neutral-600 mt-4">{summary}</p>
    </div>
  );
}

