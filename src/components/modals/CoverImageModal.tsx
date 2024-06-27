"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCoverImage } from "@/hooks/UseCoverImage";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { SingleImageDropzone } from "../SingleImageDropzone";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";

const formSchema = z.object({
  url: z.string().min(1, { message: "파일 url 을 입력해주세요." }),
});

const CoverImageModal = () => {
  const params = useParams();
  const router = useRouter();

  const coverImage = useCoverImage();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { mutate } = useMutation({
    mutationFn: async (data: { coverImage: string }) =>
      await axios.patch(`/api/documents/${params?.postId}`, {
        coverImage: data.coverImage,
      }),
    onSuccess: () => {
      router.refresh();
    },
  });

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      // const res = await edgestore.publicFiles.upload({
      //   file,
      //   options: {
      //     replaceTargetUrl: coverImage.url,
      //   },
      // });

      // mutate({ coverImage: res.url });

      onClose();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      mutate({ coverImage: values.url });

      form.reset();
      onClose();
    } catch (error) {
      form.setError("url", { message: "다시 시도해주세요." });
      console.log(error);
    }
  };

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
          className="w-full outline-none"
        />
        <span className="text-sm text-center text-zinc-400 dark:text-zinc-600 font-semibold">or</span>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      File URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="파일 URL 을 입력해주세요."
                        {...field}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button disabled={isLoading} variant={"ghost"}>업로드 하기</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
