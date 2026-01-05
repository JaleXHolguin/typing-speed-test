import { Link } from "react-router";
import Clock from "../icons/Clock";
import { styles } from "./Button";

const EmptyHistory = () => (
	<div className="rounded-lg border border-neutral-700 bg-neutral-800 p-12 text-center">
		<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-700">
			<Clock className="size-8" />
		</div>

		<h3 className="mb-2 font-preset-3-semibold">No history yet</h3>

		<p className="mb-6 font-preset-5 text-neutral-400">
			Complete your first typing test to see your results here
		</p>

		<Link to="/" className={styles({ variant: "default" })}>
			Start Typing Test
		</Link>
	</div>
);

export default EmptyHistory;
