import Link from "next/link";

export default async function TripNotFound() {
	return (
		<div className="flex flex-col gap-1">
			<h1>Trip not found</h1>
			<span>The trip you're looking for doesn't exist.</span>
			<Link href="/trips">Back to trips</Link>
		</div>
	);
}
