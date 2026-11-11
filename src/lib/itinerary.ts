import { type ItineraryItem, itineraryItems } from "@/data/itinerary";

export const getItinerary = async (
	tripId: string,
): Promise<ItineraryItem[]> => {
	await new Promise((resolve) => {
		setTimeout(resolve, 1500);
	});
	console.log("getItinerary called:", tripId);
	return itineraryItems.filter((item) => item.tripId === tripId);
};

export const addItineraryItem = async ({
	tripId,
	title,
	date,
	location,
}: Omit<ItineraryItem, "id">): Promise<ItineraryItem> => {
	console.log("MUTATION START:", title);

	await new Promise((resolve) => {
		setTimeout(resolve, 1000);
	});

	if (title.toLowerCase().includes("fail")) {
		console.log("THROWING ERROR:", title);
		throw new Error("Failed to add itinerary item");
	}

	const newItem = {
		id: Date.now(),
		tripId,
		title,
		date,
		location,
	};
	console.log("PUSHING:", newItem);

	itineraryItems.push(newItem);

	return newItem;
};
