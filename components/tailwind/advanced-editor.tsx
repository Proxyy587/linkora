"use client";
import {
	EditorCommand,
	EditorCommandEmpty,
	EditorCommandItem,
	EditorCommandList,
	EditorContent,
	type EditorInstance,
	EditorRoot,
	type JSONContent,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extensions";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";
import { MathSelector } from "./selectors/math-selector";
import { Separator } from "./ui/separator";

import { handleImageDrop, handleImagePaste } from "novel/plugins";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";

const hljs = require("highlight.js");

const extensions = [...defaultExtensions, slashCommand];

interface TailwindAdvancedEditorProps {
	onChange?: (content: JSONContent) => void;
	initialContent?: JSONContent;
}

const TailwindAdvancedEditor: React.FC<TailwindAdvancedEditorProps> = ({ onChange, initialContent }) => {
	const [editorContent, setEditorContent] = useState<JSONContent | null>(null);
	const [saveStatus, setSaveStatus] = useState("Saved");
	const [charsCount, setCharsCount] = useState<number | undefined>();

	const [openNode, setOpenNode] = useState(false);
	const [openColor, setOpenColor] = useState(false);
	const [openLink, setOpenLink] = useState(false);
	const [openAI, setOpenAI] = useState(false);

	const highlightCodeblocks = (content: string) => {
		const doc = new DOMParser().parseFromString(content, "text/html");
		doc.querySelectorAll("pre code").forEach((el) => {
				// @ts-ignore
				hljs.highlightElement(el);
		});
		return new XMLSerializer().serializeToString(doc);
	};

	const debouncedUpdates = useDebouncedCallback(
		async (editor: EditorInstance) => {
			const json = editor.getJSON();
			setCharsCount(editor.storage.characterCount.words());
			const html = highlightCodeblocks(editor.getHTML());
			setSaveStatus("Saved");
			
			// Call the onChange prop with the JSON content
			onChange?.(json);
		},
		500
	);

	useEffect(() => {
		if (initialContent) {
			setEditorContent(initialContent);
		} else {
			const content = window.localStorage.getItem("novel-content");
			if (content) setEditorContent(JSON.parse(content));
		}
	}, [initialContent]);

	if (!editorContent) return null;

	return (
		<div className="relative w-full">
			<div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
				<div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
					{saveStatus}
				</div>
				<div
					className={
						charsCount
							? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"
							: "hidden"
					}
				>
					{charsCount} Words
				</div>
			</div>
			<EditorRoot>
				<EditorContent
					initialContent={editorContent}
					extensions={extensions}
					className="relative min-h-[500px] w-full border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
					editorProps={{
						handleDOMEvents: {
							keydown: (_view, event) => handleCommandNavigation(event),
						},
						handlePaste: (view, event) =>
							handleImagePaste(view, event, uploadFn),
						handleDrop: (view, event, _slice, moved) =>
							handleImageDrop(view, event, moved, uploadFn),
						attributes: {
							class:
								"prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
						},
					}}
					onUpdate={({ editor }) => {
						debouncedUpdates(editor);
						setSaveStatus("Unsaved");
					}}
					slotAfter={<ImageResizer />}
				>
					<EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
						<EditorCommandEmpty className="px-2 text-muted-foreground">
							No results
						</EditorCommandEmpty>
						<EditorCommandList>
							{suggestionItems.map((item) => (
								<EditorCommandItem
									value={item.title}
									onCommand={(val) => item.command?.(val)}
									className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
									key={item.title}
								>
									<div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
										{item.icon}
									</div>
									<div>
										<p className="font-medium">{item.title}</p>
										<p className="text-xs text-muted-foreground">
											{item.description}
										</p>
									</div>
								</EditorCommandItem>
							))}
						</EditorCommandList>
					</EditorCommand>

					<GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
						<Separator orientation="vertical" />
						<NodeSelector open={openNode} onOpenChange={setOpenNode} />
						<Separator orientation="vertical" />

						<LinkSelector open={openLink} onOpenChange={setOpenLink} />
						<Separator orientation="vertical" />
						<MathSelector />
						<Separator orientation="vertical" />
						<TextButtons />
						<Separator orientation="vertical" />
						<ColorSelector open={openColor} onOpenChange={setOpenColor} />
					</GenerativeMenuSwitch>
				</EditorContent>
			</EditorRoot>
		</div>
	);
};

export default TailwindAdvancedEditor;
