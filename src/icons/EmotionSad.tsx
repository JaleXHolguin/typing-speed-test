import type { FC, SVGProps } from "react";

const EmotionSad: FC<SVGProps<SVGSVGElement>> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		{...props}
	>
		<path d="M12 2a10 10 0 0 1 9.78 12.12l-1.79-1.78L20 12a8 8 0 1 0-4.38 7.14 4 4 0 0 0 1.55 1.42A10 10 0 1 1 12 2m7 12.17 1.41 1.42a2 2 0 1 1-2.93.1l.1-.1zM12 15c1.47 0 2.79.63 3.7 1.64l-.95.86A8 8 0 0 0 12 17q-1.55.01-2.75.5l-.95-.86A5 5 0 0 1 12 15m-3.5-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3" />
	</svg>
);

export default EmotionSad;
