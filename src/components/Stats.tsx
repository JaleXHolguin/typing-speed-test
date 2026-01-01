import { formatTime, getDisplayTime } from "../helpers/display-time";
import { accuracyRange, timeRange } from "../helpers/stats-ranges";
import { useSettingsStore } from "../store/settings.store";
import { useTypingStore } from "../store/typing.store";

const Stats = () => {
	const { status, wpm, accuracy, timeLeft, startTime, now } = useTypingStore();
	const { mode, timeLimit } = useSettingsStore();

	const elapsed =
		startTime && status !== "idle" ? Math.floor((now - startTime) / 1000) : 0;

	const timeToShow = getDisplayTime(mode, status, timeLimit, timeLeft, elapsed);

	return (
		<div className="flex items-center gap-x-6 w-full md:w-auto">
			{/* WPM */}
			<div className="max-sm:flex-1 flex flex-col items-center gap-y-2 sm:flex-row gap-x-3">
				<span className="text-neutral-400 text-preset-3">WPM:</span>
				<span className="text-preset-2 stat-value">
					{status === "idle" ? "0" : wpm}
				</span>
			</div>

			<div className="divider" data-vertical />

			{/* Accuracy */}
			<div className="max-sm:flex-1 flex flex-col items-center gap-y-2 sm:flex-row gap-x-3">
				<span className="text-neutral-400 text-preset-3">Accuracy:</span>
				<span
					className="text-preset-2 stat-value"
					data-accuracy={accuracyRange(accuracy, status)}
				>
					{status === "idle" ? "0%" : `${accuracy}%`}
				</span>
			</div>

			<div className="divider" data-vertical />

			{/* Time */}
			<div className="max-sm:flex-1 flex flex-col items-center gap-y-2 sm:flex-row gap-x-3">
				<span className="text-neutral-400 text-preset-3">Time:</span>
				<span
					className="text-preset-2 stat-value"
					data-time={timeRange(
						mode,
						status === "idle" ? null : timeLeft,
						timeLimit,
						status,
					)}
				>
					{formatTime(timeToShow)}
				</span>
			</div>
		</div>
	);
};

export default Stats;
