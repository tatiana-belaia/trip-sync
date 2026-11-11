import { format } from "date-fns";
import { notFound } from "next/navigation";

import { getTrip } from "@/lib/trips";

export default async function TripPage({
	params,
}: {
	params: Promise<{
		tripId: string;
	}>;
}) {
	const { tripId } = await params;
	const trip = await getTrip(tripId);

	if (!trip) {
		notFound();
	}

	return (
		<div className="flex flex-col gap-1">
			<span>Overview</span>
			<span>
				{format(trip.startDate, "d MMM")} - {format(trip.endDate, "d MMM yyyy")}
			</span>
		</div>
	);
}
