"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
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
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        }

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
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
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long"
        }

        // Validate confirm password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)

        // If no errors, log form data
        if (!newErrors.name && !newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
            console.log("Sign Up Form Data:", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })
        }
    }

    return (
        <div className="max-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-xl space-y-6 p-8 border-gray-200 shadow-md rounded-xl">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-bold text-center">Sign Up</CardTitle>
                    <CardDescription className="text-lg text-center">
                        Create a new account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-md font-medium">
                                Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`border-gray-200 h-12 text-base ${errors.name ? "border-destructive" : ""}`}
                            />
                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>

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
                            <label htmlFor="phone" className="text-md font-medium">
                                Phone number
                            </label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`border-gray-200 h-12 text-base ${errors.phone ? "border-destructive" : ""}`}
                            />
                            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-md font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Create a password (min. 6 characters)"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`border-gray-200 h-12 text-base ${errors.password ? "border-destructive" : ""}`}
                            />
                            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-md font-medium">
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`border-gray-200 h-12 text-base ${errors.confirmPassword ? "border-destructive" : ""}`}
                            />
                            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg">
                            Sign Up
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
