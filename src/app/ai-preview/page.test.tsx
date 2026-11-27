import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { getItinerarySuggestions } from "@/lib/ai/itinerary-suggestions";

import AiPreviewPage from "./page";

vi.mock("next/server", () => ({
	connection: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/ai/itinerary-suggestions", () => ({
	getItinerarySuggestions: vi.fn(),
}));

it("renders itinerary suggestions returned by the API", async () => {
	vi.mocked(getItinerarySuggestions).mockResolvedValue({
		source: "mock",
		suggestion: {
			title: "Test Rome Trip",
			days: [
				{
					dayNumber: 1,
					date: null,
					activities: [
						{
							title: "Explore the Roman Forum",
							position: 2,
						},
						{
							title: "Visit the Colosseum",
							position: 1,
						},
					],
				},
			],
		},
	});

	const page = await AiPreviewPage();
	render(page);

	expect(screen.getByText("Test Rome Trip")).toBeInTheDocument();
	expect(screen.getByText("Day 1")).toBeInTheDocument();
	expect(screen.getByText(/Visit the Colosseum/)).toBeInTheDocument();
	expect(screen.getByText(/Source: mock/)).toBeInTheDocument();

	expect(getItinerarySuggestions).toHaveBeenCalledWith("Rome");

	const activities = screen.getAllByRole("listitem");

	expect(activities).toHaveLength(2);

	expect(activities[0]).toHaveTextContent("Visit the Colosseum");
	expect(activities[1]).toHaveTextContent("Explore the Roman Forum");
});

it("renders activities from a different suggestion", async () => {
	vi.mocked(getItinerarySuggestions).mockResolvedValue({
		source: "mock",
		suggestion: {
			title: "Lisbon — Explore",
			days: [
				{
					dayNumber: 1,
					date: null,
					activities: [
						{
							title: "Walk through Alfama",
							position: 1,
						},
						{
							title: "Visit Belém Tower",
							position: 2,
						},
					],
				},
			],
		},
	});

	const page = await AiPreviewPage();
	render(page);

	expect(
		screen.getByRole("heading", { name: "Lisbon — Explore" }),
	).toBeInTheDocument();

	expect(screen.getByText(/Walk through Alfama/)).toBeInTheDocument();

	expect(screen.getByText(/Visit Belém Tower/)).toBeInTheDocument();

	expect(screen.queryByText(/Visit the Colosseum/)).not.toBeInTheDocument();
});
