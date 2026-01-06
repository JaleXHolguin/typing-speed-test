import * as Tooltip from "@radix-ui/react-tooltip";
import type { FC } from "react";
import {
	deriveKeyStats,
	getKeyboardHighlights,
} from "../helpers/keyboard-heatmap";
import type { KeyStats } from "../store/typing.store";
import KeyButton from "./KeyButton";
import { KeyboardHighlights } from "./KeyboardHighlights";
import KeyTooltip from "./KeyTooltip";

type KeyboardHeatmapProps = {
	keyStats: KeyStats;
};

const KEYBOARD_LAYOUT = [
	["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
	["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
	[" "],
];

const KeyboardHeatmap: FC<KeyboardHeatmapProps> = ({ keyStats }) => {
	const derivedStats = deriveKeyStats(keyStats);
	const highlights = getKeyboardHighlights(derivedStats);

	return (
		<section className="max-w-182.5 w-full sm:pt-5 sm:pb-8">
			{/* ───── Mobile Placeholder ───── */}
			<div className="sm:hidden flex items-center justify-center p-8 rounded-lg border border-neutral-700">
				<div className="text-center text-neutral-400">
					<svg
						className="size-16 mx-auto mb-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
					<h3 className="font-preset-4 font-semibold text-white mb-2">
						Keyboard Stats
					</h3>
					<p className="font-preset-5 text-neutral-400">
						Please view on a larger screen to see the interactive keyboard
						heatmap
					</p>
				</div>
			</div>

			{/* ───── Keyboard ───── */}
			<div className="hidden sm:flex flex-col items-center justify-center gap-2 p-4 md:p-6 lg:p-8 rounded-lg border border-neutral-700">
				<h2 className="font-preset-4 font-bold text-white mt-8 mb-3 md:mt-0">
					Keyboard heatmap
				</h2>
				<div className="flex flex-col gap-2 scale-75 md:scale-90 lg:scale-100 origin-top">
					<Tooltip.Provider>
						{KEYBOARD_LAYOUT.map((row) => (
							<div key={row.join("")} className="flex gap-2 justify-center">
								{row.map((keyChar) => {
									const stats = keyStats[keyChar];
									const hasStats = stats?.total > 0;

									const button = (
										<KeyButton
											key={keyChar}
											keyChar={keyChar}
											stats={keyStats}
										/>
									);

									if (!hasStats) return button;

									return (
										<Tooltip.Root key={keyChar} delayDuration={0}>
											<Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
											<KeyTooltip
												keyChar={keyChar}
												total={stats.total}
												errors={stats.errors}
											/>
										</Tooltip.Root>
									);
								})}
							</div>
						))}
					</Tooltip.Provider>
				</div>
			</div>

			{/* ───── Highlights ───── */}
			{highlights && (
				<KeyboardHighlights
					mostAccurate={highlights.mostAccurate}
					mostUsed={highlights.mostUsed}
					needsPractice={highlights.needsPractice}
				/>
			)}
		</section>
	);
};

export default KeyboardHeatmap;
