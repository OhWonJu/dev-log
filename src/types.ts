import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Document, Tag } from "prisma/prisma-client";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type IndexMap = {
  id: string;
  content: string;
  level: 2 | 3 | 1;
};

export type DocumentWithTags = Document & {
  tags: Tag[];
};
