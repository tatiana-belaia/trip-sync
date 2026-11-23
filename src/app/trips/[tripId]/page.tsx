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
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-semibold">{trip.title}</h1>

			<h2 className="text-lg font-medium">Itinerary</h2>

			{trip.days.map((day) => (
				<section key={day.dayNumber} aria-label={`Day ${day.dayNumber}`}>
					<h3 className="font-medium">Day {day.dayNumber}</h3>
					{day.activities.map((activity) => (
						<p key={activity.id}>{activity.title}</p>
					))}
				</section>
			))}
		</div>
	);
}
