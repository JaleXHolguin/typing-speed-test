import type { FC, SVGProps } from "react";

const Share: FC<SVGProps<SVGSVGElement>> = (props) => (
	<svg
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		aria-hidden="true"
		{...props}
	>
		<path
			d="M11.707 14.853H9.366a10.9 10.9 0 0 0-5.45 1.447 10.27 10.27 0 0 0-3.88 3.929L0 19.324c0-2.965 1.233-5.807 3.429-7.903s5.173-3.274 8.278-3.274V2L24 11.5 11.707 21zm-2.341-2.235h4.683v3.688l6.228-4.806-6.228-4.806v3.688h-2.342a9.7 9.7 0 0 0-3.9.81 9.3 9.3 0 0 0-3.194 2.286 13.5 13.5 0 0 1 4.753-.86"
			fill="currentColor"
		/>
	</svg>
);

export default Share;
