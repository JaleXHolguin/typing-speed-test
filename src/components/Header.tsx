import { Link } from "react-router";
import LogoLarge from "../icons/LogoLarge";
import LogoSmall from "../icons/LogoSmall";
import Trophy from "../icons/Trophy";
import { useTypingStore } from "../store/typing.store";
import { styles } from "./Button";

const Header = () => {
	const personalBest = useTypingStore((state) => state.personalBest);
	return (
		<header className="wrapper mt-4 mb-8 sm:mt-8 sm:mb-10 xl:mb-15 flex items-center justify-between gap-x-8">
			<a
				href="/"
				aria-label="Typing Speed Test"
				className="rounded-lg custom-ring-focus focus-visible:ring-offset-4"
			>
				<LogoSmall className="sm:hidden h-8" />
				<LogoLarge className="max-sm:hidden h-10" />
			</a>

			<Link
				to="/history"
				className={styles({ variant: "secondary", className: "p-2" })}
			>
				<Trophy className="h-4.5" />
				<div className="font-preset-4 text-neutral-400">
					<span className="max-sm:hidden">Personal best: </span>
					<span className="sm:hidden">Best </span>
					<span className="text-white">{personalBest} WPM</span>
				</div>
			</Link>
		</header>
	);
};

export default Header;
