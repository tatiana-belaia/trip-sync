"use client";

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<main role="alert" className="flex flex-col items-center gap-4">
			<h2>Could not load your trips</h2>
			<p>Something went wrong. Please try again.</p>

			<button
				type="button"
				onClick={reset}
				className="text-indigo-600 font-bold border border-solid border-gray-200 px-3 py-2 cursor-pointer"
			>
				Try again
			</button>
		</main>
	);
}
