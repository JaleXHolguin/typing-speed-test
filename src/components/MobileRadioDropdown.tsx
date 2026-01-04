import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ChevronDown from "../icons/ChevronDown";
import OptionNotSelected from "../icons/OptionNotSelected";
import OptionSelected from "../icons/OptionSelected";

type MobileRadioDropdownProps<T extends string> = {
	value: T;
	onChange: (value: T) => void;
	labels: Record<T, string>;
	disabled?: boolean;
};

const MobileRadioDropdown = <T extends string>({
	value,
	onChange,
	labels,
	disabled,
}: MobileRadioDropdownProps<T>) => {
	const items = Object.entries(labels) as [T, string][];

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				className="sm:hidden max-sm:flex-1 h-7.75 inline-flex items-center justify-center gap-x-2.5 rounded-lg font-preset-5 border border-neutral-500 outline-none hover:border-blue-600 hover:text-blue-600 focus-visible:border-blue-600 focus-visible:text-blue-600 transition-colors not-disabled:cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
				disabled={disabled}
			>
				{labels[value]}
				<ChevronDown className="w-2.5" />
			</DropdownMenu.Trigger>

			<DropdownMenu.Content
				align="start"
				sideOffset={7}
				className="bg-neutral-800 rounded-lg overflow-hidden w-(--radix-popper-anchor-width) z-100"
			>
				<DropdownMenu.RadioGroup
					value={value}
					onValueChange={(v) => onChange(v as T)}
				>
					{items.map(([key, label]) => (
						<DropdownMenu.RadioItem
							key={key}
							value={key}
							className="group font-preset-5 h-9.25 inline-flex items-center gap-x-3 p-2.5 hover:bg-neutral-700 focus:bg-neutral-700 outline-none w-full"
						>
							<OptionNotSelected className="size-4 shrink-0 group-data-[state=checked]:hidden" />
							<DropdownMenu.ItemIndicator>
								<OptionSelected className="size-4 shrink-0" />
							</DropdownMenu.ItemIndicator>
							{label}
						</DropdownMenu.RadioItem>
					))}
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};

export default MobileRadioDropdown;
