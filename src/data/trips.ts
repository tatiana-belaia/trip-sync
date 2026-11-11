export type Trip = {
	id: string;
	name: string;
	destination: string;
	startDate: string;
	endDate: string;
};

export const trips: Trip[] = [
	{
		id: "italy-2026",
		name: "Italy 2026",
		destination: "Rome, Italy",
		startDate: "2026-09-10",
		endDate: "2026-09-20",
	},
	{
		id: "japan-2027",
		name: "Japan 2027",
		destination: "Tokyo, Japan",
		startDate: "2027-04-05",
		endDate: "2027-04-18",
	},
];
