import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-48 md:py-72 bg-gray-900 text-center text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Blog!</h1>
      <p className="text-lg mb-6">
        Stay updated with the latest news, articles, and insights.
      </p>
      <Link
        href="/posts"
        className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
      >
        Visit my blog
      </Link>
    </div>
  );
}
