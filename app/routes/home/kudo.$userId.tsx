import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserById } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { userId } = params;
  if (typeof userId !== "string") {
    return redirect("/home");
  }
  const recipient = await getUserById(userId);

  return json({ recipient });
};

export default function KudoModal() {
  const { recipient } = useLoaderData();
  return (
    <h2>
      User: {recipient.profile.firstName} {recipient.profile.lastName}
    </h2>
  );
}
