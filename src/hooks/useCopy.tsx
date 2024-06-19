import { useState } from "react";

const useCopy = () => {
  const [copied, setCopied] = useState(false);

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return { copied, onCopy };
};

export default useCopy;
