import { ActionFunction, json } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  
  const imageUrl = await uploadAvatar(request);

  // 3
  await prisma.user.update({
    data: {
      profile: {
        update: {
          profilePicture: imageUrl,
        },
      },
    },
    where: {
      id: userId,
    },
  });

  // 4
  return json({ imageUrl });
};