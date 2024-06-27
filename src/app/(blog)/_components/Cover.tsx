"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ImageIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCoverImage } from "@/hooks/UseCoverImage";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface CoverProps {
  url?: string | null;
  preview?: boolean;
}

const Cover = ({ url, preview }: CoverProps) => {
  const params = useParams();
  const router = useRouter();
  const coverImage = useCoverImage();

  const { mutate: remove } = useMutation({
    mutationFn: async () =>
      await axios.patch(`/api/documents/${params?.postId}`, {
        coverImage: "",
      }),
  });

  // const onRemove = async () => {
  //   // if (url) {
  //   //   await edgestore.publicFiles.delete({
  //   //     url: url,
  //   //   });
  //   }
  //   remove();
  // }

  const onRemove = async () => {
    remove();
    router.refresh();
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group my-4",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
          >
            <ImageIcon className="h-4 w-5 mr-2" />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
          >
            <X className="h-4 w-5 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
