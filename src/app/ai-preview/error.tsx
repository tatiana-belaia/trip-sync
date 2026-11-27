"use client";

export default function AiPreviewError({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<main role="alert" className="mx-auto max-w-2xl p-8">
			<h2 className="mb-4 text-xl font-semibold">
				Could not load itinerary suggestions
			</h2>

			<p className="mb-4">Something went wrong. Please try again.</p>

			<button type="button" onClick={reset}>
				Try again
			</button>
		</main>
	);
}
