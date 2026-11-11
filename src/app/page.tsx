import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<h1>TripSync</h1>
			<p>Plan trips together.</p>
			<Link href="/trips">[ Create a trip ]</Link>
		</div>
	);
}
