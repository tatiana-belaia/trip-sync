import {
	type ItineraryCreatedEvent,
	itineraryCreatedEventSchema,
} from "@/schemas/socket";

export interface CreateSocketOptions {
	onMessage: (event: ItineraryCreatedEvent) => void;
}

export function createSocket(url: string, options: CreateSocketOptions) {
	const socket = new WebSocket(url);

	socket.addEventListener("open", () => {
		console.log("WebSocket connected");
	});

	socket.addEventListener("message", (event) => {
		try {
			const json = JSON.parse(event.data);
			const result = itineraryCreatedEventSchema.safeParse(json);

			if (!result.success) {
				console.log("Invalid WebSocket message");
				return;
			}

			options.onMessage(result.data);
		} catch {
			console.log("Invalid WebSocket JSON");
		}
	});

	socket.addEventListener("close", () => {
		console.log("WebSocket disconnected");
	});

	return socket;
}
