import { Link } from "react-router";
import Clock from "../icons/Clock";
import Home from "../icons/Home";
import { styles } from "./Button";

const NotFound = () => {
	return (
		<div className="min-h-[calc(100vh-130px)] flex items-center justify-center p-8">
			<title>404 · Page Not Found</title>

			<div className="max-w-2xl w-full text-center">
				<h1 className="font-preset-404">
					<span className="text-green-500">4</span>
					<span className="text-neutral-400">0</span>
					<span className="text-green-500">4</span>
				</h1>

				<div className="mb-6 flex justify-center">
					<svg
						className="w-20 h-20 text-neutral-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>

				<h2 className="font-preset-2 text-white mb-4">Page Not Found</h2>
				<p className="text-neutral-400 font-preset-4 mb-8 max-w-md mx-auto">
					Looks like you've typed the wrong URL. The page you're looking for
					doesn't exist.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Link
						to="/"
						className={styles({
							variant: "primary",
							className: "font-preset-4",
						})}
					>
						<Home className="size-5" />
						Back to Home
					</Link>
					<Link
						to="/history"
						className={styles({
							variant: "secondary",
							className: "font-preset-4",
						})}
					>
						<Clock className="size-5" />
						View History
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
