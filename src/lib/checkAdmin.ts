import { db } from "./db";
import { env } from "./env";

export const checkAdmin = async () => {
  if (!env.ADMIN_CODE) return false;

  try {
    const admin = await db.adminCode.findUnique({
      where: {
        code: env.ADMIN_CODE,
      },
    });
    if (admin) return true;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
