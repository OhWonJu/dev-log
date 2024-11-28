"use client";

import { useTheme } from "next-themes";
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import {
  BlockNoteSchema,
  PartialBlock,
  defaultBlockSpecs,
  filterSuggestionItems,
} from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";

import {
  NextImageBlock,
  insertNextImage,
  CalloutBlock,
  insertCallout,
  CodeBlock,
  insertCode,
  SeparatorBlock,
  insertSeparator,
} from "./index";

interface EditorProps {
  initialContent?: string | null;
  editable?: boolean;
  onChange: (value: string) => void;
}

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Alert block.
    callout: CalloutBlock,
    procode: CodeBlock,
    nextImage: NextImageBlock,
    separator: SeparatorBlock,
  },
});

const Editor = ({
  initialContent,
  editable = false,
  onChange,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();

  // const handleUpload = async (file: File) => {
  //   const res = await edgestore.publicFiles.upload({ file });

  //   return res.url;
  // };

  const editor = useCreateBlockNote({
    schema,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    // uploadFile: handleUpload,
  });

  return (
    <article className="flex-1 overflow-x-hidden">
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        data-theming-css
      >
        {/* @ts-ignore */}
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            filterSuggestionItems(
              [
                ...getDefaultReactSlashMenuItems(editor),
                insertCallout(),
                insertCode(),
                insertNextImage(),
                insertSeparator(),
              ],
              query
            )
          }
        />
      </BlockNoteView>
    </article>
  );
};

export default Editor;
