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
  insertOrUpdateBlock,
} from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { MdAutoAwesome } from "react-icons/md";

import "@blocknote/mantine/style.css";

import DocumentIndexCard from "./DocumentIndexCard";
import { CalloutBlock, insertCallout } from "./CalloutBlock/CalloutBlock";

interface EditorProps {
  initialContent?: string | null;
  editable?: boolean;
  postId: string;
  initialIndexMap?: string | null;
  onSubmit: () => void;
  onChange: (value: string) => void;
}

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Alert block.
    callout: CalloutBlock,
  },
});

const Editor = ({
  initialContent,
  editable = false,
  onSubmit,
  onChange,
  postId,
  initialIndexMap,
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
    <div className="flex w-full">
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
                [...getDefaultReactSlashMenuItems(editor), insertCallout()],
                query
              )
            }
          />
        </BlockNoteView>
      </div>
      <div className="hidden lg:block mr-[56px]">
        <DocumentIndexCard postId={postId} initialData={initialIndexMap} />
      </div>
    </div>
  );
};

export default Editor;
