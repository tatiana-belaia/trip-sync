import Link from "next/link";
import { connection } from "next/server";

import { getTrips } from "@/lib/trips";

export default async function TripsPage() {
	await connection();

	const trips = await getTrips();

	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<h1 className="mb-4">Your trips</h1>
			<div className="flex flex-col gap-4">
				{trips.length === 0 ? (
					<p>No trips yet.</p>
				) : (
					<div className="flex flex-col gap-1">
						{trips.map((trip) => (
							<Link
								key={trip.id}
								href={`/trips/${trip.id}`}
								className="text-indigo-600"
							>
								{trip.title}
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
