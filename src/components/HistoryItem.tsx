import type { FC } from "react";
import {
	formatDate,
	getDifficultyColor,
	getModeLabel,
} from "../helpers/history";
import type { WpmEntry } from "../helpers/wpm-history";
import Calendar from "../icons/Calendar";

type Props = {
	entry: WpmEntry;
};

const HistoryItem: FC<Props> = ({ entry }) => {
	return (
		<div className="rounded-lg border border-neutral-700 bg-neutral-800 p-4 transition-colors hover:bg-neutral-700">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-4">
					<div className="flex size-12 items-center justify-center rounded-lg bg-green-500/10">
						<span className="font-preset-4 font-bold text-green-400">
							{entry.wpm}
						</span>
					</div>

					<div>
						<div className="flex items-center gap-2">
							<span className="font-semibold">{entry.wpm} WPM</span>
							<span className="text-gray-500">•</span>
							<span className="font-preset-5 text-neutral-400">
								{entry.accuracy}% accuracy
							</span>
						</div>

						<div className="mt-1 flex font-preset-5 items-center gap-2 text-sm">
							<span
								className={`capitalize ${getDifficultyColor(entry.difficulty)}`}
							>
								{entry.difficulty}
							</span>
							<span className="text-gray-500">•</span>
							<span className="text-neutral-300">
								{getModeLabel(entry.mode)}
							</span>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-2 font-preset-5 text-neutral-400">
					<Calendar className="size-4" />
					<span>{formatDate(entry.timestamp)}</span>
				</div>
			</div>
		</div>
	);
};

export default HistoryItem;
