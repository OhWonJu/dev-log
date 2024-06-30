"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Mail, Undo2 } from "lucide-react";

import style from "./profileCard.style.module.css";

import { EMAIL, GIT_HUB } from "@/constants/contact";
import { cn } from "@/lib/utils";

import useCopy from "@/hooks/useCopy";

import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { Github } from "@/components/icons";

const ProfileCard = () => {
  const [isFrontSide, setIsFrontSide] = useState(true);

  const { copied, onCopy } = useCopy();

  return (
    <div className={cn(style.card, "w-full max-w-[500px] aspect-[2/1]")}>
      <div
        className={cn(
          style.card_inner,
          !isFrontSide && "[transform:rotateY(180deg)]",
          "shadow-lg rounded-md bg-background border-[1px] border-zinc-100 dark:border-zinc-600"
        )}
      >
        <div className={style.card_front}>
          <div className="w-[30%] p-3 my-auto">
            <FollowerPointerCard className="flex w-full aspect-square rounded-full">
              <div
                role="button"
                onClick={() => setIsFrontSide(false)}
                className="relative w-full h-full rounded-full cursor-none"
              >
                <Image
                  src={"/profile.png"}
                  alt="profile"
                  fill
                  className="object-contain"
                />
              </div>
            </FollowerPointerCard>
          </div>
          <div className="flex flex-col w-[70%] pr-3 py-10 justify-around">
            <h4 className="font-bold text-xl">Front End Developer</h4>
            <p className="font-medium text-primary/5 text-xs sm:text-sm line-clamp-5">
              재사용성이 좋고 견고한 코드를 작성하기 위해 늘 고민합니다. <br />
              기술을 선택함에 있어 이유와 원리를 중요하게 생각합니다. <br />
              지식과 경험을 공유하는 것을 중요하게 생각합니다.
            </p>
          </div>
        </div>
        <div className={cn(style.card_back, "flex-col")}>
          <div className="h-[20%] p-6 flex justify-between items-center">
            <h4 className="font-bold text-xl">Contact</h4>
            <div role="button" onClick={() => setIsFrontSide(true)}>
              <Undo2 className="w-5 h-5 text-zinc-500" />
            </div>
          </div>
          <div className="flex flex-col h-[80%] p-6 justify-end ">
            <div
              role="button"
              onClick={() => onCopy(EMAIL)}
              className="flex items-center text-xs font-medium gap-x-4 hover:bg-primary-foreground p-2 rounded-md"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5" />
                  copied!
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  {EMAIL}
                </>
              )}
            </div>
            <Link
              href={GIT_HUB}
              target="_blank"
              className="flex items-center text-xs font-medium gap-x-4 hover:bg-primary-foreground p-2 rounded-md"
            >
              <Github className="w-5 h-5 fill-primary" />
              {GIT_HUB}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
