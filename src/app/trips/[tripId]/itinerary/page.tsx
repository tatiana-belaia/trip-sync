"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

import { getItinerary, addItineraryItem } from "@/lib/itinerary";
import type { ItineraryItem } from "@/data/itinerary";
import ItineraryForm from "./itinerary-form";

export default function ItineraryPage() {
	const { tripId } = useParams<{ tripId: string }>();

	const { isLoading, isFetching, error, data } = useQuery({
		queryKey: ["itinerary", tripId],
		queryFn: () => getItinerary(tripId),
		staleTime: 30_000,
	});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: addItineraryItem,
		onSuccess: (newItem) => {
			queryClient.setQueryData(
				["itinerary", tripId],
				(oldItems: ItineraryItem[] | undefined) => [
					...(oldItems ?? []),
					newItem,
				],
			);
		},
	});

	if (isLoading) return <div>Loading itinerary...</div>;

	if (error) return <div>Error occurred...</div>;

	return (
		<div className="flex flex-col gap-4">
			{isFetching && <div>Updating itinerary...</div>}

			{data?.length === 0 ? (
				<h2>No itinerary items yet.</h2>
			) : (
				data?.map((item) => (
					<div key={item.id} className="flex flex-col gap-1">
						<h2>{item.title}</h2>
						<span>{item.location}</span>
						<span>{format(item.date, "d MMM yyyy")}</span>
					</div>
				))
			)}

			<ItineraryForm
				onSubmit={async (values) => {
					await mutation.mutateAsync({
						tripId,
						...values,
					});
				}}
				isPending={mutation.isPending}
			/>
			{mutation.isError && <p>{mutation.error.message}</p>}
		</div>
	);
}
