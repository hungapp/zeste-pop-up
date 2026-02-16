"use client";

import { useState } from "react";
import Image from "next/image";

interface MenuUploadFormProps {
  menuType: "dessert" | "drink";
}

export default function MenuUploadForm({ menuType }: MenuUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("menuType", menuType);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Menu uploaded successfully! Refreshing page...",
        });
        setFile(null);
        setPreview(null);
        // Refresh the page to show the new menu
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to upload menu",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred during upload",
      });
    } finally {
      setUploading(false);
    }
  };

  const title = menuType === "dessert" ? "Dessert Menu" : "Drink Menu";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>

      {/* File Input */}
      <div className="mb-4">
        <label
          htmlFor={`file-${menuType}`}
          className="block w-full py-3 px-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-8 h-8 mx-auto mb-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="text-sm text-gray-600">
            {file ? file.name : "Choose image file"}
          </span>
        </label>
        <input
          id={`file-${menuType}`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="mb-4">
          <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full py-3 px-6 rounded-full font-medium transition-all ${
          !file || uploading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#2144c0] text-white hover:opacity-90 shadow-md"
        }`}
      >
        {uploading ? "Uploading..." : `Upload ${title}`}
      </button>

      {/* Message */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
