import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { getTrip } from "@/lib/trips";

import TripTabs from "./trip-tabs";

interface TripLayoutProps {
	params: Promise<{
		tripId: string;
	}>;
	children: ReactNode;
}

export default async function TripLayout({
	children,
	params,
}: TripLayoutProps) {
	const { tripId } = await params;
	const trip = await getTrip(tripId);

	if (!trip) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-zinc-50 font-sans dark:bg-black pt-35 px-3">
			<div className="fixed top-0 left-0 z-10 px-3 py-4 w-full bg-white shadow-md">
				<div className="flex flex-col gap-1 mb-2">
					<h1>{trip.name}</h1>
					<span>{trip.destination}</span>
				</div>
				<TripTabs tripId={tripId} />
			</div>
			{children}
		</div>
	);
}
