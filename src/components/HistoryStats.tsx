import type { FC, SVGProps } from "react";
import { cn } from "tailwind-variants";
import type { WpmEntry } from "../helpers/wpm-history";
import BarChart from "../icons/BarChart";
import CheckCircle from "../icons/CheckCircle";
import Clock from "../icons/Clock";
import Star from "../icons/Star";

type Stat = {
	label: string;
	value: number;
	icon: FC<SVGProps<SVGSVGElement>>;
	bg: string;
	fg: string;
};

type Props = {
	history: WpmEntry[];
};

const HistoryStats: FC<Props> = ({ history }) => {
	const stats: Stat[] = [
		{
			label: "Best WPM",
			value: Math.max(...history.map((e) => e.wpm)),
			icon: Star,
			bg: "bg-green-500/10",
			fg: "text-green-400",
		},
		{
			label: "Avg WPM",
			value: Math.round(
				history.reduce((s, e) => s + e.wpm, 0) / history.length,
			),
			icon: BarChart,
			bg: "bg-blue-500/10",
			fg: "text-blue-400",
		},
		{
			label: "Avg Accuracy",
			value: Math.round(
				history.reduce((s, e) => s + e.accuracy, 0) / history.length,
			),
			icon: CheckCircle,
			bg: "bg-purple-500/10",
			fg: "text-purple-400",
		},
		{
			label: "Total Tests",
			value: history.length,
			icon: Clock,
			bg: "bg-orange-500/10",
			fg: "text-orange-400",
		},
	];

	return (
		<div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{stats.map(({ label, value, icon: Icon, bg, fg }) => (
				<div
					key={label}
					className="flex items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-800 p-6"
				>
					<div
						className={cn(
							"flex h-10 w-10 items-center justify-center rounded-lg",
							bg,
						)}
					>
						<Icon className={cn("size-5", fg)} />
					</div>
					<div>
						<p className="font-preset-5 text-neutral-400">{label}</p>
						<p className={cn("font-preset-2", fg)}>{value}</p>
					</div>
				</div>
			))}
		</div>
	);
};
export default HistoryStats;
