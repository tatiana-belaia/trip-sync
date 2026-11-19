import { cache } from "react";

import type { Trip } from "@/types/trips";

export const getTrip = cache(
	async (tripId: string): Promise<Trip | undefined> => {
		const baseUrl = process.env.TRIPS_API_BASE_URL;

		if (!baseUrl) {
			throw new Error("Missing TRIPS_API_BASE_URL");
		}

		const response = await fetch(
			`${baseUrl}/trips/${encodeURIComponent(tripId)}`,
			{
				cache: "no-store",
			},
		);

		if (response.status === 404) {
			return undefined;
		}

		if (!response.ok) {
			throw new Error(`Failed to fetch trip: ${response.status}`);
		}

		return (await response.json()) as Trip;
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
