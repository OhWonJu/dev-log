"use client";

import { useTheme } from "next-themes";
import {
  DefaultReactSuggestionItem,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import {
  BlockNoteEditor,
  BlockNoteSchema,
  PartialBlock,
  defaultBlockSpecs,
  filterSuggestionItems,
  locales,
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
    ...defaultBlockSpecs,
    callout: CalloutBlock,
    procode: CodeBlock,
    nextImage: NextImageBlock,
    separator: SeparatorBlock,
  },
});

const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertCallout(editor),
  insertCode(editor),
  insertNextImage(editor),
  insertSeparator(editor),
];

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
    dictionary: locales.ko,
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
        slashMenu={false}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query: any) =>
            // @ts-ignore
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        />
      </BlockNoteView>
    </article>
  );
};

export default Editor;
