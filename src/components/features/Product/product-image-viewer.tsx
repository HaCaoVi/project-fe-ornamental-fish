"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, Play } from "lucide-react"
import { Card } from "@components/ui/card"

interface ProductImageViewerProps {
    imageUrl: string
    videoUrl?: string
    productName: string
}

export function ProductImageViewer({ imageUrl, videoUrl, productName }: ProductImageViewerProps) {
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
        if (videoUrl) {
            setShowVideo(true)
        } else {
            setIsZooming(true)
        }
    }

    const handleMouseLeave = () => {
        setShowVideo(false)
        setIsZooming(false)
    }

    return (
        <div className="relative">
            <Card
                ref={imageRef}
                className="relative aspect-square overflow-hidden bg-muted border-border/50 shadow-lg group cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={productName}
                    fill
                    className={`object-cover transition-transform duration-300 ${isZooming ? "scale-150" : "scale-100"}`}
                    style={
                        isZooming
                            ? {
                                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            }
                            : undefined
                    }
                />

                {videoUrl && !showVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="p-4 rounded-full bg-primary/90 backdrop-blur-sm">
                            <Play className="h-8 w-8 text-primary-foreground" />
                        </div>
                    </div>
                )}
            </Card>

            {/* Video Popup */}
            {showVideo && videoUrl && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg animate-in fade-in duration-200">
                    <div className="relative w-full h-full p-8">
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowVideo(false)
                            }}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/90 hover:bg-background transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <video src={videoUrl} autoPlay loop muted className="w-full h-full object-contain rounded-lg" />
                    </div>
                </div>
            )}

            {!videoUrl && (
                <p className="text-sm text-muted-foreground text-center mt-4">Di chuột qua ảnh để phóng to chi tiết</p>
            )}
        </div>
    )
}
