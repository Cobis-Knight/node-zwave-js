import { Box, DOMElement, measureElement, Text } from "ink";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LinesBuffer } from "../lib/logging";

export interface LogProps {
	buffer: LinesBuffer;
}

export const Log: React.FC<LogProps> = (props) => {
	const ref = useRef<DOMElement>(null);
	const [logHeight, setLogHeight] = useState(0);
	const [scrollOffset, setScrollOffset] = useState(0);
	const [log, setLog] = useState<string>("");

	const renderLog = useCallback(() => {
		const lines = props.buffer.getView(
			Math.max(props.buffer.size - logHeight, 0),
			props.buffer.size,
		);
		setLog(lines.join("\n"));
	}, [props.buffer, logHeight]);

	useEffect(() => {
		if (ref.current) {
			setLogHeight(measureElement(ref.current).height);
		}
	});

	// Update the log state whenever `buffer` emits a change event
	useEffect(() => {
		const listener = () => {
			renderLog();
		};

		props.buffer.on("change", listener);
		return () => {
			props.buffer.off("change", listener);
		};
	}, [props.buffer, scrollOffset, logHeight]);

	// Render the log initially AND when the log height changes
	useEffect(() => {
		renderLog();
	}, [logHeight]);

	return (
		<Box width={104} ref={ref}>
			<Text>{log}</Text>
		</Box>
	);
};
