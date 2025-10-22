"use client"

import type React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { useRouter } from "next/navigation"
import { ADMIN_ROLE, STAFF_ROLE } from "@lib/constants/constant"
import { notify } from "@lib/helpers/notify"
import { useAuthContext } from "@hooks/app.hook"
import { Spinner } from "@components/ui/spinner"
import { AuthCodeModal } from "@components/features/Modal/Auth/auth-code.modal"
import { useState } from "react"
import { retryAccountAPI } from "@lib/api/auth"
import { FcGoogle } from "react-icons/fc"
import { ForgotPasswordModal } from "@components/features/Modal/Auth/forgot-password.modal"
// Validation schema with zod
const loginSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required" })
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Please enter a valid email address" }),
    password: z.string()
        .min(1, { message: "Password is required" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginPage = () => {
    const router = useRouter()
    const { login } = useAuthContext()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const {
        getValues,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    })

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await login(data.email, data.password)
            if (res.statusCode === 201 && res.data) {
                notify.success(res.message)
                if (res.data.user.role === ADMIN_ROLE || res.data.user.role === STAFF_ROLE) {
                    router.replace("/dashboard")
                } else {
                    router.replace("/")
                }
            } else {
                notify.warning(res.message)
                if (res.statusCode === 409) {
                    setIsModalOpen(true);
                    handleRetryActiveAccount(data.email)
                }
            }
        } catch (error) {
            console.error("Login error: ", error);
        }
    }

    const handleRetryActiveAccount = async (email: string) => {
        try {
            const res = await retryAccountAPI(email);
            if (res.statusCode === 201) {
                notify.info(res.message);
            } else {
                notify.warning(res.message)
            }
        } catch (error) {
            console.error("Login error: ", error);
        }
    }

    const handleLoginWithGoogle = async () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/google`;
    }

    return (
        <div className="max-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-xl space-y-6 p-8 border-slate-200 shadow-md rounded-xl">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-bold text-center">Sign In</CardTitle>
                    <CardDescription className="text-lg text-center">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-md font-medium">
                                Email<span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className={`border-slate-200 h-12 text-base ${errors.email ? "border-destructive" : ""}`}
                            />
                            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-md font-medium">
                                Password<span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password")}
                                className={`border-slate-200 h-12 text-base ${errors.password ? "border-destructive" : ""}`}
                            />
                            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}

                            <div
                                onClick={() => setIsForgotPasswordModalOpen(true)}
                                className="text-right text-sm text-primary hover:underline font-medium cursor-pointer"
                            >
                                Forgot password?
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner color="white" /> : "Sign In"}
                        </Button>

                        <div className="flex items-center gap-2 mt-4">
                            <div className="h-px flex-1 bg-slate-300" />
                            <span className="text-sm text-muted-foreground">or</span>
                            <div className="h-px flex-1 bg-slate-300" />
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-12 text-base mt-3 flex items-center justify-center gap-3 border-slate-300 hover:bg-slate-100"
                            onClick={handleLoginWithGoogle}
                        >
                            <FcGoogle size={22} />
                            Continue with Google
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/auth/register" className="text-primary hover:underline font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
            <AuthCodeModal email={getValues("email")} onOpenChange={setIsModalOpen} open={isModalOpen} />
            <ForgotPasswordModal isOpen={isForgotPasswordModalOpen} onClose={setIsForgotPasswordModalOpen} />
        </div>

    )
}
export default LoginPage;