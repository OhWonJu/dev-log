import { useMutation } from "@tanstack/react-query";

export type NewChatProps = {
  url: string;
  values: {
    content: string;
    createdAt: Date;
  };
};

const useNewChatMutation = (
  chatId: string,
  fetchFn: ({ url, values }: NewChatProps) => Promise<unknown>,
  successFn?: () => void
) => {
  const { mutate } = useMutation({
    mutationKey: ["addNewChat", chatId],
    mutationFn: fetchFn,
    onSuccess: successFn ?? successFn,
    gcTime: 60 * 1000,
  });

  return { mutate };
};

export default useNewChatMutation;
