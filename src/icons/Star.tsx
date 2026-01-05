import type { FC, SVGProps } from "react";

const Star: FC<SVGProps<SVGSVGElement>> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		aria-hidden="true"
		{...props}
	>
		<path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16 2.3 6.9L21 12l-5.7 2.1L13 21l-2.3-6.9L5 12l5.7-2.1z" />
	</svg>
);

export default Star;
