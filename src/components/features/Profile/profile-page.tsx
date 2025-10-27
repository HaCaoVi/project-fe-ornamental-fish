"use client"

import { useState } from "react"
import { ProfileHeader } from "./profile-header"
import { ProfileForm } from "./profile-form"
import { ChangePasswordModal } from "./change-password-modal"
import { notify } from "@lib/helpers/notify"
import { IUser } from "../../../types/model"

export interface ProfileData {
  data: IUser
}
export function ProfilePage({ data }: ProfileData) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)


  const handlePasswordChange = () => {
    setIsPasswordModalOpen(false)
    notify.success('Profile updated successfully')
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Your Profile</h1>
          <p className="mt-2 text-muted-foreground">Manage your personal information and account settings</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Panel */}
          <ProfileHeader
            profile={data}
            onEditClick={() => { }}
            onChangePasswordClick={() => setIsPasswordModalOpen(true)}
          />

          {/* Right Panel */}
          <div className="lg:col-span-2">
            <ProfileForm profile={data} />
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordChange}
      />
    </main>
  )
}
