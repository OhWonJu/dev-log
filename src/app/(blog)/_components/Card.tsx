import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

interface CardProps {
  cardType: "post" | "series";
  id: string;
  title: string;
  coverImage?: string | null;
  createdAt?: Date | null;
}

const DATE_FORMAT = "yyyy.MM.dd";
const Card = ({ cardType, id, title, coverImage, createdAt }: CardProps) => {
  if (cardType === "post")
    return (
      <Link
        href={`/blog/${id}`}
        className="flex flex-col rounded-lg w-full aspect-[4/3] md:aspect-[3/4] bg-background shadow-lg border overflow-hidden hover:scale-[1.02] transition"
      >
        <div className="relative w-full h-[65%]">
          {coverImage && (
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 30vw, 33vw"
              placeholder="empty"
              priority
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col justify-between w-full h-[36%] p-4">
          <h3 className="font-bold text-lg sm:text-xl md:text-lg line-clamp-1 sm:line-clamp-2 tracking-tight">
            {title}
          </h3>
          <div className="flex justify-end items-center text-xs font-semibold text-zinc-400 dark:text-zinc-600">
            {createdAt && (
              <>
                <Calendar className="w-3 h-3 mr-1" />
                {format(createdAt, DATE_FORMAT)}
              </>
            )}
          </div>
        </div>
      </Link>
    );

  if (cardType === "series")
    return (
      <Link
        href={`/blog/courses/${id}`}
        className="flex flex-col justify-center items-center rounded-lg w-full p-4 aspect-[3/2] md:aspect-[3/4] bg-background shadow-lg border overflow-hidden hover:scale-[1.02] transition"
      >
        <strong className="font-Pacifico text-4xl md:text-2xl text-zinc-600 dark:text-zinc-300 mb-4">
          Course
        </strong>
        <h3 className="font-bold text-4xl md:text-2xl line-clamp-1 sm:line-clamp-2 tracking-tight">
          {title}
        </h3>
      </Link>
    );
};

export default Card;
