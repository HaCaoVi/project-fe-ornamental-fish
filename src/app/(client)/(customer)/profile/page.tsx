'use server'

import { ProfilePage } from "@components/features/Profile/profile-page";
import { viewProfileAPI } from "@lib/api/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile Page",
};

const ProfileRoot = async () => {
    const res = await viewProfileAPI();
    if (res.statusCode === 200 && res.data) {
        return <ProfilePage data={res.data} />
    } else {
        return null
    }
}
export default ProfileRoot;