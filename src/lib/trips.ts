import { cache } from "react";

import { type Trip, trips } from "@/data/trips";

export const getTrip = cache(
	async (tripId: string): Promise<Trip | undefined> => {
		await new Promise((resolve) => {
			setTimeout(resolve, 1500);
		});

		console.log("getTrip called:", tripId);

		return trips.find((trip) => trip.id === tripId);
	}
);

export const getTrips = async (): Promise<Trip[]> => {
	await new Promise((resolve) => {
		setTimeout(resolve, 1000);
	});

	return trips;
};
