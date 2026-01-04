import type { ComponentProps, FC } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
	base: "p-4 rounded-xl font-preset-3-semibold inline-flex items-center gap-x-2.5 custom-ring-focus transition-colors hover:cursor-pointer",
	variants: {
		variant: {
			default: "bg-blue-600 hover:bg-blue-400 text-white",
			primary: "bg-white hover:bg-white/80 text-neutral-900",
			secondary: "bg-neutral-800 hover:bg-neutral-600 text-white",
		},
	},
});

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof styles>;

const Button: FC<ButtonProps> = ({
	type = "button",
	className,
	variant = "default",
	...props
}) => {
	return (
		<button type={type} className={styles({ variant, className })} {...props} />
	);
};

export default Button;
