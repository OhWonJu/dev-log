"use client";

import { BlockNoteEditor, insertOrUpdateBlock } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { Menu } from "@mantine/core";
import { MdCode } from "react-icons/md";
import ReactCodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

import style from "./codeBlock.style.module.css";

export const codeBlockBlockTypes = [
  { title: "JavaScript", value: "javascript" },
  { title: "JSX", value: "jsx" },
  { title: "TypeScript", value: "typescript" },
  { title: "TSX", value: "tsx" },
  { title: "Shell", value: "shell" },
] as const;

const CodeBlock = createReactBlockSpec(
  {
    type: "procode",
    propSchema: {
      type: {
        default: "tsx",
        values: ["javascript", "jsx", "typescript", "tsx", "shell"],
      },
      data: {
        //@ts-ignore
        code: "",
      },
    },
    content: "none",
  },
  {
    render: ({ block, editor }) => {
      const { data, type } = block?.props;

      const codeBlockType = codeBlockBlockTypes.find(
        (a) => a.value === block.props.type
      )!;

      const onInputChange = (val: string) => {
        if (!editor.isEditable) return;

        editor.updateBlock(block, {
          //@ts-ignore
          props: { ...block.props, data: val },
        });
      };

      return (
        <div className={style.codeBlock}>
          <ReactCodeMirror
            id={block?.id}
            className={style.codeBlock_content}
            autoFocus
            placeholder={"Write your code here..."}
            style={{
              width: "100%",
              resize: "vertical",
              whiteSpace: "pre-wrap",
            }}
            //@ts-ignore
            extensions={[langs[type ? type : "tsx"]()]}
            value={data}
            theme={vscodeDark}
            width="100%"
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              tabSize: 4,
              highlightActiveLine: false,
            }}
            editable={editor.isEditable}
            onChange={onInputChange}
          />
          <div className="absolute top-0 left-0 p-2 text-sm text-zinc-400">
            <Menu
              withinPortal={false}
              disabled={!editor.isEditable}
              zIndex={999999}
            >
              <Menu.Target>
                <div
                  className={style.codeBlock_menu_button_wrapper}
                  contentEditable={false}
                >
                  {codeBlockType.title}
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Language Type</Menu.Label>
                <Menu.Divider />
                {codeBlockBlockTypes.map((type) => {
                  return (
                    <Menu.Item
                      key={type.value}
                      onClick={() =>
                        editor.updateBlock(block, {
                          type: "procode",
                          //@ts-ignore
                          props: { type: type.value },
                        })
                      }
                    >
                      {type.title}
                    </Menu.Item>
                  );
                })}
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      );
    },
    toExternalHTML: ({ block }) => {
      return (
        <pre>
          <code>{block?.props?.data}</code>
        </pre>
      );
    },
  }
);

const insertCode = (editor: BlockNoteEditor) => ({
  title: "코드",
  subtext: "코드 스니펫을 작성하세요.",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      //@ts-ignore
      type: "procode",
    });
  },
  aliases: ["code"],
  group: "Custom blocks",
  icon: <MdCode />,
});

export { CodeBlock, insertCode };
