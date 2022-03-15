import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/post
// required fields: title
// optional fields: content
export default async function handle(req, res) {
  const { title, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        connect: {
          email: session?.user?.email,
        },
      },
    },
  });
  res.json(result);
}
