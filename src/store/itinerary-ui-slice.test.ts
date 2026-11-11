import { expect, test } from "vitest";

import itineraryUiReducer, {
	setSelectedItemId,
	setViewMode,
} from "./itinerary-ui-slice";

test("returns the initial state", () => {
	const state = itineraryUiReducer(undefined, { type: "unknown" });

	expect(state).toEqual({
		viewMode: "list",
		selectedItemId: null,
	});
});

test("changes the view mode", () => {
	const calendarState = itineraryUiReducer(
		{ viewMode: "list", selectedItemId: null },
		setViewMode("calendar"),
	);

	expect(calendarState).toEqual({ viewMode: "calendar", selectedItemId: null });

	const listState = itineraryUiReducer(calendarState, setViewMode("list"));

	expect(listState).toEqual({ viewMode: "list", selectedItemId: null });
});

test("changes the selected item id", () => {
	const selectedState = itineraryUiReducer(
		{ viewMode: "list", selectedItemId: null },
		setSelectedItemId(100),
	);

	expect(selectedState).toEqual({ viewMode: "list", selectedItemId: 100 });

	const clearedState = itineraryUiReducer(
		selectedState,
		setSelectedItemId(null),
	);

	expect(clearedState).toEqual({ viewMode: "list", selectedItemId: null });
});
