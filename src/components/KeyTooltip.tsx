import * as Tooltip from "@radix-ui/react-tooltip";
import type { FC } from "react";

type KeyTooltipProps = {
	keyChar: string;
	total: number;
	errors: number;
};

const KeyTooltip: FC<KeyTooltipProps> = ({ keyChar, total, errors }) => {
	const accuracy = ((total - errors) / total) * 100;

	return (
		<Tooltip.Portal>
			<Tooltip.Content
				side="top"
				sideOffset={8}
				className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg text-xs text-white"
			>
				<div className="text-zinc-400 mb-1">Key: {keyChar}</div>
				<div className="font-semibold">Accuracy: {accuracy.toFixed(1)}%</div>
				<div className="text-zinc-400 mt-1">
					Total: {total} | Errors: {errors}
				</div>
				<Tooltip.Arrow className="fill-zinc-700" />
			</Tooltip.Content>
		</Tooltip.Portal>
	);
};

export default KeyTooltip;
