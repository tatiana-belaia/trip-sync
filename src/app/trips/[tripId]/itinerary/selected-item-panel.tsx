"use client";

import { format } from "date-fns";

import type { ItineraryItem } from "@/data/itinerary";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedItemId } from "@/store/itinerary-ui-slice";

interface SelectedItemPanelProps {
	items: ItineraryItem[];
}

export default function SelectedItemPanel({ items }: SelectedItemPanelProps) {
	const selectedItemId = useAppSelector(selectSelectedItemId);
	const selectedItem = items.find((item) => item.id === selectedItemId);

	if (!selectedItem) {
		return <p className="text-gray-700">No item selected</p>;
	}

	return (
		<div className="px-3 py-2 flex flex-col gap-1 border border-solid border-indigo-300 rounded-sm bg-gray-50">
			<h2>{selectedItem.title}</h2>
			<span>{selectedItem.location}</span>
			<span>{format(selectedItem.date, "d MMM yyyy")}</span>
		</div>
	);
}
