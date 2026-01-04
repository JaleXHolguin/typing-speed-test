import Share from "../icons/Share";
import Button from "./Button";

const ShareButton = () => {
	const generateUrl = async () => {
		/* TODO: Add url generation logic */
	};

	return (
		<Button variant="secondary" onClick={generateUrl}>
			Share Results <Share className="size-6" />
		</Button>
	);
};

export default ShareButton;
