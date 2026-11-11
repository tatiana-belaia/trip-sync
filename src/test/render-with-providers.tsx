import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { Provider } from "react-redux";

import { makeStore } from "@/store";

export function renderWithProviders(ui: ReactElement) {
	const store = makeStore();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	return render(
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
		</Provider>,
	);
}
