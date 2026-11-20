import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { getItinerarySuggestions } from "@/lib/ai/itinerary-suggestions";

import AiPreviewPage from "./page";

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
});
