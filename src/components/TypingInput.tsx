import {
	type InputEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { getRandomPhrase } from "../helpers/get-random-phrase";
import { useTypingTimer } from "../hooks/use-typing-timer";
import { type Difficulty, useSettingsStore } from "../store/settings.store";
import { type Phrase, useTypingStore } from "../store/typing.store";
import RestartTest from "./RestartTest";

const TypingInput = () => {
	const [focus, setFocus] = useState(false);
	const [preHeight, setPreHeight] = useState(48);

	const inputRef = useRef<HTMLTextAreaElement>(null);
	const preRef = useRef<HTMLPreElement>(null);
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

	const lockCaret = useCallback((input: HTMLTextAreaElement) => {
		input.selectionStart = input.selectionEnd = input.value.length;
	}, []);

	const handleInput: InputEventHandler<HTMLTextAreaElement> = (e) => {
		const input = e.currentTarget;
		const native = e.nativeEvent as InputEvent;
		const inputType = native.inputType;
		const value = input.value;

		if (status !== "running" || !phrase) return;

		if (inputType === "deleteContentBackward") {
			if (index === 0) return;

			const prevIndex = index - 1;
			const results = [...phrase.results];
			results[prevIndex] = "pending";

			useTypingStore.setState({
				phrase: { ...phrase, results },
				index: prevIndex,
			});

			lockCaret(input);
			return;
		}

		if (inputType?.startsWith("insert")) {
			const char = value[value.length - 1];
			if (!char || index >= phrase.chars.length) {
				lockCaret(input);
				return;
			}

			const expectedChar = phrase.chars[index];
			const isCorrect = char === expectedChar;

			registerKeystroke(char, isCorrect);

			if (!finishedRef.current && index + 1 >= phrase.chars.length) {
				finishedRef.current = true;
				finish();
			}

			lockCaret(input);
		}
	};

	const startTypingTest = () => {
		if (mode === "timed") startTimed(timeLimit);
		else startPassage();

		finishedRef.current = false;

		setTimeout(() => {
			const input = inputRef.current;
			const pre = preRef.current;
			if (input && pre) {
				setPreHeight(pre.getBoundingClientRect().height);
				input.focus();
				lockCaret(input);
			}
		}, 200);
	};

	const resetTypingTest = useCallback(
		(difficulty: Difficulty) => {
			reset();
			const newPhrase: Phrase = getRandomPhrase(difficulty);
			useTypingStore.setState({ phrase: newPhrase });
			finishedRef.current = false;

			const input = inputRef.current;
			if (input) {
				input.value = "";
				input.focus();
				lockCaret(input);
			}
		},
		[reset, lockCaret],
	);

	useEffect(() => {
		const pre = preRef.current;
		if (!pre) return;

		const resize = () => setPreHeight(pre.getBoundingClientRect().height);
		resize();
		window.addEventListener("resize", resize);

		const unsubscribe = useSettingsStore.subscribe((state, prev) => {
			if (state.difficulty !== prev.difficulty)
				resetTypingTest(state.difficulty);
		});

		return () => {
			window.removeEventListener("resize", resize);
			unsubscribe();
		};
	}, [resetTypingTest]);

	return (
		<>
			<div className="mt-8 mb-8 md:mb-10 lg:mb-8 w-full relative select-none">
				<pre
					ref={preRef}
					className="m-0 whitespace-pre-wrap font-preset-1-regular"
				>
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

				<textarea
					ref={inputRef}
					name="input"
					className="opacity-0 absolute left-0 top-0 w-full font-preset-1-regular outline-none z-10"
					style={{ height: `${preHeight}px` }}
					onBeforeInput={(e) => {
						if (!e.data || e.data.length !== 1 || e.data === "\n")
							e.preventDefault();
					}}
					onInput={handleInput}
					onPaste={(e) => e.preventDefault()}
					onCopy={(e) => e.preventDefault()}
					onCut={(e) => e.preventDefault()}
					onClick={(e) => lockCaret(e.currentTarget)}
					onSelect={(e) => lockCaret(e.currentTarget)}
					onFocus={(e) => {
						setFocus(true);
						lockCaret(e.currentTarget);
					}}
					onBlur={() => setFocus(false)}
					autoCapitalize="off"
					autoComplete="off"
					autoCorrect="off"
					spellCheck={false}
					inputMode="text"
					enterKeyHint="done"
					aria-label="Typing test input"
					aria-describedby="typing-instructions typing-status"
					disabled={status !== "running"}
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
						className="absolute -inset-2 bg-transparent backdrop-blur-[6px] z-20 flex sm:items-center justify-center outline-none group"
						aria-label="Start Typing Test"
						aria-keyshortcuts="Enter"
					>
						<div className="flex flex-col pt-48 sm:pt-0 justify-center gap-y-5 h-fit">
							<span className="px-6 py-4 rounded-xl bg-blue-600 text-white font-preset-3-semibold hover:bg-blue-400 transition-colors hover:cursor-pointer group-focus-visible:custom-ring">
								Start Typing Test
							</span>
							<span>Or click the text and start typing</span>
						</div>
					</button>
				)}
			</div>

			{status === "running" && (
				<RestartTest onRestart={() => resetTypingTest(difficulty)} />
			)}
		</>
	);
};

export default TypingInput;
