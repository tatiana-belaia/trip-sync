export type ItineraryItem = {
	id: number;
	tripId: string;
	title: string;
	date: string;
	location: string;
};

export const itineraryItems: ItineraryItem[] = [
	{
		id: 1,
		tripId: "italy-2026",
		title: "Delice Restaurant",
		date: "2026-09-10",
		location: "Rome",
	},
	{
		id: 2,
		tripId: "italy-2026",
		title: "Port",
		date: "2026-09-11",
		location: "Venice",
	},
	{
		id: 3,
		tripId: "italy-2026",
		title: "Museum",
		date: "2026-09-12",
		location: "Bologna",
	},
	{
		id: 4,
		tripId: "italy-2026",
		title: "Cinema",
		date: "2026-09-13",
		location: "Rimini",
	},
];
