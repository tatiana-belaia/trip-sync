import { getItinerarySuggestions } from "@/lib/ai/itinerary-suggestions";

export default async function AiPreviewPage() {
	const { source, suggestion } = await getItinerarySuggestions("Rome");

	return (
		<main className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-2xl font-bold">{suggestion.title}</h1>

			<p className="mb-6 text-sm text-gray-500">
				Sample itinerary • Source: {source}
			</p>

			<div className="space-y-6">
				{suggestion.days.map((day) => (
					<section key={day.dayNumber}>
						<h2 className="mb-3 text-lg font-semibold">Day {day.dayNumber}</h2>

						<ul className="space-y-2">
							{[...day.activities]
								.sort((a, b) => a.position - b.position)
								.map((activity) => (
									<li key={activity.position}>
										{activity.position}. {activity.title}
									</li>
								))}
						</ul>
					</section>
				))}
			</div>
		</main>
	);
}
