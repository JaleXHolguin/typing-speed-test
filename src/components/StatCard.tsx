import type { FC, ReactNode } from "react";

interface StatCardProps {
	label: string;
	children: ReactNode;
}

const StatCard: FC<StatCardProps> = ({ label, children }) => {
	return (
		<div className="flex-1 p-4 md:p-6 rounded-lg border border-neutral-700 flex flex-col gap-3">
			<div className="font-preset-3 text-neutral-400">{label}</div>
			<div className="font-preset-2">{children}</div>
		</div>
	);
};

export default StatCard;
