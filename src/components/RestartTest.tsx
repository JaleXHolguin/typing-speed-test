import type { FC } from "react";
import Restart from "../icons/Restart";
import Button from "./Button";

interface RestartTestProps {
	onRestart?: () => void;
}

const RestartTest: FC<RestartTestProps> = ({ onRestart }) => {
	return (
		<section className="border-t border-neutral-700 flex items-center justify-center pt-6 lg:pt-8">
			<Button variant="secondary" onClick={onRestart}>
				Restart Test <Restart className="size-5" />
			</Button>
		</section>
	);
};

export default RestartTest;
