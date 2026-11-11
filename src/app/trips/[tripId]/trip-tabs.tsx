"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { tripTabs } from "./constants";

interface TripTabsProps {
	tripId: string;
}

export default function TripTabs({ tripId }: TripTabsProps) {
	const pathname = usePathname();
	const basePath = `/trips/${tripId}`;

	return (
		<div className="flex items-center gap-3">
			{tripTabs.map((tab) => {
				const href = tab.path === "" ? basePath : `${basePath}/${tab.path}`;
				const isActive = pathname === href;
				const className = `hover:text-indigo-800${
					isActive ? " text-indigo-600 font-semibold" : " text-zinc-500"
				}`;

				return (
					<Link key={tab.name} href={href} className={className}>
						{tab.name}
					</Link>
				);
			})}
		</div>
	);
}
