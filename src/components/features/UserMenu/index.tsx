"use client"

import { Button } from "@components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react"
import { useAuthContext } from "@hooks/app.hook"
import { notify } from "@lib/helpers/notify"
import { useRouter } from "next/navigation"
import { IUserLogin } from "../../../types/backend"
import { getInitials } from "@lib/helpers/convert.helper"

interface IProps {
    user: IUserLogin
}

const UserMenu = ({ user }: IProps) => {
    const { logout } = useAuthContext();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res.statusCode === 201) {
                notify.success(res.message);
                return router.replace("/")
            }
            notify.warning(res.message)
        } catch (error) {
            console.error("Logout error: ", error);
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="relative h-9 w-9 rounded-full hover:bg-black">
                    <Avatar className="h-9 w-9 border border-gray-700">
                        <AvatarImage src={user.avatar} alt="User" />
                        <AvatarFallback className="text-gray-700">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserMenu;