import type { FC, SVGProps } from "react";

const OptionNotSelected: FC<SVGProps<SVGSVGElement>> = (props) => (
	<svg
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		{...props}
	>
		<path d="M8 .5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Z" stroke="#fff" />
	</svg>
);

export default OptionNotSelected;
