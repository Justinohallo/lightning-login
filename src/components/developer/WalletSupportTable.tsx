export function WalletSupportTable({ wallets }: { wallets: Array<{ name: string; platform: string[]; supportsAuth: boolean; notes?: string }> }) {
  return (
    <table className="w-full text-left border-collapse mt-8">
      <thead>
        <tr>
          <th className="border-b p-2">Wallet</th>
          <th className="border-b p-2">Platforms</th>
          <th className="border-b p-2">Auth Support</th>
        </tr>
      </thead>
      <tbody>
        {wallets.map((w, i) => (
          <tr key={i}>
            <td className="p-2">{w.name}</td>
            <td className="p-2">{w.platform.join(", ")}</td>
            <td className="p-2">{w.supportsAuth ? "✔" : "❌"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

