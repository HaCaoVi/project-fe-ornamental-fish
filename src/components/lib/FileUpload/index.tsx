"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { uploadImageAPI, uploadVideoAPI } from "@lib/api/file";
import { cn } from "@components/lib/utils";
import { Input } from "@components/ui/input";
import { SquarePen, Upload } from "lucide-react";
import { Spinner } from "@components/ui/spinner";
import { MAX_IMAGE_SIZE, MAX_VIDEO_SIZE } from "@lib/constants/constant";

interface IProps {
    value: string;
    onChange: (v: string) => void;
    isImage?: boolean;
    isVideo?: boolean;
}

export default function FileUpload({ onChange, value, isImage, isVideo }: IProps) {
    const [preview, setPreview] = useState<string | null>(value || null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setError(null);

        const fileType = selectedFile.type;
        const validImage = fileType.startsWith("image/");
        const validVideo = fileType.startsWith("video/");

        if (isImage && !validImage) {
            setError("Please select a valid image file (jpg, png, jpeg...)");
            return;
        }

        if (isVideo && !validVideo) {
            setError("Please select a valid video file (mp4, mov, webm...)");
            return;
        }

        if (validImage && selectedFile.size > MAX_IMAGE_SIZE) {
            setError("Image file must be smaller than 5MB");
            return;
        }

        if (validVideo && selectedFile.size > MAX_VIDEO_SIZE) {
            setError("Video file must be smaller than 25MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(selectedFile);

        await handleUpload(selectedFile);
    };

    const handleUpload = async (fileToUpload: File) => {
        setUploading(true);
        try {
            const res = isVideo
                ? await uploadVideoAPI(fileToUpload)
                : await uploadImageAPI(fileToUpload);

            if (res.statusCode === 201 && res.data?.url) {
                setPreview(res.data.url);
                onChange(res.data.url);
                setError(null);
            } else {
                setError(res.message || "Upload failed!");
            }
        } catch (err) {
            console.error("Upload file error:", err);
            setError("An unexpected error occurred during upload.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-start space-y-2">
            <Input
                key={preview || "empty"}
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileChange}
            />

            <div
                onClick={() => !uploading && inputRef.current?.click()}
                className={cn(
                    "relative w-32 h-32 border rounded-md flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-200",
                    preview
                        ? "border-transparent"
                        : error
                            ? "border-red-500"
                            : "border-dashed border-gray-300 hover:border-gray-400",
                    uploading && "opacity-70 cursor-wait"
                )}
            >
                {preview ? (
                    <>
                        {isVideo ? (
                            <video
                                src={preview}
                                className="object-cover w-full h-full"
                                muted
                                playsInline
                                loop
                            />
                        ) : (
                            <Image
                                src={preview}
                                alt="Uploaded preview"
                                fill
                                sizes=""
                                className="object-cover"
                            />
                        )}

                        <div
                            className={cn(
                                "absolute inset-0 flex items-center justify-center text-white text-sm transition-opacity",
                                uploading
                                    ? "bg-black/40 opacity-100"
                                    : "bg-black/40 opacity-0 hover:opacity-100"
                            )}
                        >
                            {uploading ? <Spinner color="white" /> : <SquarePen />}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center text-gray-500 text-sm">
                        <Upload />
                        <span className="mt-1 text-xs">Upload {isVideo ? "video" : "image"}</span>
                    </div>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
