import { db } from "./db";
import { env } from "./env";

export const checkAdmin = async () => {
  if (!env.ADMIN_CODE) return false;

  const admin = await db.adminCode.findUnique({
    where: {
      code: env.ADMIN_CODE,
    },
  });

  if (admin) return true;
  return false;
};
