import { cache } from "react";
import * as z from "zod";

import type { Trip, TripDetail } from "@/contracts/trip";
import { tripDetailSchema, tripSchema } from "@/schemas/trip";

export const getTrip = cache(
	async (tripId: string): Promise<TripDetail | undefined> => {
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

		const data: unknown = await response.json();

		return tripDetailSchema.parse(data);
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

	const data: unknown = await response.json();

	return z.array(tripSchema).parse(data);
};
