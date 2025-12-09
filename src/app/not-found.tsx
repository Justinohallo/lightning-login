import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-neutral-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/developer"
            className="px-6 py-3 border-2 border-black text-black rounded-lg font-medium hover:bg-neutral-100 transition-colors"
          >
            Developer Docs
          </Link>
        </div>
      </div>
    </div>
  );
}

