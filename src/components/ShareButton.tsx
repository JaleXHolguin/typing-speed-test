import { useState } from "react";
import { base64urlEncode, generatePayload } from "../helpers/share-encode";
import Check from "../icons/Check";
import Share from "../icons/Share";
import { useTypingStore } from "../store/typing.store";
import Button from "./Button";

const ShareButton = () => {
	const { wpm, accuracy, phrase } = useTypingStore();
	const [isCopied, setIsCopied] = useState(false);

	const generateUrl = async () => {
		const payload = generatePayload(wpm, accuracy, phrase);
		const encoded = base64urlEncode(payload);
		const url = `${window.location.origin}/s/${encoded}`;
		await navigator.clipboard.writeText(url);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 3000);
	};

	return (
		<Button variant="secondary" onClick={generateUrl}>
			{isCopied ? (
				<>
					Link Copied! <Check className="size-6 text-green-500" />
				</>
			) : (
				<>
					Share Results <Share className="size-6" />
				</>
			)}
		</Button>
	);
};

export default ShareButton;
