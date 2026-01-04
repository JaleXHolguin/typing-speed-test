import type { FC, SVGProps } from "react";

const TestCompleted: FC<SVGProps<SVGSVGElement>> = (props) => (
	<svg
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 128 128"
		aria-hidden="true"
		{...props}
	>
		<circle cx="64" cy="64" r="64" fill="#4dd67b" fillOpacity=".1" />
		<circle cx="64" cy="64" r="48" fill="#4dd67b" fillOpacity=".3" />
		<circle cx="64" cy="64" r="32" fill="#121212" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M77.5 58 61.9 73.6a2.5 2.5 0 0 1-3.6 0l-7.8-7.8a2.5 2.5 0 0 1 3.6-3.6l6 6L74 54.4a2.5 2.5 0 1 1 3.6 3.6M64 32a32 32 0 1 0 0 64 32 32 0 0 0 0-64"
			fill="#4dd67b"
		/>
	</svg>
);

export default TestCompleted;
