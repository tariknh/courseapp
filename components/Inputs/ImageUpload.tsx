import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";

interface ImageUploadProps {
  onChange?: (value: string) => void;
  value?: string;
}

export const uploadMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]!;
  try {
    // POST request to backend route handler
    const res = await fetch(`/api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      }),
    });

    // Response includes a putUrl for upload and a getUrl for displaying a preview
    const { putUrl, getUrl } = await res.json();

    // Request made to putUrl, media file included in body
    const uploadResponse = await fetch(putUrl, {
      body: file,
      method: "PUT",
      headers: { "Content-Type": file.type },
    });

    return { status: uploadResponse.ok, uploadedUrl: getUrl };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;

    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    //const res = await fetch(`/api/?file=${filename}&fileType=${fileType}`);
    const res = await fetch(`/api/?file=${filename}&fileType=${fileType}`);

    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      console.log("Uploaded successfully!");
      toast.success("Uploaded successfully!");
    } else {
      console.error("Upload failed.");
    }
  };
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image src={value} alt="Upload" style={{ objectFit: "cover" }} />
            </div>
          )}
          <Input
            onChange={uploadMedia}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
