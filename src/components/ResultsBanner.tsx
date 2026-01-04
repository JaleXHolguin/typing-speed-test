import { accuracyRange } from "../helpers/stats-ranges";
import BestWPM from "../icons/BestWPM";
import Restart from "../icons/Restart";
import TestCompleted from "../icons/TestCompleted";
import { useTypingStore } from "../store/typing.store";
import Button from "./Button";
import Firework from "./Firework";
import ShareButton from "./ShareButton";
import StatCard from "./StatCard";

const ResultsBanner = () => {
	const {
		isFirstTest,
		isNewPersonalBest,
		wpm,
		accuracy,
		phrase,
		originalErrors,
		reset,
	} = useTypingStore();

	const Icon = isNewPersonalBest ? BestWPM : TestCompleted;
	const title = isFirstTest
		? "Baseline Established!"
		: isNewPersonalBest
			? "High Score Smashed!"
			: "Test Complete!";
	const description = isFirstTest
		? "You've set the bar. Now the real challenge begins—time to beat it."
		: isNewPersonalBest
			? "You're getting faster. That was incredible typing."
			: "Solid run. Keep pushing to beat your high score.";

	const correctChars = phrase
		? phrase.results.filter((r) => r === "correct").length
		: 0;
	const correctedChars = phrase
		? phrase.results.filter((r) => r === "corrected").length
		: 0;
	const incorrectChars = originalErrors.size;

	return (
		<div className="flex flex-col items-center gap-y-8">
			<div className="text-center">
				<Icon
					className={`m-auto ${
						isNewPersonalBest ? "size-16 sm:20" : "size-19.5 sm:size-32"
					}`}
				/>

				<h1 className="font-preset-1">{title}</h1>
				<p className="font-preset-3 text-neutral-400">{description}</p>
			</div>

			<div className="w-full max-w-135 flex flex-col gap-4 sm:gap-5 sm:flex-row sm:py-5">
				<StatCard label="WPM:">{wpm}</StatCard>
				<StatCard label="Accuracy:">
					<span
						className="stat-value transition-none"
						data-accuracy={accuracyRange(accuracy, "finished")}
					>
						{accuracy}%
					</span>
				</StatCard>
				<StatCard label="Characters:">
					<span className="text-green-500" title="Correct">
						{correctChars}
					</span>
					<span className="text-neutral-500">/</span>
					<span className="text-blue-600" title="Corrected">
						{correctedChars}
					</span>
					<span className="text-neutral-500">/</span>
					<span className="text-red-500" title="Incorrect">
						{incorrectChars}
					</span>
				</StatCard>
			</div>

			<div className="w-full flex justify-center items-center gap-x-5">
				<Button variant="primary" onClick={reset}>
					Go Again
					<Restart className="size-5" />
				</Button>
				<ShareButton />
			</div>

			{isNewPersonalBest && <Firework />}
		</div>
	);
};

export default ResultsBanner;
