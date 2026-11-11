import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import ItineraryForm from "./itinerary-form";

test("renders form fields and submit button", () => {
	render(<ItineraryForm onSubmit={async () => {}} isPending={false} />);

	expect(screen.getByLabelText("Title")).toBeInTheDocument();
	expect(screen.getByLabelText("Date")).toBeInTheDocument();
	expect(screen.getByLabelText("Location")).toBeInTheDocument();

	expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
});

test("shows validation errors and does not submit an empty form", async () => {
	const onSubmit = vi.fn();
	const user = userEvent.setup();

	render(<ItineraryForm onSubmit={onSubmit} isPending={false} />);

	await user.click(screen.getByRole("button", { name: "Add item" }));

	const titleError = await screen.findByText(
		"Title must be at least 2 characters",
	);
	expect(titleError).toBeInTheDocument();

	const dateError = screen.getByText("Date is required");
	expect(dateError).toBeInTheDocument();

	const locationError = screen.getByText(
		"Location must be at least 2 characters",
	);
	expect(locationError).toBeInTheDocument();

	expect(onSubmit).not.toHaveBeenCalled();
});

test("submits valid form values", async () => {
	const onSubmit = vi.fn().mockResolvedValue(undefined);
	const user = userEvent.setup();

	render(<ItineraryForm onSubmit={onSubmit} isPending={false} />);

	await user.type(screen.getByLabelText("Title"), "Colosseum");
	await user.type(screen.getByLabelText("Date"), "2026-09-15");
	await user.type(screen.getByLabelText("Location"), "Rome");

	await user.click(screen.getByRole("button", { name: "Add item" }));

	await waitFor(() => {
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});

	expect(onSubmit).toHaveBeenCalledWith({
		title: "Colosseum",
		date: "2026-09-15",
		location: "Rome",
	});
});

test("resets form after successful submission", async () => {
	const onSubmit = vi.fn().mockResolvedValue(undefined);
	const user = userEvent.setup();

	render(<ItineraryForm onSubmit={onSubmit} isPending={false} />);

	await user.type(screen.getByLabelText("Title"), "Colosseum");
	await user.type(screen.getByLabelText("Date"), "2026-09-15");
	await user.type(screen.getByLabelText("Location"), "Rome");

	await user.click(screen.getByRole("button", { name: "Add item" }));

	await waitFor(() => {
		expect(screen.getByLabelText("Title")).toHaveValue("");
		expect(screen.getByLabelText("Date")).toHaveValue("");
		expect(screen.getByLabelText("Location")).toHaveValue("");
	});
});

test("preserves the entered values when submission fails", async () => {
	const onSubmit = vi
		.fn()
		.mockRejectedValue(new Error("Failed to add itinerary item"));
	const user = userEvent.setup();

	render(<ItineraryForm onSubmit={onSubmit} isPending={false} />);

	await user.type(screen.getByLabelText("Title"), "Colosseum");
	await user.type(screen.getByLabelText("Date"), "2026-09-15");
	await user.type(screen.getByLabelText("Location"), "Rome");

	await user.click(screen.getByRole("button", { name: "Add item" }));

	await waitFor(() => {
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});

	expect(screen.getByLabelText("Title")).toHaveValue("Colosseum");
	expect(screen.getByLabelText("Date")).toHaveValue("2026-09-15");
	expect(screen.getByLabelText("Location")).toHaveValue("Rome");
});

test("disables the submit button while submission is pending", () => {
	render(<ItineraryForm onSubmit={async () => {}} isPending={true} />);

	expect(screen.getByRole("button", { name: "Adding..." })).toBeDisabled();
});
