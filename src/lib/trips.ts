import { cache } from "react";

import { trips } from "@/data/trips";
import type { Trip } from "@/types/trips";

export const getTrip = cache(
	async (tripId: string): Promise<Trip | undefined> => {
		await new Promise((resolve) => {
			setTimeout(resolve, 1500);
		});

		console.log("getTrip called:", tripId);

		return trips.find((trip) => trip.id === tripId);
	},
);

export const getTrips = async (): Promise<Trip[]> => {
	const baseUrl = process.env.TRIPS_API_BASE_URL;

	if (!baseUrl) {
		throw new Error("Missing TRIPS_API_BASE_URL");
	}

	const response = await fetch(`${baseUrl}/trips`, {
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch trips: ${response.status}`);
	}

	return (await response.json()) as Trip[];
};
