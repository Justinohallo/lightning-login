import { type ComparisonSection as ComparisonSectionType } from "@/lib/content-schemas/lightning-login-education";

type ComparisonSectionProps = {
  section: ComparisonSectionType;
};

export function ComparisonSection({ section }: ComparisonSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
      {section.intro && (
        <p className="text-lg mb-4 text-neutral-700">{section.intro}</p>
      )}
      <div className="space-y-4 leading-relaxed">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {section.comparisonTable && (
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse border border-neutral-300">
            <thead>
              <tr className="bg-neutral-100">
                {section.comparisonTable.columns.map((column, index) => (
                  <th
                    key={index}
                    className="border border-neutral-300 px-4 py-3 text-left font-semibold"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.comparisonTable.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-neutral-50">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-neutral-300 px-4 py-3"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.takeaway && (
        <div className="mt-6 p-4 bg-neutral-50 border-l-4 border-neutral-400">
          <p className="font-medium italic">{section.takeaway}</p>
        </div>
      )}
    </section>
  );
}

