import { FaqItem } from "@/lib/schemas/educationSchema";

export default function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-4">FAQ</h2>
      {items.map((faq) => (
        <div key={faq.id} className="mb-6">
          <h3 className="font-semibold">{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </section>
  );
}

