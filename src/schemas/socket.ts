import * as z from "zod";

export const itineraryCreatedEventSchema = z.strictObject({
	type: z.literal("itinerary.created"),
	item: z.strictObject({
		id: z.number(),
		tripId: z.string(),
		title: z.string(),
		date: z.string(),
		location: z.string(),
	}),
});

export type ItineraryCreatedEvent = z.infer<typeof itineraryCreatedEventSchema>;

export const tripSubscribeEventSchema = z.strictObject({
	type: z.literal("trip.subscribe"),
	tripId: z.string(),
});

export type TripSubscribeEvent = z.infer<typeof tripSubscribeEventSchema>;

export const clientMessageSchema = z.discriminatedUnion("type", [
	itineraryCreatedEventSchema,
	tripSubscribeEventSchema,
]);

export type ClientMessage = z.infer<typeof clientMessageSchema>;
