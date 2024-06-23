"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

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
