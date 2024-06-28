// route -> /api/socket/io

import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIO } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
      cors: {
        origin: [
          "http://localhost:3000",
          process.env.NEXT_PUBLIC_SITE_URL!,
          process.env.NEXT_PUBLIC_SERVER_URL!,
        ],
        methods: ["GET", "POST", "PATCH", "DELETE"],
      },
    });
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
