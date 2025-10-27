"use client"

import { useRef, useState } from "react"
import { Button } from "@components/ui/button"
import { Card } from "@components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Edit2, Lock, Upload } from "lucide-react"
import { IUser } from "../../../types/model"
import { format } from "date-fns"
import { uploadImageAPI } from "@lib/api/file"
import { notify } from "@lib/helpers/notify"
import { updateAvatarAPI } from "@lib/api/user"

interface ProfileHeaderProps {
  profile: IUser
  onEditClick: () => void
  onChangePasswordClick: () => void
  onAvatarChange?: (file: File) => void // 👈 callback khi người dùng chọn ảnh
}

export function ProfileHeader({
  profile,
  onEditClick,
  onChangePasswordClick,
}: ProfileHeaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (file) {
        const resUpload = await uploadImageAPI(file);
        if (resUpload.statusCode === 201 && resUpload.data) {
          setPreviewUrl(resUpload.data.url)
          const res = await updateAvatarAPI(resUpload.data.url);
          if (res.statusCode === 200) {
            notify.success(res.message)
          } else {
            notify.warning(res.message)
          }
        } else {
          notify.warning(resUpload.message || "Upload failed!");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="overflow-hidden bg-card/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={previewUrl || profile.avatar || "/user-avatar.jpg"} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Hidden input file */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-primary-foreground shadow-md transition-transform hover:scale-110"
            >
              <Upload className="h-4 w-4" />
            </button>
          </div>

          <h2 className="text-center text-2xl font-bold text-foreground">{profile.name}</h2>
          <p className="mt-1 text-center text-sm text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      <div className="space-y-3 p-6">
        <Button onClick={onEditClick} variant="outline" className="w-full justify-center gap-2 bg-transparent">
          <Edit2 className="h-4 w-4" />
          Edit Profile
        </Button>
        <Button
          onClick={onChangePasswordClick}
          variant="outline"
          className="w-full justify-center gap-2 bg-transparent"
        >
          <Lock className="h-4 w-4" />
          Change Password
        </Button>
      </div>

      <div className="border-t border-border px-6 py-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Member since</span>
            <span className="font-medium text-foreground">{format(profile.createdAt, "PPP")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last updated</span>
            <span className="font-medium text-foreground">{format(new Date(profile.updatedAt), "PPP p")}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
