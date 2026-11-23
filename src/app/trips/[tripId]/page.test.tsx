import { render, screen, within } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { getTrip } from "@/lib/trips";

import TripPage from "./page";

vi.mock("@/lib/trips", () => ({
	getTrip: vi.fn(),
}));

it("renders trip details returned by getTrip", async () => {
	const tripId = "550e8400-e29b-41d4-a716-446655440000";

	vi.mocked(getTrip).mockResolvedValue({
		id: tripId,
		title: "Test Japan Trip",
		days: [
			{
				dayNumber: 1,
				activities: [
					{
						id: "550e8400-e29b-41d4-a716-446655440001",
						title: "Visit Shibuya",
						position: 0,
					},
					{
						id: "550e8400-e29b-41d4-a716-446655440002",
						title: "Visit Tokyo",
						position: 1,
					},
				],
			},
			{
				dayNumber: 2,
				activities: [
					{
						id: "550e8400-e29b-41d4-a716-446655440003",
						title: "Visit Kyoto",
						position: 0,
					},
				],
			},
		],
	});

	const page = await TripPage({
		params: Promise.resolve({ tripId }),
	});

	render(page);

	expect(screen.getByText("Test Japan Trip")).toBeInTheDocument();
	expect(screen.getByText("Day 1")).toBeInTheDocument();
	expect(screen.getByText("Day 2")).toBeInTheDocument();

	const day1 = screen.getByRole("region", { name: "Day 1" });
	expect(within(day1).getByText("Visit Shibuya")).toBeInTheDocument();
	expect(within(day1).getByText("Visit Tokyo")).toBeInTheDocument();

	const day1ActivityTitles = within(day1)
		.getAllByText(/^Visit /)
		.map((element) => element.textContent);

	expect(day1ActivityTitles).toEqual(["Visit Shibuya", "Visit Tokyo"]);

	const day2 = screen.getByRole("region", { name: "Day 2" });
	expect(within(day2).getByText("Visit Kyoto")).toBeInTheDocument();

	expect(getTrip).toHaveBeenCalledWith(tripId);
});
