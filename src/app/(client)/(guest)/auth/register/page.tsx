"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { registerAPI } from "@lib/api/auth"
import { notify } from "@lib/helpers/notify"
import { Spinner } from "@components/ui/spinner"
import { AuthCodeModal } from "@components/features/Modal/Auth/auth-code.modal"
import { useState } from "react"

const registerSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string()
            .min(1, { message: "Email is required" })
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Please enter a valid email address" }),
        phone: z
            .string()
            .regex(/^(0|\+84)[0-9]{8,9}$/, "Invalid Vietnamese phone number"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export type RegisterFormData = z.infer<typeof registerSchema>

const RegisterPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const {
        getValues,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const { confirmPassword, ...rest } = data
            const res = await registerAPI(rest);
            if (res.statusCode === 201) {
                setIsModalOpen(true)
                notify.success(res.message);
            } else {
                notify.warning(res.message)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="max-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-xl space-y-6 p-8 border-slate-200 shadow-md rounded-xl">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-bold text-center">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-md font-semibold">Fullname<span className="text-red-500">*</span></label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                {...register("name")}
                                className={`border-slate-200 h-12 text-base ${errors.name ? "border-destructive" : ""}`}
                            />
                            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-md font-semibold">Email<span className="text-red-500">*</span></label>
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
                            <label htmlFor="phone" className="text-md font-semibold">Phone number<span className="text-red-500">*</span></label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                {...register("phone")}
                                className={`border-slate-200 h-12 text-base ${errors.phone ? "border-destructive" : ""}`}
                            />
                            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-md font-semibold">Password<span className="text-red-500">*</span></label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password (min. 8 characters)"
                                {...register("password")}
                                className={`border-slate-200 h-12 text-base ${errors.password ? "border-destructive" : ""}`}
                            />
                            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-md font-semibold">Confirm Password<span className="text-red-500">*</span></label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                {...register("confirmPassword")}
                                className={`border-slate-200 h-12 text-base ${errors.confirmPassword ? "border-destructive" : ""}`}
                            />
                            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
                        </div>
                        <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner color="white" /> : "Sign Up"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-primary hover:underline font-semibold">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
            <AuthCodeModal email={getValues("email")} onOpenChange={setIsModalOpen} open={isModalOpen} />
        </div>
    )
}

export default RegisterPage
