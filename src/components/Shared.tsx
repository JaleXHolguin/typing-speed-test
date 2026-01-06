import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { cn } from "tailwind-variants";
import { phrases } from "../data/phrases";
import type { CharState } from "../helpers/get-random-phrase";
import { type DecodedShare, decodeSharePayload } from "../helpers/share-decode";
import EmotionSad from "../icons/EmotionSad";
import Trophy from "../icons/Trophy";
import ResultsView from "./ResultsView";

const charStates: { name: CharState; color: string }[] = [
	{ name: "correct", color: "bg-green-500" },
	{ name: "incorrect", color: "bg-red-500" },
	{ name: "corrected", color: "bg-blue-600" },
	{ name: "pending", color: "bg-neutral-400" },
];

const Shared = () => {
	const params = useParams();
	const [data, setData] = useState<DecodedShare | null>(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!params.data) {
			setError(true);
			return;
		}

		try {
			const decoded = decodeSharePayload(params.data);
			setData(decoded);
		} catch (err) {
			console.log(err);
			setError(true);
		}
	}, [params.data]);

	const phrase = Object.values(phrases)
		.flat()
		.find((p) => p.id === data?.id);

	if (error || !data || !phrase) {
		return (
			<main className="wrapper">
				<title>Shared result unavailable · Typing Test</title>
				<meta
					name="description"
					content="This shared typing test result could not be loaded. The link may be invalid or expired."
				/>
				<meta
					property="og:title"
					content="Shared result unavailable · Typing Test"
				/>
				<meta
					property="og:description"
					content="The shared typing test result is invalid or no longer available."
				/>

				<ResultsView
					icon={EmotionSad}
					title="Unable to load the shared result"
					description="The link is invalid or no longer available."
				/>
			</main>
		);
	}

	const { wpm, accuracy, results } = data;
	const isPerfect = accuracy === 100;
	const chars = phrase.text.split("");

	const title = isPerfect
		? `Perfect typing result · ${wpm} WPM`
		: `Shared typing result · ${wpm} WPM, ${accuracy}% accuracy`;

	const description = isPerfect
		? "Perfect accuracy — every character was typed correctly in this typing test."
		: "View the shared typing test result, including speed and accuracy.";

	return (
		<main className="wrapper">
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />

			<ResultsView
				icon={Trophy}
				title="Shared typing result"
				description={
					isPerfect
						? "Perfect accuracy — every character was typed correctly."
						: "These are the results that were shared with you."
				}
				stats={{ wpm, accuracy }}
				showFirework={isPerfect}
			>
				<h2 className="font-preset-2 text-center">Typing result breakdown</h2>
				<div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2">
					{charStates.map(({ name, color }) => {
						return (
							<div
								key={name}
								className="inline-flex items-center gap-x-2 font-preset-5"
							>
								<span className={cn("w-4 h-2.5 rounded-xs", color)} />
								{name}
							</div>
						);
					})}
				</div>
				<pre className="mb-8 whitespace-pre-wrap font-preset-1-regular text-center">
					{chars.map((char, i) => {
						const key = `char-${i}`;
						const state = results[i] ?? "pending";

						return (
							<span key={key} className="char" data-state={state}>
								{char}
							</span>
						);
					})}
				</pre>
			</ResultsView>
		</main>
	);
};

export default Shared;
