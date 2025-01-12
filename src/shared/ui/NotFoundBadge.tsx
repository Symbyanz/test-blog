interface NotFoundBadgeProps {
  title: string;
  description: string;
}

export default function NotFoundBadge({
  title = "Resource not found!",
  description = " Sorry, the resource you&apos;re looking for are not available.",
}: NotFoundBadgeProps) {
  return (
    <section className="flex items-center justify-center py-48 md:py-72">
      <div className="p-6 bg-gray-200 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </section>
  );
}
