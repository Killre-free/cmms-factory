"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export function useFileUpload() {
  const [isLoading, setIsLoading] = useState(false);

  const upload = async (file: File, folder: string) => {
    if (!file) {
      toast.error("Please select a file");
      return null;
    }

    const maxSize = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || "10485760");
    if (file.size > maxSize) {
      toast.error(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return null;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      toast.success("File uploaded successfully");
      return data.path;
    } catch (error) {
      toast.error("Failed to upload file");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { upload, isLoading };
}
