import type { FC, ReactNode, SVGProps } from "react";
import { accuracyRange } from "../helpers/stats-ranges";
import Firework from "./Firework";
import StatCard from "./StatCard";

interface ResultsViewProps {
	icon: FC<SVGProps<SVGSVGElement>>;
	title: string;
	description: string;
	stats?: {
		wpm: number;
		accuracy: number;
		chars?: {
			correct: number;
			corrected: number;
			incorrect: number;
		};
	};
	showFirework?: boolean;
	children?: ReactNode;
}

const ResultsView: FC<ResultsViewProps> = ({
	icon: Icon,
	title,
	description,
	stats,
	showFirework = false,
	children,
}) => {
	return (
		<div className="flex flex-col items-center gap-y-8">
			<div className="text-center">
				<Icon className="mx-auto size-19.5 sm:size-32" />
				<h1 className="font-preset-1">{title}</h1>
				<p className="font-preset-3 text-neutral-400">{description}</p>
			</div>

			{stats && (
				<div className="w-full max-w-135 flex flex-col gap-4 sm:gap-5 sm:flex-row sm:py-5">
					<StatCard label="WPM:">{stats.wpm}</StatCard>

					<StatCard label="Accuracy:">
						<span
							className="stat-value transition-none"
							data-accuracy={accuracyRange(stats.accuracy, "finished")}
						>
							{stats.accuracy}%
						</span>
					</StatCard>

					{stats.chars && (
						<StatCard label="Characters:">
							<span className="text-green-500" title="Correct">
								{stats.chars.correct}
							</span>
							<span className="text-neutral-500">/</span>
							<span className="text-blue-600" title="Corrected">
								{stats.chars.corrected}
							</span>
							<span className="text-neutral-500">/</span>
							<span className="text-red-500" title="Incorrect">
								{stats.chars.incorrect}
							</span>
						</StatCard>
					)}
				</div>
			)}

			{children}

			{showFirework && <Firework />}
		</div>
	);
};

export default ResultsView;
