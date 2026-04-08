import { Link } from 'react-router';
import { Brain, Home, RotateCcw } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-8">
          <Brain className="w-12 h-12 text-gray-400" />
        </div>

        <h1 className="text-7xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-3">Not found</h2>
        <p className="text-gray-600 mb-10">
          The link may be outdated or entered incorrectly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-2xl transition"
          >
            <Home className="w-5 h-5" />
            Main page
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 font-semibold px-8 py-4 rounded-2xl transition"
          >
            <RotateCcw className="w-5 h-5" />
            Update
          </button>
        </div>
      </div>
    </div>
  );
}