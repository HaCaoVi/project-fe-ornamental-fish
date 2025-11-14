"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Clock } from "lucide-react"
import { Button } from "@components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog"
import { Input } from "@components/ui/input"
import { useEffect, useState } from "react"
import { activateAccountAPI } from "@lib/api/auth"
import { notify } from "@lib/helpers/notify"
import { useRouter } from "next/navigation"

const activateAccountSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required" })
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Please enter a valid email address" }),
    code: z.string().min(1, "Code is required"),
})

export type ActivateAccountFormData = z.infer<typeof activateAccountSchema>

interface AuthCodeModalProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    email: string
}

export function AuthCodeModal({ open, onOpenChange, email }: AuthCodeModalProps) {
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ActivateAccountFormData>({
        resolver: zodResolver(activateAccountSchema),
        defaultValues: {
            email: "",
            code: ""
        },
    })

    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        if (!open) return;
        setTimeLeft(300);

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    notify.warning("The verification code has expired. Please request a new one.");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [open]);

    const formatTime = (t: number) => {
        const m = Math.floor(t / 60);
        const s = t % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    useEffect(() => {
        reset({ email: email });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    const onSubmit = async (data: ActivateAccountFormData) => {
        if (timeLeft <= 0) {
            notify.warning("Your verification code has expired. Please request a new one.");
            return;
        }

        try {
            const res = await activateAccountAPI(data);
            if (res.statusCode === 200) {
                notify.success(res.message);
                handleCancel();
                router.replace("/auth/login");
            } else {
                notify.warning(res.message);
            }
        } catch (error) {
            if (process.env.NODE_ENV === "development") {
                console.error(error);
            }
        }
    }

    const handleCancel = () => {
        reset();
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-bold text-3xl">Activate account</DialogTitle>
                    <DialogDescription>
                        Enter the verification code sent to your email to activate your account.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="font-bold text-sm">Email</label>
                        <Input
                            disabled
                            className="border border-slate-200"
                            placeholder="Enter your email" {...register("email")} />
                    </div>

                    {/* Code */}
                    <div>
                        <label className="font-bold text-sm">Code<span className="text-red-500">*</span></label>
                        <Input
                            className="border border-slate-200"
                            placeholder="Enter your code" {...register("code")} />
                        {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
                    </div>

                    {/* Timer */}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={16} />
                        <span>Code expires in: <strong>{formatTime(timeLeft)}</strong></span>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting || timeLeft <= 0}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Confirm
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
