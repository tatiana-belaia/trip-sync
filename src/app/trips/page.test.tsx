// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { getTrips } from "@/lib/trips";

import TripsPage from "./page";

vi.mock("@/lib/trips", () => ({
	getTrips: vi.fn(),
}));

it("renders trips returned by getTrips", async () => {
	vi.mocked(getTrips).mockResolvedValue([
		{ id: "1", title: "Japan 2027" },
		{ id: "2", title: "Italy 2026" },
	]);

	const page = await TripsPage();
	render(page);

	expect(screen.getByRole("link", { name: "Japan 2027" })).toBeInTheDocument();

	expect(screen.getByRole("link", { name: "Italy 2026" })).toBeInTheDocument();
});
