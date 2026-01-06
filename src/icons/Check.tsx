import type { FC, SVGProps } from "react";

const Check: FC<SVGProps<SVGSVGElement>> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		viewBox="0 0 24 24"
		aria-hidden="true"
		{...props}
	>
		<path d="M20 6 9 17l-5-5" />
	</svg>
);

export default Check;
