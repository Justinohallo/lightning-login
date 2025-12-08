import Link from "next/link";

type CTAStripProps = {
  title: string;
  body: string;
  primary: {
    label: string;
    href: string;
  };
  secondary?: {
    label: string;
    href: string;
  };
};

export function CTAStrip({ title, body, primary, secondary }: CTAStripProps) {
  return (
    <div className="w-full bg-[#f5f5f5] py-8 px-6 my-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-lg mb-6 text-neutral-700">{body}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primary.href}
            className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="px-6 py-3 border-2 border-black text-black rounded-lg font-medium hover:bg-neutral-100 transition-colors"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

