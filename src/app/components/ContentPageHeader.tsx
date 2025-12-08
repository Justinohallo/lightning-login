type ContentPageHeaderProps = {
  title: string;
  tagline: string;
};

export function ContentPageHeader({ title, tagline }: ContentPageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-3">{title}</h1>
      <p className="text-xl text-neutral-600">{tagline}</p>
      <hr className="my-8 border-neutral-200" />
    </div>
  );
}

