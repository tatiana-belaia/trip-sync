import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from ".";

type ViewMode = "list" | "calendar";

interface ItineraryUiState {
	viewMode: ViewMode;
	selectedItemId: number | null;
}

const initialState: ItineraryUiState = {
	viewMode: "list",
	selectedItemId: null,
};

const itineraryUiSlice = createSlice({
	name: "itineraryUi",

	initialState,
	reducers: {
		setViewMode: (state, action: PayloadAction<ViewMode>) => {
			state.viewMode = action.payload;
		},
		setSelectedItemId: (state, action: PayloadAction<number | null>) => {
			state.selectedItemId = action.payload;
		},
	},
});

export const selectViewMode = (state: RootState) => {
	return state.itineraryUi.viewMode;
};

export const selectSelectedItemId = (state: RootState) => {
	return state.itineraryUi.selectedItemId;
};

export const selectHasSelectedItem = createSelector(
	[selectSelectedItemId],
	(selectedItemId) => selectedItemId !== null,
);

export const { setViewMode, setSelectedItemId } = itineraryUiSlice.actions;

export default itineraryUiSlice.reducer;
