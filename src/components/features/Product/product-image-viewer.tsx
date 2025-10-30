"use client"

import React, { useState, useRef } from "react"
import Image from "next/image"
import { X, Play } from "lucide-react"

interface ProductImageViewerProps {
    imageUrl: string
    videoUrl?: string
    productName: string
}

export function ProductImageViewer({
    imageUrl,
    videoUrl,
    productName,
}: ProductImageViewerProps) {
    const [showVideo, setShowVideo] = useState(false)
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
    const [isZooming, setIsZooming] = useState(false)
    const imageRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current || videoUrl) return

        const rect = imageRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setZoomPosition({ x, y })
    }

    const handleMouseEnter = () => {
        if (!videoUrl) setIsZooming(true)
    }

    const handleMouseLeave = () => {
        setIsZooming(false)
    }

    const handlePlayClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowVideo(true)
    }

    const handleCloseVideo = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowVideo(false)
    }

    return (
        <div className="relative">
            <div
                ref={imageRef}
                className="relative aspect-square overflow-hidden bg-muted border border-border/50 shadow-lg group cursor-pointer rounded-xl"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={productName}
                    fill
                    sizes=""
                    className={`object-cover transition-transform duration-300 ${isZooming ? "scale-150" : "scale-100"
                        }`}
                    style={
                        isZooming
                            ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                            : undefined
                    }
                />

                {/* Nút Play video */}
                {videoUrl && (
                    <div
                        onClick={handlePlayClick}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <div className="p-4 rounded-full bg-primary/90 backdrop-blur-sm">
                            <Play className="h-8 w-8 text-primary-foreground" />
                        </div>
                    </div>
                )}
            </div>

            {/* Popup Video */}
            {showVideo && videoUrl && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={handleCloseVideo}
                >
                    <div
                        className="relative w-full max-w-4xl aspect-video p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleCloseVideo}
                            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-background/90 hover:bg-background transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <video
                            src={videoUrl}
                            autoPlay
                            loop
                            muted
                            controls
                            className="w-full h-full object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}

            {!videoUrl && (
                <p className="text-sm text-muted-foreground text-center mt-4">
                    Hover over image to zoom in for details
                </p>
            )}
        </div>
    )
}
