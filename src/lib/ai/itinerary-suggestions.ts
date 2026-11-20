export type ItinerarySuggestionResponse = {
	source: "mock";
	suggestion: {
		title: string;
		days: {
			dayNumber: number;
			date: string | null;
			activities: {
				title: string;
				position: number;
			}[];
		}[];
	};
};

export async function getItinerarySuggestions(
	destination: string,
): Promise<ItinerarySuggestionResponse> {
	const baseUrl = process.env.TRIPS_API_BASE_URL;

	if (!baseUrl) {
		throw new Error("Missing TRIPS_API_BASE_URL");
	}

	const response = await fetch(`${baseUrl}/ai/itinerary-suggestions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ destination }),
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(
			`Failed to fetch itinerary suggestions: ${response.status}`,
		);
	}

	return (await response.json()) as ItinerarySuggestionResponse;
}
