// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../lib/prisma.js";
import { builtinModules } from "module";
import { unstable_getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res);

  if (req.method == "POST") {
    if (!session)
      return res
        .status(500)
        .json({ error: "Error getting ratings", success: false });
    console.log(req.body);
    return await createRating(req, res, session);
  } else if (req.method == "GET") {
    return await getRatings(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function getRatings(req, res) {
  try {
    const ratings = await prisma.rating.findMany({});
    // console.log(ratings);
    return res.status(200).json(ratings, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error getting ratings", success: false });
  }
}

async function createRating(req, res) {
  const body = req.body;
  try {
    const newRating = await prisma.rating.create({
      data: {
        name: body.name,
        category: body.category,
        rating: parseInt(body.rating),
        link: body.link,
      },
    });
    return res.status(200).json(newRating, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating rating", success: false });
  }
}
