import { FaTelegram, FaGithub, FaLink } from "react-icons/fa";

export default function Contacts() {
  return (
    <div className="py-40 md:py-64 flex flex-col items-center justify-center py-16 md:py-24 bg-gray-900 text-center text-white">
      <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
      <p className="text-lg mb-6">
        Feel free to reach out to me via the following channels:
      </p>

      <div className="flex flex-col items-center space-y-4">
        <div>
          <a
            href="https://t.me/symbyanz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-500 transition-colors duration-300"
          >
            <FaTelegram className="text-xl" />
            <span>Telegram: @symbyanz</span>
          </a>
        </div>
        <div>
          <a
            href="https://github.com/Symbyanz/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-500 transition-colors duration-300"
          >
            <FaGithub className="text-xl" />
            <span>GitHub: @Symbyanz</span>
          </a>
        </div>
        <div>
          <a
            href="https://symbyanz.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-500 transition-colors duration-300"
          >
            <FaLink className="text-xl" />
            <span>Website: symbyanz.ru</span>
          </a>
        </div>
      </div>
    </div>
  );
}
