import { type ItineraryItem } from "@/data/itinerary";

export const getItinerary = async (
	tripId: string,
): Promise<ItineraryItem[]> => {
	const response = await fetch(`/api/trips/${tripId}/itinerary`);

	if (!response.ok) {
		throw new Error("Something went wrong");
	}

	const data: ItineraryItem[] = await response.json();

	return data;
};

export const addItineraryItem = async ({
	tripId,
	title,
	date,
	location,
}: Omit<ItineraryItem, "id">): Promise<ItineraryItem> => {
	const response = await fetch(`/api/trips/${tripId}/itinerary`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title, date, location }),
	});

	if (!response.ok) {
		throw new Error("Something went wrong");
	}

	return response.json();
};
