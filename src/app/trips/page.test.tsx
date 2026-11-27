// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { getTrips } from "@/lib/trips";

import TripsPage from "./page";

vi.mock("next/server", () => ({
	connection: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/trips", () => ({
	getTrips: vi.fn(),
}));

it("renders trips returned by getTrips", async () => {
	vi.mocked(getTrips).mockResolvedValue([
		{ id: "550e8400-e29b-41d4-a716-446655440000", title: "Japan 2027" },
		{ id: "550e8400-e29b-41d4-a716-446655440001", title: "Italy 2026" },
	]);

	const page = await TripsPage();
	render(page);

	expect(screen.getByRole("link", { name: "Japan 2027" })).toBeInTheDocument();

	expect(screen.getByRole("link", { name: "Japan 2027" })).toHaveAttribute(
		"href",
		"/trips/550e8400-e29b-41d4-a716-446655440000",
	);

	expect(screen.getByRole("link", { name: "Italy 2026" })).toBeInTheDocument();

	expect(screen.getByRole("link", { name: "Italy 2026" })).toHaveAttribute(
		"href",
		"/trips/550e8400-e29b-41d4-a716-446655440001",
	);
});

it("displays an empty state when no trips exist", async () => {
	vi.mocked(getTrips).mockResolvedValue([]);

	const page = await TripsPage();
	render(page);

	expect(screen.getByText("No trips yet.")).toBeInTheDocument();
	expect(screen.queryAllByRole("link")).toHaveLength(0);

	expect(getTrips).toHaveBeenCalled();
});
