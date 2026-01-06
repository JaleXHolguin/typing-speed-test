import { useTypingStore } from "../store/typing.store";
import ResultsBanner from "./ResultsBanner";
import StatsAndControls from "./StatsAndControls";
import TypingInput from "./TypingInput";

export const Main = () => {
	const status = useTypingStore((state) => state.status);

	return (
		<main className="wrapper">
			<title>Typing Speed Test</title>

			{status === "finished" ? (
				<ResultsBanner />
			) : (
				<>
					<StatsAndControls />
					<TypingInput />
				</>
			)}
		</main>
	);
};

export default Main;
