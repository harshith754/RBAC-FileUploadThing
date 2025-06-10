import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ message: "Error parsing form data" });
    }

    const fileField = files.file;
    const file = Array.isArray(fileField) ? fileField[0] : fileField;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: "file-upload-thing",
      });

      fs.unlinkSync(file.filepath);

      const savedFile = await prisma.file.create({
        data: {
          name: file.originalFilename || "Unnamed",
          url: result.secure_url,
          size: file.size || 0,
          user: {
            connect: { clerkId: userId },
          },
        },
      });

      return res.status(200).json({
        url: result.secure_url,
        message: "File uploaded and saved successfully",
        fileId: savedFile.id,
      });
    } catch (uploadError) {
      console.error("Cloudinary or DB error:", uploadError);
      return res
        .status(500)
        .json({ message: "Upload to Cloudinary or DB failed" });
    }
  });
}
