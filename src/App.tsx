import Header from "./components/Header";
import StatsAndControls from "./components/StatsAndControls";
import { useTypingTimer } from "./hooks/use-typing-timer";

function App() {
	const { startTest } = useTypingTimer();
	return (
		<>
			<Header />
			<main className="wrapper">
				<StatsAndControls />

				<button type="button" onClick={startTest}>
					Start
				</button>
			</main>
		</>
	);
}

export default App;
