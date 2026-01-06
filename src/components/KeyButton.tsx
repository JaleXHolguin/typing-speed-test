import type { ButtonHTMLAttributes, FC } from "react";
import { cn } from "tailwind-variants";
import { getKeyColor, getKeyTextColor } from "../helpers/keyboard-heatmap";
import type { KeyStats } from "../store/typing.store";

type KeyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	keyChar: string;
	stats: KeyStats;
};

const KeyButton: FC<KeyButtonProps> = ({
	keyChar,
	stats,
	className,
	...props
}) => {
	const isSpace = keyChar === " ";

	return (
		<button
			type="button"
			className={cn(
				"rounded-md md:rounded-lg border-2 flex items-center justify-center font-semibold text-base md:text-lg uppercase transition-all duration-200 hover:scale-110 hover:z-10 custom-ring-focus focus-visible:ring-white",
				isSpace
					? "w-64 sm:w-72 md:w-80 h-10 sm:h-11 md:h-12 mt-1 md:mt-2"
					: "size-10 sm:size-11 md:size-12",
				getKeyColor(keyChar, stats),
				getKeyTextColor(keyChar, stats),
				className,
			)}
			{...props}
		>
			{isSpace ? "SPACE" : keyChar}
		</button>
	);
};

export default KeyButton;
