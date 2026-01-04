import { base64urlEncode, generatePayload } from "../helpers/share-encode";
import Share from "../icons/Share";
import { useTypingStore } from "../store/typing.store";
import Button from "./Button";

const ShareButton = () => {
	const { wpm, accuracy, phrase } = useTypingStore();

	const generateUrl = async () => {
		const payload = generatePayload(wpm, accuracy, phrase);
		const encoded = base64urlEncode(payload);
		const url = `${window.location.origin}/s/${encoded}`;
		await navigator.clipboard.writeText(url);
	};

	return (
		<Button variant="secondary" onClick={generateUrl}>
			Share Results <Share className="size-6" />
		</Button>
	);
};

export default ShareButton;
