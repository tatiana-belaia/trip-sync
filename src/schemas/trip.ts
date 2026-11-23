import * as z from "zod";

export const tripSchema = z.strictObject({
	id: z.uuid(),
	title: z.string().min(1, "Title must be at least 1 character"),
});

export const activitySchema = z.strictObject({
	id: z.uuid(),
	title: z.string().min(1, "Title must be at least 1 character"),
	position: z.int().nonnegative(),
});

export const itineraryDaySchema = z.strictObject({
	dayNumber: z.int().positive(),
	activities: z.array(activitySchema),
});

export const tripDetailSchema = tripSchema.safeExtend({
	days: z.array(itineraryDaySchema),
});

export type Trip = z.infer<typeof tripSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type ItineraryDay = z.infer<typeof itineraryDaySchema>;
export type TripDetail = z.infer<typeof tripDetailSchema>;
