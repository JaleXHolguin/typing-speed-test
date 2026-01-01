import {
	type Difficulty,
	type Mode,
	useSettingsStore,
} from "../store/settings.store";
import { useTypingStore } from "../store/typing.store";
import DesktopButtonGroup from "./DesktopButtonGroup";
import MobileRadioDropdown from "./MobileRadioDropdown";

const Controls = () => {
	const difficulty = useSettingsStore((s) => s.difficulty);
	const setDifficulty = useSettingsStore((s) => s.setDifficulty);
	const mode = useSettingsStore((s) => s.mode);
	const setMode = useSettingsStore((s) => s.setMode);
	const status = useTypingStore((s) => s.status);
	const disabled = status === "running";

	const difficultyLabels: Record<Difficulty, string> = {
		easy: "Easy",
		medium: "Medium",
		hard: "Hard",
	};

	const modeLabels: Record<Mode, string> = {
		timed: "Timed (60s)",
		passage: "Passage",
	};

	return (
		<div className="flex items-center gap-x-2.5 sm:gap-x-4 w-full md:w-auto">
			{/* Mobile */}
			<MobileRadioDropdown
				value={difficulty}
				onChange={setDifficulty}
				labels={difficultyLabels}
				disabled={disabled}
			/>

			<MobileRadioDropdown
				value={mode}
				onChange={setMode}
				labels={modeLabels}
				disabled={disabled}
			/>

			{/* Desktop */}
			<DesktopButtonGroup
				title="Difficulty:"
				value={difficulty}
				onChange={setDifficulty}
				labels={difficultyLabels}
				disabled={disabled}
			/>

			<div className="divider" data-vertical />

			<DesktopButtonGroup
				title="Mode:"
				value={mode}
				onChange={setMode}
				labels={modeLabels}
				disabled={disabled}
			/>
		</div>
	);
};

export default Controls;
