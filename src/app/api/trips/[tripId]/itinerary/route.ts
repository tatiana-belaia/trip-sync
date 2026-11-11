import { itineraryItems } from "@/data/itinerary";
import { itineraryItemInputSchema } from "@/schemas/itinerary";

export async function GET(
	_request: Request,
	{
		params,
	}: {
		params: Promise<{
			tripId: string;
		}>;
	},
) {
	const { tripId } = await params;
	const items = itineraryItems.filter((item) => item.tripId === tripId);

	return Response.json(items);
}

export async function POST(
	request: Request,
	{
		params,
	}: {
		params: Promise<{
			tripId: string;
		}>;
	},
) {
	const { tripId } = await params;
	const body = await request.json();
	
	const result = itineraryItemInputSchema.safeParse(body);

	if (!result.success) {
		return Response.json({ error: "Invalid itinerary item" }, { status: 400 });
	}

	const newItem = {
		id: Date.now(),
		tripId,
		...result.data,
	};

	itineraryItems.push(newItem);

	return Response.json(newItem, { status: 201 });
}
