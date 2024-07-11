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
  CalloutBlock,
  insertCallout,
  CodeBlock,
  insertCode,
} from "../../app/(blog)/_components/index";
import {
  NextImageBlock,
  insertNextImage,
} from "../../app/(blog)/_components/NextImageBlock/NextImageBlock";

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
    <div className="flex-1 overflow-x-hidden">
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
              ],
              query
            )
          }
        />
      </BlockNoteView>
    </div>
  );
};

export default Editor;
