import type { FC } from "react";
import type { DerivedKeyStat } from "../helpers/keyboard-heatmap";

type KeyboardHighlightsProps = {
	mostAccurate: DerivedKeyStat;
	mostUsed: DerivedKeyStat;
	needsPractice: DerivedKeyStat;
};

const KeyLabel = ({ k }: { k: string }) =>
	k === " " ? "SPACE" : k.toUpperCase();

export const KeyboardHighlights: FC<KeyboardHighlightsProps> = ({
	mostAccurate,
	mostUsed,
	needsPractice,
}) => {
	return (
		<div className="mt-8 flex flex-col gap-4 sm:flex-row">
			<div className="flex-1 border border-neutral-700 rounded-lg p-6">
				<h3 className="font-preset-4 font-semibold mb-2 text-emerald-400">
					Most Accurate
				</h3>
				<div className="font-preset-2 mb-1">
					{<KeyLabel k={mostAccurate.keyChar} />}
				</div>
				<div className="text-sm text-neutral-400">
					{mostAccurate.accuracy.toFixed(1)}% accuracy
				</div>
			</div>

			<div className="flex-1 border border-neutral-700 rounded-lg p-6">
				<h3 className="font-preset-4 font-semibold mb-2 text-blue-400">
					Most Used
				</h3>
				<div className="font-preset-2 mb-1">
					<KeyLabel k={mostUsed.keyChar} />
				</div>
				<div className="text-sm text-neutral-400">{mostUsed.total} presses</div>
			</div>

			<div className="flex-1 border border-neutral-700 rounded-lg p-6">
				<h3 className="font-preset-4 font-semibold mb-2 text-red-400">
					Needs Practice
				</h3>
				<div className="font-preset-2 mb-1">
					<KeyLabel k={needsPractice.keyChar} />
				</div>
				<div className="text-sm text-neutral-400">
					{needsPractice.accuracy.toFixed(1)}% accuracy
				</div>
			</div>
		</div>
	);
};
