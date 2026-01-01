import LogoLarge from "../icons/LogoLarge";
import LogoSmall from "../icons/LogoSmall";
import Trophy from "../icons/Trophy";

const Header = () => {
	return (
		<header className="wrapper mt-4 mb-8 sm:mt-8 sm:mb-10 xl:mb-15 flex items-center justify-between gap-x-8">
			<a
				href="/"
				aria-label="Typing Speed Test"
				className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-900 focus-visible:ring-blue-500"
			>
				<LogoSmall className="sm:hidden h-8" aria-hidden />
				<LogoLarge className="max-sm:hidden h-10" aria-hidden />
			</a>

			<div className="flex items-center gap-x-2.5">
				<Trophy className="h-4.5" aria-hidden />
				<div className="text-preset-4 text-neutral-400">
					<span className="max-sm:hidden">Personal best: </span>
					<span className="sm:hidden">Best </span>
					<span className="text-white">78 WPM</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
