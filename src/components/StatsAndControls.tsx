import Controls from "./Controls";
import Stats from "./Stats";

const StatsAndControls = () => {
	return (
		<section className="flex flex-wrap justify-between gap-5">
			<Stats />
			<Controls />
		</section>
	);
};

export default StatsAndControls;
