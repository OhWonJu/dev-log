"use client";

import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Document } from "prisma/prisma-client";
import axios from "axios";
import debounce from "lodash.debounce";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useSearch } from "@/store/useSearchStore";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { DialogTitle } from "../ui/dialog";
import Spinner from "../Spinner";

const SearchCommand = () => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  const keyword = useRef("");

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["search", keyword.current],
    queryFn: async () =>
      await axios.get(`/api/search?keyword=${keyword.current}`),
    enabled: !!keyword.current,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const documents = data?.data as Document[];

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  const debouncedOnChange = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const newKeyword = event.target.value;

      keyword.current = newKeyword;

      if (!newKeyword.trim()) return;

      await refetch();
    },
    300
  );

  const goToSearchPage = () => {
    onClose();
    router.push(`/blog/search?keyword=${keyword.current}`);
  };

  const onSelect = (id: string) => {
    router.push(`/blog/${id}`);
    onClose();
  };

  // for hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const shortcut = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", shortcut);

    return () => {
      document.removeEventListener("keydown", shortcut);
    };
  }, [router, toggle]);

  if (!isMounted) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden">Edit profile</DialogTitle>
      <div className="flex items-center px-3 border-b">
        <SearchIcon className="w-5 h-5 text-zinc-400 dark:text-zinc-600" />
        <Input
          placeholder="Search Recipe"
          onChange={(e) => debouncedOnChange(e)}
          className="my-1 border-0 bg-transparent ring-0 focus-visible:ring-0 focus-visible:border-1 focus-visible:ring-offset-0"
        />
      </div>
      <CommandList>
        {isLoading ? (
          <div className="flex items-center justify-center my-8">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <CommandEmpty>No results found.</CommandEmpty>
            {documents && documents.length !== 0 && (
              <CommandItem
                key="default"
                title="default"
                onSelect={goToSearchPage}
              >
                검색 결과 페이지에서 보기
              </CommandItem>
            )}
            <CommandGroup>
              {documents?.map((document) => (
                <CommandItem
                  key={document.id}
                  value={`${document.id}`}
                  title={document.title}
                  onSelect={onSelect}
                >
                  <span>{document.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
