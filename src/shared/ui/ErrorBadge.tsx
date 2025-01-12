interface ErrorBadgeProps {
  title: string;
  description: string;
}

export default function ErrorBadge({
  title = "Error",
  description = " Unknown error",
}: ErrorBadgeProps) {
  return (
    <section className="flex flex-col items-center justify-center p-6 bg-red-100 rounded-lg shadow-md text-center">
      <h2 className="text-lg font-semibold text-red-700">{title}</h2>
      <p className="text-sm text-red-600">{description}</p>
    </section>
  );
}
