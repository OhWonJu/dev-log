"use client";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

const ChatsPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Button>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a Chat
      </Button>
    </div>
  );
};

export default ChatsPage;
