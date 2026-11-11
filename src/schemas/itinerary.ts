import * as z from "zod";

export const itineraryItemInputSchema = z.strictObject({
	title: z.string().min(2, "Title must be at least 2 characters"),
	date: z.string().min(1, "Date is required"),
	location: z.string().min(2, "Location must be at least 2 characters"),
});

export type ItineraryItemInput = z.infer<typeof itineraryItemInputSchema>;
