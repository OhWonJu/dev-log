"use client";

import { BlockNoteEditor, insertOrUpdateBlock } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { Minus } from "lucide-react";

import style from "./separatorBlock.style.module.css";

const SeparatorBlock = createReactBlockSpec(
  {
    type: "separator",
    propSchema: {
      type: {
        default: "default",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      return (
        <div
          className={style.separator}
          data-callout-type={props.block.props.type}
        />
      );
    },
  }
);

const insertSeparator = () => ({
  title: "Separator",
  onItemClick: (editor: BlockNoteEditor) => {
    insertOrUpdateBlock(editor, {
      //@ts-ignore
      type: "separator",
    });
  },
  aliases: ["---"],
  group: "Custom blocks",
  icon: <Minus />,
});

export { SeparatorBlock, insertSeparator };
