import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center py-48 md:py-72 bg-gray-900 text-center text-white">
      <h1 className="text-4xl font-bold mb-4">About My Blog</h1>
      <p className="text-lg mb-6">
        This blog is a place where I share my thoughts, ideas, and experiences
        on various topics. From technology to lifestyle, I aim to provide
        valuable insights for my readers.
      </p>
      <Link
        href="/posts"
        className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
      >
        Explore my posts
      </Link>
    </div>
  );
}
