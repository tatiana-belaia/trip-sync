import { configureStore } from "@reduxjs/toolkit";

import itineraryUiReducer from "./itinerary-ui-slice";

export const makeStore = () =>
	configureStore({
		reducer: {
			itineraryUi: itineraryUiReducer,
		},
	});

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
