import BestWPM from "../icons/BestWPM";
import Restart from "../icons/Restart";
import TestCompleted from "../icons/TestCompleted";
import { useTypingStore } from "../store/typing.store";
import Button from "./Button";
import ResultsView from "./ResultsView";
import ShareButton from "./ShareButton";

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

	const correct = phrase
		? phrase.results.filter((r) => r === "correct").length
		: 0;
	const corrected = phrase
		? phrase.results.filter((r) => r === "corrected").length
		: 0;
	const incorrect = originalErrors.size;

	return (
		<ResultsView
			icon={Icon}
			title={title}
			description={description}
			stats={{ wpm, accuracy, chars: { correct, corrected, incorrect } }}
			showFirework={isNewPersonalBest}
		>
			<div className="w-full flex justify-center items-center gap-x-5">
				<Button variant="primary" onClick={reset}>
					Go Again
					<Restart className="size-5" />
				</Button>
				<ShareButton />
			</div>
		</ResultsView>
	);
};

export default ResultsBanner;
