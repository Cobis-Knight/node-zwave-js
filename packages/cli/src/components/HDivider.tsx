import { Box, measureElement, Text, TextProps, type DOMElement } from "ink";
import React, { useEffect, useRef, useState } from "react";

export interface HDividerProps extends TextProps {
	character?: string;
	margin?: number;
}

export const HDivider: React.FC<HDividerProps> = ({
	character = "─",
	margin = 1,
	...textProps
}) => {
	const ref = useRef<DOMElement>(null);
	const [text, setText] = useState<string>(character);

	useEffect(() => {
		if (ref.current) {
			const width = Math.max(1, measureElement(ref.current).width);
			if (Number.isNaN(width)) {
				setText(character);
			} else {
				setText(character.repeat(width));
			}
		}
	});

	return (
		<Box marginY={margin} height={1} ref={ref}>
			<Text {...textProps}>{text}</Text>
		</Box>
	);
};
