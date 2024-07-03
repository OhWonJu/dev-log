import {
  defaultProps,
  BlockNoteEditor,
  FileBlockConfig,
  imageParse,
  insertOrUpdateBlock,
} from "@blocknote/core";
import {
  AddFileButton,
  DefaultFilePreview,
  FigureWithCaption,
  FileAndCaptionWrapper,
  LinkWithCaption,
  ReactCustomBlockRenderProps,
  ResizeHandlesWrapper,
  createReactBlockSpec,
  useResolveUrl,
} from "@blocknote/react";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { RiImage2Fill } from "react-icons/ri";

import { getImageSize } from "@/lib/utils";

export declare const imageBlockConfig: {
  type: "nextImage";
  propSchema: {
    textAlignment: {
      default: "left";
      values: readonly ["left", "center", "right", "justify"];
    };
    backgroundColor: {
      default: "default";
    };
    name: {
      default: "";
    };
    url: {
      default: "";
    };
    caption: {
      default: "";
    };
    showPreview: {
      default: true;
    };
    previewWidth: {
      default: number;
    };
  };
  content: "none";
  isFileBlock: true;
  fileBlockAcceptMimeTypes: string[];
};

const NextImageBlockConfig: typeof imageBlockConfig = {
  type: "nextImage",
  propSchema: {
    textAlignment: defaultProps.textAlignment,
    backgroundColor: {
      default: "default",
    },
    name: {
      default: "",
    },
    url: {
      default: "",
    },
    caption: {
      default: "",
    },
    showPreview: {
      default: true,
    },
    previewWidth: {
      default: 0 as number,
    },
  },
  content: "none",
  isFileBlock: true,
  fileBlockAcceptMimeTypes: [] as string[],
};

export const ImagePreview = (
  props: Omit<
    ReactCustomBlockRenderProps<FileBlockConfig, any, any>,
    "contentRef"
  >
) => {
  const [width, setWidth] = useState<number>(
    props.block.props.previewWidth === 0
      ? props.editor.domElement.firstElementChild!.clientWidth
      : Math.min(
          props.block.props.previewWidth!,
          props.editor.domElement.firstElementChild!.clientWidth
        )
  );

  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const resolved = useResolveUrl(props.block.props.url!);

  useEffect(() => {
    const fetchAspectRatio = async () => {
      try {
        const size = await getImageSize(props.block.props.url!);
        setImageSize(size);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    fetchAspectRatio();
  }, [props.block.props.url]);

  if (resolved.loadingState === "loading") {
    return null;
  }

  const ratio = parseFloat((imageSize?.height! / imageSize?.width!).toFixed(2));

  return (
    <ResizeHandlesWrapper {...props} width={width} setWidth={setWidth}>
      {imageSize && (
        <Image
          className="bn-visual-media"
          src={resolved.downloadUrl!}
          alt={props.block.props.caption || "BlockNote Next Image"}
          contentEditable={false}
          draggable={false}
          width={width}
          height={width * ratio}
        />
      )}
    </ResizeHandlesWrapper>
  );
};

export const ImageToExternalHTML = (
  props: Omit<
    ReactCustomBlockRenderProps<typeof NextImageBlockConfig, any, any>,
    "contentRef"
  >
) => {
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const fetchAspectRatio = async () => {
      try {
        const size = await getImageSize(props.block.props.url!);
        setImageSize(size);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    fetchAspectRatio();
  }, [props.block.props.url]);

  if (!props.block.props.url) {
    return <p>Add image</p>;
  }

  const ratio = parseFloat((imageSize?.height! / imageSize?.width!).toFixed(2));

  const image = props.block.props.showPreview ? (
    <>
      {imageSize && (
        <Image
          className="bn-visual-media"
          src={props.block.props.url}
          alt={
            props.block.props.name ||
            props.block.props.caption ||
            "BlockNote Next Image"
          }
          contentEditable={false}
          draggable={false}
          width={props.block.props.previewWidth}
          height={props.block.props.previewWidth * ratio}
        />
      )}
    </>
  ) : (
    <a href={props.block.props.url}>
      {props.block.props.name || props.block.props.url}
    </a>
  );

  if (props.block.props.caption) {
    return props.block.props.showPreview ? (
      <FigureWithCaption caption={props.block.props.caption}>
        {image}
      </FigureWithCaption>
    ) : (
      <LinkWithCaption caption={props.block.props.caption}>
        {image}
      </LinkWithCaption>
    );
  }

  return image;
};

export const NextImageBlock = createReactBlockSpec(NextImageBlockConfig, {
  render: (props) => {
    return (
      <div className={"bn-file-block-content-wrapper"}>
        {props.block.props.url === "" ? (
          <AddFileButton
            {...props}
            editor={props.editor as any}
            buttonText={
              props.editor.dictionary.file_blocks.image.add_button_text
            }
            buttonIcon={<RiImage2Fill size={24} />}
          />
        ) : !props.block.props.showPreview ? (
          <FileAndCaptionWrapper
            block={props.block}
            editor={props.editor as any}
          >
            <DefaultFilePreview
              block={props.block}
              editor={props.editor as any}
            />
          </FileAndCaptionWrapper>
        ) : (
          <FileAndCaptionWrapper
            block={props.block}
            editor={props.editor as any}
          >
            <ImagePreview block={props.block} editor={props.editor as any} />
          </FileAndCaptionWrapper>
        )}
      </div>
    );
  },
  parse: imageParse,
  toExternalHTML: (props) => <ImageToExternalHTML {...props} />,
});

export const parseImageElement = (imageElement: HTMLImageElement) => {
  const url = imageElement.src || undefined;
  const previewWidth = imageElement.width || undefined;
  return { url, previewWidth };
};

export const insertNextImage = () => ({
  title: "Next Image",
  onItemClick: (editor: BlockNoteEditor) => {
    insertOrUpdateBlock(editor, {
      //@ts-ignore
      type: "nextImage",
    });
  },
  aliases: ["Next Image"],
  group: "Custom blocks",
  icon: <ImageIcon />,
  subtext: "Insert a NextImage block.",
});
