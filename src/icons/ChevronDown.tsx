import type { FC, SVGProps } from "react";

const ChevronDown: FC<SVGProps<SVGSVGElement>> = (props) => (
	<svg
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 10 10"
		{...props}
	>
		<path
			d="M4.73 7.88.12 3.25c-.16-.12-.16-.38 0-.53l.62-.6a.36.36 0 0 1 .53 0l3.75 3.71 3.7-3.71c.16-.16.41-.16.54 0l.62.6c.16.15.16.4 0 .53L5.27 7.88a.36.36 0 0 1-.54 0"
			fill="currentColor"
		/>
	</svg>
);

export default ChevronDown;
