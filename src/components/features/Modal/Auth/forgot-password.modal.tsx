"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, Clock, Loader2 } from "lucide-react"
import { Button } from "@components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@components/ui/dialog"
import { Input } from "@components/ui/input"
import { notify } from "@lib/helpers/notify"
import { forgotPasswordAPI, retryAccountAPI } from "@lib/api/auth"

const emailSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Please enter a valid email address" }),
})

const resetPasswordSchema = z
    .object({
        code: z.string().min(1, "Verification code is required"),
        password: z.string().min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

type EmailFormData = z.infer<typeof emailSchema>
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

interface ForgotPasswordModalProps {
    isOpen: boolean
    onClose: (value: boolean) => void
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
    const [step, setStep] = useState<"email" | "reset" | "success">("email")
    const [timeLeft, setTimeLeft] = useState(300)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [email, setEmail] = useState("")

    const emailForm = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    })

    const resetForm = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { code: "", password: "", confirmPassword: "" },
    })

    // Timer effect
    useEffect(() => {
        if (step !== "reset" || timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [step, timeLeft])

    useEffect(() => {
        if (!isOpen) {
            setStep("email")
            setTimeLeft(300)
            setShowPassword(false)
            setShowConfirmPassword(false)
            setSuccessMessage("")
            setEmail("")
            emailForm.reset()
            resetForm.reset()
        }
    }, [isOpen, emailForm, resetForm])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const onEmailSubmit = async (data: EmailFormData) => {
        try {
            const res = await retryAccountAPI(data.email);
            if (res.statusCode === 201) {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                setEmail(data.email)
                setSuccessMessage("Verification code sent to your email.")
                setTimeout(() => setSuccessMessage(""), 3000)
                setStep("reset")
                setTimeLeft(300)
            } else {
                notify.warning(res.message)
            }
        } catch (error) {
            emailForm.setError("email", { message: "Failed to send code. Please try again." })
        }
    }

    const onResetSubmit = async (data: ResetPasswordFormData) => {
        if (timeLeft <= 0) {
            resetForm.setError("code", { message: "Verification code has expired. Please request a new one." })
            return
        }
        try {
            const res = await forgotPasswordAPI(email, data.code, data.password)
            if (res.statusCode === 200) {
                await new Promise((resolve) => setTimeout(resolve, 1500))
                setStep("success")
                setTimeout(() => {
                    onClose(false)
                }, 300)
            } else {
                notify.warning(res.message)
            }
        } catch (error) {
            resetForm.setError("code", { message: "Failed to reset password. Please try again." })
        }
    }

    const handleResendCode = async () => {
        try {
            if (timeLeft <= 0) {
                resetForm.setError("code", { message: "Verification code has expired. Please request a new one." })
                return
            }
            const res = await retryAccountAPI(email);
            if (res.statusCode === 201) {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                setSuccessMessage("New verification code sent to your email.")
                setTimeout(() => setSuccessMessage(""), 3000)
                setTimeLeft(300)
            } else {
                notify.warning(res.message)
            }
        } catch (error) {
            console.error("Failed to resend code")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="min-w-100">
                {/* Header */}
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {step === "email" && "Forgot Password"}
                        {step === "reset" && "Verify & Reset Password"}
                        {step === "success" && "Password Reset"}
                    </DialogTitle>
                    <DialogDescription>
                        {step === "email" && "Enter your email to receive a verification code"}
                        {step === "reset" && "Enter the code and your new password"}
                        {step === "success" && "Your password has been successfully reset"}
                    </DialogDescription>
                </DialogHeader>

                {/* Content */}
                <div className="space-y-6">
                    {/* Success Message */}
                    {successMessage && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                            <p className="text-emerald-700 text-sm font-medium">{successMessage}</p>
                        </div>
                    )}

                    {/* Step 1: Email Input */}
                    {step === "email" && (
                        <form
                            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                            className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300"
                        >
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email<span className="text-red-500">*</span></label>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    {...emailForm.register("email")}
                                />
                                {emailForm.formState.errors.email && (
                                    <p className="text-red-500 text-sm mt-2">{emailForm.formState.errors.email.message}</p>
                                )}
                            </div>

                            <Button type="submit" disabled={emailForm.formState.isSubmitting} className="w-full">
                                {emailForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send Code
                            </Button>
                        </form>
                    )}

                    {/* Step 2: Reset Password */}
                    {step === "reset" && (
                        <form
                            onSubmit={resetForm.handleSubmit(onResetSubmit)}
                            className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300"
                        >
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Verification Code<span className="text-red-500">*</span></label>
                                <Input
                                    type="text"
                                    placeholder="Enter code"
                                    {...resetForm.register("code")}
                                />
                                <div className="flex items-center gap-1 text-xs text-slate-600">
                                    <Clock size={13} />
                                    <span>Code expires in: <strong>{formatTime(timeLeft)}</strong></span>
                                </div>
                                {resetForm.formState.errors.code && (
                                    <p className="text-red-500 text-xs mt-2">{resetForm.formState.errors.code.message}</p>
                                )}

                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">New Password<span className="text-red-500">*</span></label>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="At least 8 characters"
                                    {...resetForm.register("password")}
                                />

                                {resetForm.formState.errors.password && (
                                    <p className="text-red-500 text-sm mt-2">{resetForm.formState.errors.password.message}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password<span className="text-red-500">*</span></label>
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    {...resetForm.register("confirmPassword")}
                                />
                                {resetForm.formState.errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-2">{resetForm.formState.errors.confirmPassword.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" disabled={resetForm.formState.isSubmitting || timeLeft === 0} className="w-full">
                                {resetForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Reset Password
                            </Button>

                            {/* Resend Code Button */}
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleResendCode}
                                disabled={resetForm.formState.isSubmitting}
                                className="w-full"
                            >
                                Resend Code
                            </Button>
                        </form>
                    )}

                    {/* Step 3: Success */}
                    {step === "success" && (
                        <div className="space-y-6 text-center animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Password Reset Successful</h3>
                                <p className="text-slate-600">
                                    Your password has been successfully updated. You can now log in with your new password.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
