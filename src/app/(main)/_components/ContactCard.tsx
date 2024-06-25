"use client";

import React from "react";
import Link from "next/link";
import { Check, Mail } from "lucide-react";

import { EMAIL, GIT_HUB } from "@/constants/contact";

import useCopy from "@/hooks/useCopy";

import { Receipt, ReceiptSeparator } from "@/components";
import { Github } from "@/components/icons";

const ContactCard = () => {
  const { copied, onCopy } = useCopy();

  return (
    <Receipt className="flex flex-col items-center text-xs">
      <h4 className="font-bold text-3xl">CONTACT</h4>
      <ReceiptSeparator className="mt-10" />
      <div className="flex w-full text-xs">
        <span className="w-[20%]">QTY</span>
        <span className="w-[80%]">ITEM</span>
      </div>
      <ReceiptSeparator />
      <div
        role="button"
        onClick={() => onCopy(EMAIL)}
        className="flex w-full items-center hover:bg-primary-foreground dark:hover:bg-secondary-foreground rounded-md p-1"
      >
        <div className="w-[20%] flex items-center">
          {copied ? (
            <>
              <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
            </>
          )}
        </div>
        <div className="w-[80%] flex gap-x-2 items-center rounded-md">
          {copied ? <>copied!</> : <>{EMAIL}</>}
        </div>
      </div>

      <Link
        href={GIT_HUB}
        target="_blank"
        className="flex w-full items-center hover:bg-primary-foreground dark:hover:bg-secondary-foreground rounded-md p-1"
      >
        <div className="w-[20%] flex items-center">
          <Github className="w-4 h-4" />
        </div>
        <div className="w-[80%]">{GIT_HUB}</div>
      </Link>
      <ReceiptSeparator />
      <div className="flex flex-col w-full gap-y-2">
        <span>TOTAL COUNT :</span>
        <span>TOTAL : </span>
      </div>
      <ReceiptSeparator />
      <div className="flex flex-col w-full gap-y-1">
        <span>CARD : **** **** **** ****</span>
        <span>AUTH CODE : 123340</span>
      </div>
      <span className="mt-10">THANK YOU FOR VISITING!</span>
      <span className="mt-2 font-Libre_Barcode_39 text-6xl">recipe</span>
    </Receipt>
  );
};

export default ContactCard;
