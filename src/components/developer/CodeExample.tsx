export function CodeExample({ name, description, code }: { name: string; description: string; code: string }) {
  return (
    <div className="my-8">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-neutral-600">{description}</p>
      <pre className="bg-neutral-900 text-white p-4 mt-3 rounded-lg overflow-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

