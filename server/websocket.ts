import { WebSocket, WebSocketServer } from "ws";

import { clientMessageSchema } from "@/schemas/socket";

const wss = new WebSocketServer({
	port: 3001,
});

const subscriptions = new Map<WebSocket, string>();

wss.on("connection", (socket) => {
	console.log("Client connected");

	socket.on("message", (data) => {
		try {
			const parsedMessage = JSON.parse(data.toString());
			const result = clientMessageSchema.safeParse(parsedMessage);

			if (!result.success) {
				console.log("Invalid client message");
				return;
			}

			const message = result.data;

			if (message.type === "trip.subscribe") {
				subscriptions.set(socket, message.tripId);
			}

			if (message.type === "itinerary.created") {
				wss.clients.forEach((client) => {
					if (
						client.readyState === WebSocket.OPEN &&
						client !== socket &&
						subscriptions.get(client)! === message.item.tripId
					) {
						client.send(JSON.stringify(message));
					}
				});
			}
		} catch {
			console.log("Invalid WebSocket JSON");
		}
	});

	socket.addEventListener("close", () => {
		subscriptions.delete(socket);
	});
});
