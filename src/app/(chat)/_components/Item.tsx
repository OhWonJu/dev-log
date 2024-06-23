"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Check, LucideIcon, MoreHorizontal, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

interface ItemProps {
  id?: string;
  focus?: boolean;
  active?: boolean;
  label: string;
  onClick?: () => void;
  icon?: LucideIcon;
}

const Item = ({ id, label, onClick, focus, active, icon: Icon }: ItemProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: toggleChatState } = useMutation({
    mutationFn: async () =>
      axios.patch(`/api/chats/${id}`, {
        isActive: !active,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat-list"],
      });
    },
  });

  const { mutate: deleteChat } = useMutation({
    mutationFn: async () => axios.delete(`/api/chats/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat-list"],
      });
      router.push("chats");
    },
  });

  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        "group min-h-[27px] text-sm py-1 px-3 w-full hover:bg-primary-foreground flex items-center text-muted-foreground font-medium",
        focus && "bg-primary-foreground"
      )}
    >
      {Icon && (
        <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      )}
      {typeof active !== "undefined" && (
        <div
          className={cn(
            active ? "bg-green-500" : "bg-red-500",
            "rounded-full w-2 h-2 mr-2"
          )}
        />
      )}
      <span className="truncate">{label}</span>
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={() => toggleChatState()}>
                <Check className="h-4 w-4 mr-2" />
                {active ? "Disable" : "Active"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteChat()}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default Item;

Item.Skeleton = function ItemSkeleton() {
  return (
    <div className="flex gap-x-2 py-1 px-3">
      <Skeleton className="h-4 w-[40%]" />
    </div>
  );
};
