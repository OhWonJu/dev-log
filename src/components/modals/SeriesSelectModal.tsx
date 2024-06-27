"use client";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Series } from "prisma/prisma-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { useModal } from "@/store/useModalStore";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  name: z.string().min(1, { message: "시리즈 이름을 입력해주세요." }),
});

const SeriesSelectModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "seriesSelect";

  const { data: seriesData } = useQuery({
    queryKey: ["series-simple-list"],
    queryFn: async () => axios.get("/api/series?simple=true"),
  });
  const seriesList = seriesData?.data as Series[];

  const queryClient = useQueryClient();
  const { mutate: createNewSeries } = useMutation({
    mutationFn: async (name: string) =>
      await axios.post("/api/series", {
        name,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["series-simple-list"],
      });
    },
    onError: () => {
      form.setError("name", { message: "유효하지 않은 시리즈 이름 입니다." });
    },
  });

  const { mutate: selectSeries } = useMutation({
    mutationFn: async (id: string) =>
      await axios.patch(`/api/series/${id}`, { documentId: data.documentId }),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["serise-list", data.data.id],
      });
      handleClose();
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createNewSeries(values.name);
  };

  const onSeriesClick = (id: string, name: string) => {
    data.seriesName = name;
    selectSeries(id);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Select series
          </DialogTitle>
        </DialogHeader>
        <div className="px-6">
          <ul>
            {seriesList &&
              seriesList.map((series) => (
                <li key={series.id}>
                  <Button
                    variant={"ghost"}
                    className="w-full justify-start"
                    onClick={() => onSeriesClick(series.id, series.name)}
                  >
                    {series.name}
                  </Button>
                </li>
              ))}
          </ul>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-8"
          >
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Create new series
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="새 시리즈 이름을 입력해주세요."
                        {...field}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SeriesSelectModal;
