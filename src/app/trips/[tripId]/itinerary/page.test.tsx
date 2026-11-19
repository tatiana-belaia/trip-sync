import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, http, HttpResponse } from "msw";
import { beforeEach, expect, test, vi } from "vitest";

import { createSocket } from "@/lib/socket";
import { itineraryItemInputSchema } from "@/schemas/itinerary";
import type { ItineraryCreatedEvent } from "@/schemas/socket";
import { server } from "@/test/mocks/server";
import { renderWithProviders } from "@/test/render-with-providers";

import ItineraryPage from "./page";

vi.mock("@/lib/socket", () => ({
	createSocket: vi.fn(() => ({
		addEventListener: vi.fn(),
		close: vi.fn(),
		send: vi.fn(),
		readyState: WebSocket.OPEN,
	})),
}));

vi.mock("next/navigation", () => ({
	useParams: () => ({
		tripId: "italy-2026",
	}),
}));

beforeEach(() => {
	vi.clearAllMocks();
});

const itinerary = [
	{
		id: 100,
		tripId: "italy-2026",
		title: "Colosseum",
		date: "2026-09-15",
		location: "Rome",
	},
];

async function fillAndSubmitItineraryForm() {
	const user = userEvent.setup();

	await user.type(screen.getByLabelText("Title"), "Colosseum");
	await user.type(screen.getByLabelText("Date"), "2026-09-15");
	await user.type(screen.getByLabelText("Location"), "Rome");

	await user.click(screen.getByRole("button", { name: "Add item" }));
}

test("renders itinerary items after loading", async () => {
	server.use(
		http.get(`/api/trips/italy-2026/itinerary`, () => {
			return HttpResponse.json(itinerary);
		}),
	);

	renderWithProviders(<ItineraryPage />);

	expect(screen.getByText("Loading itinerary...")).toBeInTheDocument();
	expect(await screen.findByText("Colosseum")).toBeInTheDocument();
	expect(screen.queryByText("Loading itinerary...")).not.toBeInTheDocument();
});

test("shows an error when loading itinerary fails", async () => {
	server.use(
		http.get(`/api/trips/italy-2026/itinerary`, () => {
			return HttpResponse.json(
				{ error: "Internal server error" },
				{ status: 500 },
			);
		}),
	);

	renderWithProviders(<ItineraryPage />);

	expect(await screen.findByText("Error occurred...")).toBeInTheDocument();
});

test("shows an empty state when itinerary has no items", async () => {
	server.use(
		http.get(`/api/trips/italy-2026/itinerary`, () => {
			return HttpResponse.json([]);
		}),
	);

	renderWithProviders(<ItineraryPage />);

	expect(
		await screen.findByText("No itinerary items yet."),
	).toBeInTheDocument();
});

test("adds a new itinerary item", async () => {

	renderWithProviders(<ItineraryPage />);

	expect(
		await screen.findByText("No itinerary items yet."),
	).toBeInTheDocument();

	await fillAndSubmitItineraryForm();

	expect(await screen.findByText("Colosseum")).toBeInTheDocument();
});

test("shows an error and preserves form values when adding an item fails", async () => {
	server.use(
		http.get("/api/trips/italy-2026/itinerary", () => {
			return HttpResponse.json([]);
		}),

		http.post("/api/trips/italy-2026/itinerary", () => {
			return HttpResponse.json(
				{ error: "Failed to add itinerary item" },
				{ status: 500 },
			);
		}),
	);

	renderWithProviders(<ItineraryPage />);

	await screen.findByText("No itinerary items yet.");

	await fillAndSubmitItineraryForm();

	expect(await screen.findByText("Something went wrong")).toBeInTheDocument();

	expect(screen.getByLabelText("Title")).toHaveValue("Colosseum");
	expect(screen.getByLabelText("Date")).toHaveValue("2026-09-15");
	expect(screen.getByLabelText("Location")).toHaveValue("Rome");
});

test("disables the submit button while adding an item", async () => {
	server.use(
		http.get("/api/trips/italy-2026/itinerary", () => {
			return HttpResponse.json([]);
		}),

		http.post("/api/trips/italy-2026/itinerary", async ({ request }) => {
			await delay(100);

			const body = await request.json();
			const input = itineraryItemInputSchema.parse(body);

			return HttpResponse.json(
				{
					id: 101,
					tripId: "italy-2026",
					...input,
				},
				{ status: 201 },
			);
		}),
	);

	renderWithProviders(<ItineraryPage />);

	await screen.findByText("No itinerary items yet.");

	await fillAndSubmitItineraryForm();

	expect(
		await screen.findByRole("button", { name: "Adding..." }),
	).toBeDisabled();

	expect(await screen.findByRole("button", { name: "Add item" })).toBeEnabled();
});

test("does not add duplicate itinerary items from WebSocket events", async () => {
	server.use(
		http.get(`/api/trips/italy-2026/itinerary`, () => {
			return HttpResponse.json(itinerary);
		}),
	);

	renderWithProviders(<ItineraryPage />);

	await screen.findByText("Colosseum");

	expect(createSocket).toHaveBeenCalled();

	const [, options] = vi.mocked(createSocket).mock.calls[0];

	const event: ItineraryCreatedEvent = {
		type: "itinerary.created",
		item: {
			id: 999,
			tripId: "italy-2026",
			title: "Trevi Fountain",
			date: "2026-09-15",
			location: "Rome",
		},
	};

	act(() => {
		options.onMessage(event);
	});

	expect(await screen.findAllByText("Trevi Fountain")).toHaveLength(1);

	act(() => {
		options.onMessage(event);
	});

	await waitFor(() => {
		expect(screen.getAllByText("Trevi Fountain")).toHaveLength(1);
	});
});
