import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useId } from "react";

type DesktopButtonGroupProps<T extends string> = {
	title: string;
	value: T;
	onChange: (value: T) => void;
	labels: Record<T, string>;
	disabled?: boolean;
};

const DesktopButtonGroup = <T extends string>({
	title,
	value,
	onChange,
	labels,
	disabled,
}: DesktopButtonGroupProps<T>) => {
	const items = Object.entries(labels) as [T, string][];
	const titleId = useId();

	return (
		<div className="hidden sm:inline-flex items-center gap-x-3.5">
			<span id={titleId} className="text-preset-5 text-neutral-400">
				{title}
			</span>

			<ToggleGroup.Root
				type="single"
				value={value}
				onValueChange={(v) => v && onChange(v as T)}
				aria-labelledby={titleId}
				className="inline-flex items-center gap-x-1.5"
				disabled={disabled}
			>
				{items.map(([key, label]) => (
					<ToggleGroup.Item
						key={key}
						value={key}
						className="px-2.25 py-1.25 h-7.75 text-white text-preset-5 rounded-md border border-neutral-500 outline-none hover:border-blue-600 data-[state=on]:border-blue-600 data-[state=off]:focus-visible:border-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-blue-600 transition-colors not-disabled:cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
					>
						{label}
					</ToggleGroup.Item>
				))}
			</ToggleGroup.Root>
		</div>
	);
};

export default DesktopButtonGroup;
