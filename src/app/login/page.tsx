"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors = {
            email: "",
            password: "",
        }

        // Validate email
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = "Password is required"
        }

        setErrors(newErrors)

        // If no errors, log form data
        if (!newErrors.email && !newErrors.password) {
            console.log("Sign In Form Data:", formData)
        }
    }

    return (
        <div className="max-h-screen flex items-center justify-center bg-background ">
            <Card className="w-full max-w-xl space-y-6 p-8 border-gray-200 shadow-md rounded-xl">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-bold text-center">Sign In</CardTitle>
                    <CardDescription className="text-lg text-center">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-md font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`border-gray-200 h-12 text-base ${errors.email ? "border-destructive" : ""}`}
                            />
                            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-md font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`border-gray-200 h-12 text-base ${errors.password ? "border-destructive" : ""}`}
                            />
                            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg">
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-primary hover:underline font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
