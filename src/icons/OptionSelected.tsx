import type { FC, SVGProps } from "react";

const OptionSelected: FC<SVGProps<SVGSVGElement>> = (props) => (
	<svg
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		{...props}
	>
		<path
			d="M8 2.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z"
			stroke="#4ca6ff"
			strokeWidth="5"
		/>
	</svg>
);

export default OptionSelected;
