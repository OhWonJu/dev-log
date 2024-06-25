"use client";

import { IndexMap } from "@/types";
import useCopy from "@/hooks/useCopy";
import { useOrigin } from "@/hooks/useOrigin";

import { Receipt, ReceiptSeparator } from "@/components";

interface DocumentIndexCardProps {
  postId: string;
  initialData?: string | null;
}

const DocumentIndexCard = ({ postId, initialData }: DocumentIndexCardProps) => {
  const { copied, onCopy } = useCopy();
  const originUrl = useOrigin();

  const postUrl = `${originUrl}/blog/${postId}`;

  const indexMap = initialData ? JSON.parse(initialData) : null;

  const handleIndexClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();

    const element = document.querySelector(`[data-id="${id}"]`);

    element?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-[200px] ml-auto">
      <Receipt
        className="flex flex-col items-center text-xs py-6"
        wrapperClassName="max-w-[250px]"
      >
        <h4 className="font-bold text-2xl">INDEX</h4>
        <ReceiptSeparator className="mt-6" />
        <div className="flex w-full text-xs">
          <span className="w-[20%]">IDX</span>
        </div>
        <ReceiptSeparator />
        <ul className="flex flex-col w-full justify-center truncate">
          {indexMap &&
            indexMap.map((data: IndexMap, index: number) => (
              <li
                key={index}
                role="button"
                onClick={(event) => handleIndexClick(event, data.id)}
                className="py-1 hover:bg-primary-foreground dark:hover:bg-secondary-foreground truncate"
                style={{ paddingLeft: (data.level - 1) * 12 }}
              >
                {data.content}
              </li>
            ))}
        </ul>
        <ReceiptSeparator />
        <div
          role="button"
          onClick={() => onCopy(postUrl)}
          className="flex flex-col justify-center items-center mt-6 w-full overflow-hidden"
        >
          <span>{copied ? "COPIED!" : "CLICK TO COPY LINK OF POST"}</span>
          <span className="mt-2 font-Libre_Barcode_39 text-6xl truncate">
            {postId}
          </span>
        </div>
      </Receipt>
    </div>
  );
};

export default DocumentIndexCard;
