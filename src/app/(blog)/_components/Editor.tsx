"use client";

import { useTheme } from "next-themes";

import { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import DocumentIndexCard from "./DocumentIndexCard";

interface EditorProps {
  initialContent?: string | null;
  editable?: boolean;
  postId: string;
  initialIndexMap?: string | null;
  onSubmit: () => void;
  onChange: (value: string) => void;
}

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
        />
      </div>
      <div className="hidden lg:block mr-[56px]">
        <DocumentIndexCard postId={postId} initialData={initialIndexMap} />
      </div>
    </div>
  );
};

export default Editor;
