"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
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
import { useEffect } from "react"
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

    useEffect(() => {
        reset({
            email: email
        })
    }, [email])

    const onSubmit = async (data: ActivateAccountFormData) => {
        try {
            const res = await activateAccountAPI(data);
            if (res.statusCode === 200) {
                notify.success(res.message);
                handleCancel();
                router.replace("/login")
            } else {
                notify.warning(res.message)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancel = () => {
        reset()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-bold text-3xl">Activate account</DialogTitle>
                    <DialogDescription> Enter the verification code sent to your email to activate your account!.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="font-bold text-sm">Email</label>
                        <Input
                            disabled
                            className="border border-slate-200"
                            placeholder="Enter your email" {...register("email")} />
                    </div>
                    {/* Category */}
                    <div>
                        <label className="font-bold text-sm">Code<span className="text-red-500">*</span></label>
                        <Input
                            className="border border-slate-200"
                            placeholder="Enter your code" {...register("code")} />
                        {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
                    </div>
                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Confirm
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent >
        </Dialog >
    )
}
