"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

import type { ItineraryItem } from "@/data/itinerary";
import { addItineraryItem, getItinerary } from "@/lib/itinerary";
import { createSocket } from "@/lib/socket";
import type {
	ItineraryCreatedEvent,
	TripSubscribeEvent,
} from "@/schemas/socket";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	selectSelectedItemId,
	selectViewMode,
	setSelectedItemId,
	setViewMode,
} from "@/store/itinerary-ui-slice";

import ItineraryForm from "./itinerary-form";
import SelectedItemPanel from "./selected-item-panel";

export default function ItineraryPage() {
	const { tripId } = useParams<{ tripId: string }>();
	const viewMode = useAppSelector(selectViewMode);
	const selectedItemId = useAppSelector(selectSelectedItemId);
	const dispatch = useAppDispatch();
	const socketRef = useRef<WebSocket | null>(null);

	const { isLoading, isFetching, error, data } = useQuery({
		queryKey: ["itinerary", tripId],
		queryFn: () => getItinerary(tripId),
		staleTime: 30_000,
	});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: addItineraryItem,
		onSuccess: (newItem) => {
			const event: ItineraryCreatedEvent = {
				type: "itinerary.created",
				item: newItem,
			};

			if (
				socketRef.current &&
				socketRef.current.readyState === WebSocket.OPEN
			) {
				socketRef.current.send(JSON.stringify(event));
			}

			queryClient.setQueryData(
				["itinerary", tripId],
				(oldItems: ItineraryItem[] | undefined) => [
					...(oldItems ?? []),
					newItem,
				],
			);
		},
	});

	const selectItem = (id: number) => {
		dispatch(setSelectedItemId(selectedItemId === id ? null : id));
	};

	useEffect(() => {
		const socket = createSocket("ws://localhost:3001", {
			onMessage: (event) => {
				queryClient.setQueryData(
					["itinerary", tripId],
					(oldItems: ItineraryItem[] | undefined) => {
						const items = oldItems ?? [];
						const itemExists = items.some((item) => item.id === event.item.id);

						if (itemExists) {
							return items;
						}

						return [...items, event.item];
					},
				);
			},
		});

		socketRef.current = socket;

		socket.addEventListener("open", () => {
			const event: TripSubscribeEvent = {
				type: "trip.subscribe",
				tripId,
			};

			socket.send(JSON.stringify(event));
		});

		return () => {
			socket.close();
			socketRef.current = null;
		};
	}, [queryClient, tripId]);

	if (isLoading) return <div>Loading itinerary...</div>;

	if (error) return <div>Error occurred...</div>;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-center gap-x-4 mb-5">
				<button
					type="button"
					className="px-2 py-3 text-gray-900 border border-solid border-gray-500"
					onClick={() => dispatch(setViewMode("list"))}
				>
					List
				</button>

				<button
					type="button"
					className="px-2 py-3 text-gray-900 border border-solid border-gray-500"
					onClick={() => dispatch(setViewMode("calendar"))}
				>
					Calendar
				</button>
			</div>
			<p className="my-5">View: {viewMode}</p>

			{isFetching && <div>Updating itinerary...</div>}

			{data?.length === 0 ? (
				<h2>No itinerary items yet.</h2>
			) : viewMode === "list" ? (
				data?.map((item) => (
					<button
						key={item.id}
						type="button"
						onClick={() => selectItem(item.id)}
						className="px-3 py-2 flex flex-col gap-1 border border-solid border-gray-300 rounded-sm bg-white hover:bg-gray-100 cursor-pointer"
					>
						<h2>{item.title}</h2>
						<span>{item.location}</span>
						<span>{format(item.date, "d MMM yyyy")}</span>
						{item.id === selectedItemId && (
							<span className="text-indigo-500">Selected</span>
						)}
					</button>
				))
			) : (
				<p className="my-5">Calendar view coming soon</p>
			)}

			<SelectedItemPanel items={data ?? []} />

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
