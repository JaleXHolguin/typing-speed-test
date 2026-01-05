import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getWpmHistory, type WpmEntry } from "../helpers/wpm-history";
import { styles } from "./Button";
import EmptyHistory from "./EmptyHistory";
import HistoryItem from "./HistoryItem";
import HistoryStats from "./HistoryStats";

const History = () => {
	const [history, setHistory] = useState<WpmEntry[]>([]);

	useEffect(() => {
		const data = getWpmHistory().sort((a, b) => b.timestamp - a.timestamp);
		setHistory(data);
	}, []);

	return (
		<main className="wrapper">
			<div className="mb-8 flex items-center justify-between">
				<h1 className="font-preset-2">Typing History</h1>

				<Link
					to="/"
					className={styles({
						variant: "secondary",
						className: "px-4 py-2 font-preset-5",
					})}
				>
					Back to Test
				</Link>
			</div>

			{history.length > 0 ? (
				<>
					<HistoryStats history={history} />

					<div className="mb-8 space-y-3">
						<h2 className="font-preset-3-semibold">Recent Tests</h2>

						<div className="space-y-2">
							{history.map((entry) => (
								<HistoryItem key={entry.id} entry={entry} />
							))}
						</div>
					</div>
				</>
			) : (
				<EmptyHistory />
			)}
		</main>
	);
};

export default History;
