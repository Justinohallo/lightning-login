type DevComparisonTableProps = {
  columns: string[];
  rows: string[][];
};

export function DevComparisonTable({
  columns,
  rows,
}: DevComparisonTableProps) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-neutral-300">
        <thead>
          <tr className="bg-neutral-100">
            {columns.map((column, index) => (
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
          {rows.map((row, rowIndex) => (
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
  );
}

