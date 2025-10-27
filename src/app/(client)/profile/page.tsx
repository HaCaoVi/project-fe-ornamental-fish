'use server'

import { ProfilePage } from "@components/features/Profile/profile-page";
import { viewProfileAPI } from "@lib/api/auth";

const ProfileRoot = async () => {
    const res = await viewProfileAPI();
    if (res.statusCode === 200 && res.data) {
        return <ProfilePage data={res.data} />
    } else {
        return null
    }
}
export default ProfileRoot;