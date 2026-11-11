import { getTrips } from "@/lib/trips";
import { format } from "date-fns";

import Link from "next/link";

export default async function TripsPage() {
	const trips = await getTrips();

	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<h1 className="mb-4">Your trips</h1>
			<div className="flex flex-col gap-4">
				{trips.map((trip) => (
					<div key={trip.id} className="flex flex-col gap-1">
						<Link href={`/trips/${trip.id}`} className="text-indigo-600">
							{trip.name}
						</Link>
						<span>{trip.destination}</span>
						<span>
							{format(trip.startDate, "d MMM")} -{" "}
							{format(trip.endDate, "d MMM yyyy")}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
