import "@testing-library/jest-dom/vitest";

import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import AiPreviewError from "./error";

it("displays an error and allows retrying", () => {
	const reset = vi.fn();

	render(<AiPreviewError error={new Error("API unavailable")} reset={reset} />);

	expect(screen.getByRole("alert")).toHaveTextContent(
		"Could not load itinerary suggestions",
	);

	fireEvent.click(screen.getByRole("button", { name: "Try again" }));

	expect(reset).toHaveBeenCalledOnce();
});
