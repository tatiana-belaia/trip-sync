"use client";
"use no memo";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	type ItineraryItemInput,
	itineraryItemInputSchema,
} from "@/schemas/itinerary";

interface ItineraryFormProps {
	onSubmit: (values: ItineraryItemInput) => Promise<void>;
	isPending: boolean;
}

export default function ItineraryForm({
	onSubmit,
	isPending,
}: ItineraryFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ItineraryItemInput>({
		resolver: zodResolver(itineraryItemInputSchema),
		defaultValues: {
			title: "",
			date: "",
			location: "",
		},
	});

	const submitForm = async (values: ItineraryItemInput): Promise<void> => {
		try {
			await onSubmit(values);
		} catch {
			return;
		}

		reset();
	};

	return (
		<form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
			<div className="flex gap-x-4">
				<label htmlFor="title">Title</label>
				<div className="flex flex-col gap-1">
					<input
						id="title"
						{...register("title")}
						className="border border-solid border-gray-900"
					/>
					{errors.title && (
						<span className="text-xs text-red-500">{errors.title.message}</span>
					)}
				</div>
			</div>
			<div className="flex gap-x-4">
				<label htmlFor="date">Date</label>
				<div className="flex flex-col gap-1">
					<input
						id="date"
						{...register("date")}
						type="date"
						className="border border-solid border-gray-900"
					/>
					{errors.date && (
						<span className="text-xs text-red-500">{errors.date.message}</span>
					)}
				</div>
			</div>
			<div className="flex gap-x-4">
				<label htmlFor="location">Location</label>
				<div className="flex flex-col gap-1">
					<input
						id="location"
						{...register("location")}
						className="border border-solid border-gray-900"
					/>
					{errors.location && (
						<span className="text-xs text-red-500">
							{errors.location.message}
						</span>
					)}
				</div>
			</div>
			<button
				className="p-2 my-4 disabled:opacity-40 disabled:cursor-not-allowed border border-solid border-gray-900 rounded-md bg-gray-100 hover:bg-gray-300 hover:cursor-pointer"
				type="submit"
				disabled={isPending}
			>
				{isPending ? "Adding..." : "Add item"}
			</button>
		</form>
	);
}
