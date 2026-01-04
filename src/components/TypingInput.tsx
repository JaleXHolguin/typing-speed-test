import { type KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { getRandomPhrase } from "../helpers/get-random-phrase";
import { useTypingTimer } from "../hooks/use-typing-timer";
import { useSettingsStore } from "../store/settings.store";
import { type Phrase, useTypingStore } from "../store/typing.store";
import RestartTest from "./RestartTest";

const TypingInput = () => {
	const [focus, setFocus] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const finishedRef = useRef(false);

	const {
		status,
		phrase,
		index,
		startTimed,
		startPassage,
		registerKeystroke,
		finish,
		reset,
	} = useTypingStore();

	const { difficulty, mode, timeLimit } = useSettingsStore();

	useTypingTimer();

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (status !== "running") return;

		if (e.key.startsWith("Arrow")) {
			e.preventDefault();
			return;
		}

		if (e.key === "Backspace") {
			e.preventDefault();
			if (index === 0) return;

			const prevIndex = index - 1;
			if (!phrase) return;

			const results = [...phrase.results];
			results[prevIndex] = "pending";
			useTypingStore.setState({
				phrase: { ...phrase, results },
				index: prevIndex,
			});

			return;
		}

		if (e.key.length !== 1) return;

		e.preventDefault();

		if (index >= phrase.chars.length) return;

		const char = e.key;
		const expectedChar = phrase.chars[index];
		const isCorrect = char === expectedChar;

		registerKeystroke(char, isCorrect);

		if (!finishedRef.current && index + 1 >= phrase.chars.length) {
			finishedRef.current = true;
			finish();
		}
	};

	const startTypingTest = () => {
		if (mode === "timed") {
			startTimed(timeLimit);
		} else {
			startPassage();
		}

		finishedRef.current = false;
		inputRef.current?.focus();
	};

	useEffect(() => {
		reset();
		const newPhrase: Phrase = getRandomPhrase(difficulty);
		useTypingStore.setState({ phrase: newPhrase });
		finishedRef.current = false;
	}, [difficulty, reset]);

	useEffect(() => {
		if (status === "running") {
			inputRef.current?.focus();
		}
	}, [status]);

	return (
		<>
			<div className="mt-8 mb-8 md:mb-10 lg:mb-8 w-full relative select-none">
				<pre className="m-0 whitespace-pre-wrap font-preset-1-regular">
					{phrase.chars.map((char, i) => {
						const isCaret = i === index;
						const key = `char-${i}`;
						return (
							<span
								key={key}
								className="relative char"
								data-state={phrase.results[i]}
							>
								{char}
								{isCaret && focus && status === "running" && (
									<span className="caret" />
								)}
							</span>
						);
					})}
				</pre>

				<input
					ref={inputRef}
					type="text"
					className="absolute inset-0 opacity-0 outline-none z-10"
					onKeyDown={handleKeyDown}
					onFocus={(e) => {
						setFocus(true);
						e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
							index;
					}}
					onBlur={() => setFocus(false)}
					aria-label="Typing test input"
					aria-describedby="typing-instructions typing-status"
					autoCapitalize="off"
					autoComplete="off"
					autoCorrect="off"
					spellCheck={false}
					disabled={status !== "running"}
					aria-hidden={status !== "running"}
					aria-disabled={status !== "running"}
				/>

				<p id="typing-instructions" className="sr-only">
					Type the text shown. Use backspace to correct mistakes. Errors count
					even if corrected.
				</p>

				<p id="typing-status" className="sr-only" aria-live="polite">
					{status === "idle" && "Typing test not started"}
					{status === "running" && "Typing test in progress"}
					{status === "finished" && "Typing test finished"}
				</p>

				{status === "idle" && (
					<button
						type="button"
						onClick={startTypingTest}
						className="absolute -inset-2 bg-transparent backdrop-blur-[6px] z-20 flex items-center justify-center outline-none group"
						aria-label="Start Typing Test"
						aria-keyshortcuts="Enter"
					>
						<div className="flex flex-col justify-center gap-y-5">
							<span className="px-6 py-4 rounded-xl bg-blue-600 text-white font-preset-3-semibold hover:bg-blue-400 transition-colors hover:cursor-pointer group-focus-visible:custom-ring">
								Start Typing Test
							</span>
							<span>Or click the text and start typing</span>
						</div>
					</button>
				)}
			</div>

			{status === "running" && (
				<RestartTest
					onRestart={() => {
						reset();
						const newPhrase: Phrase = getRandomPhrase(difficulty);
						useTypingStore.setState({ phrase: newPhrase });
						finishedRef.current = false;
					}}
				/>
			)}
		</>
	);
};

export default TypingInput;
