import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-white">
          <Link href="/">My Blog</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-gray-300 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/posts" className="text-gray-300 hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-300 hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="text-gray-300 hover:text-white">
                Contacts
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
