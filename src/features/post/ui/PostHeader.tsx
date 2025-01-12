interface PostDetailsProps {
  title: string;
  author: React.ReactNode;
  createdAt: string;
}

export default function PostHeader({
  title,
  author,
  createdAt,
}: PostDetailsProps) {
  return (
    <header className="mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-200">{title}</h1>
        <p className="text-sm text-gray-300 mt-1">
          By {author} | <span>{createdAt}</span>
        </p>
      </div>
    </header>
  );
}
