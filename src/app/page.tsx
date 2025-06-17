"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Next.js + Redux + TailwindCSS
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern web development stack combining the power of Next.js 14,
            Redux Toolkit for state management, and TailwindCSS for beautiful
            styling.
          </p>
        </div>

        {/* Counter Demo */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Try Our Redux Counter Demo
          </h2>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/home")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg"
            >
              🎯 Launch Counter Demo
            </button>
          </div>
          <p className="text-center text-gray-600 mt-4">
            Click the button above to experience Redux state management in
            action!
          </p>
        </div>
      </div>
    </div>
  );
}
