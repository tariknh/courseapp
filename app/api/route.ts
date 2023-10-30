import aws from "aws-sdk";
import S3 from "aws-sdk/clients/s3";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  const { fileName, fileType, fileSize } = await req.json();
  console.log(fileName);
  const s3 = new S3({
    apiVersion: "2006-03-01",
  });

  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: req.body,
      "Content-Type": req,
    },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], // up to 1 MB
    ],
  });

  return Response.json({ post });
}
