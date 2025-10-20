"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Textarea } from "@components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required"
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            setIsSubmitting(true)
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setIsSubmitting(false)
            setIsSuccess(true)
            setFormData({ fullName: "", email: "", subject: "", message: "" })
            setErrors({})
            setTimeout(() => setIsSuccess(false), 3000)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Background gradient + animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background pointer-events-none" />
            <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse [animation-delay:1s] pointer-events-none" />

            <section className="relative pb-20 md:pb-32 mt-20">
                <div className="container mx-auto px-4">
                    {/* GRID */}
                    <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* FORM */}
                        <div className="lg:col-span-2 animate-in fade-in slide-in-from-left duration-700">
                            <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                                <CardContent className="p-8 md:p-10">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                            <Send className="h-6 w-6 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold">Send us</h2>
                                            <p className="text-sm text-muted-foreground">
                                                Fill out the form below and we'll get back to you soon
                                            </p>
                                        </div>
                                    </div>

                                    {isSuccess && (
                                        <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            <p className="text-sm font-medium text-green-500">
                                                Message sent successfully! We'll be in touch soon.
                                            </p>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2 group">
                                                <Label htmlFor="fullName">Full Name <span className="text-destructive">*</span></Label>
                                                <Input
                                                    id="fullName"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    placeholder="Enter name"
                                                    className={errors.fullName
                                                        ? "border-destructive focus-visible:ring-destructive"
                                                        : "focus-visible:ring-primary focus-visible:border-primary"}
                                                />
                                                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                                            </div>

                                            <div className="space-y-2 group">
                                                <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="Enter email"
                                                    className={errors.email
                                                        ? "border-destructive focus-visible:ring-destructive"
                                                        : "focus-visible:ring-primary focus-visible:border-primary"}
                                                />
                                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2 group">
                                                <Label htmlFor="subject">Subject <span className="text-destructive">*</span></Label>
                                                <Input
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    placeholder="How can we help you?"
                                                    className={errors.subject
                                                        ? "border-destructive focus-visible:ring-destructive"
                                                        : "focus-visible:ring-primary focus-visible:border-primary"}
                                                />
                                                {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                                            </div>

                                            <div className="space-y-2 group">
                                                <Label htmlFor="Phone">Phone <span className="text-destructive">*</span></Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    placeholder="Enter phone number"
                                                    className={errors.fullName
                                                        ? "border-destructive focus-visible:ring-destructive"
                                                        : "focus-visible:ring-primary focus-visible:border-primary"}
                                                />
                                                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2 group">
                                            <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us more about your inquiry..."
                                                rows={6}
                                                className={errors.message
                                                    ? "border-destructive focus-visible:ring-destructive"
                                                    : "focus-visible:ring-primary focus-visible:border-primary"}
                                            />
                                            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                                        </div>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            disabled={isSubmitting}
                                            className="w-full md:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:scale-100"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4 mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* CỘT PHẢI: Thông tin liên hệ + Bản đồ */}
                        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right duration-700">
                            {/* Thông tin liên hệ */}
                            <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Mail className="h-4 w-4 text-primary" />
                                        </div>
                                        Contact Information
                                    </h2>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-300">
                                            <MapPin className="h-5 w-5 text-primary mt-1" />
                                            <div>
                                                <p className="font-semibold text-sm">Address</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Hoa Tan<br />Chau Thanh, Dong Thap<br />Vietnam
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-300">
                                            <Phone className="h-5 w-5 text-primary mt-1" />
                                            <div>
                                                <p className="font-semibold text-sm">Phone</p>
                                                <a href="tel:+14155551234" className="text-sm text-muted-foreground hover:text-primary">
                                                    +84 0907626222
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-300">
                                            <Mail className="h-5 w-5 text-primary mt-1" />
                                            <div>
                                                <p className="font-semibold text-sm">Email</p>
                                                <a href="mailto:hello@company.com" className="text-sm text-muted-foreground hover:text-primary">
                                                    icaovy2001@gmail.com
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-300">
                                            <Clock className="h-5 w-5 text-primary mt-1" />
                                            <div>
                                                <p className="font-semibold text-sm">Working Hours</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Mon-Fri: 9:00 AM - 6:00 PM<br />
                                                    Sat: 10:00 AM - 4:00 PM<br />
                                                    Sun: Closed
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Bản đồ */}
                            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 group">
                                <CardContent className="p-0 relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0532902991636!2d105.72985667589333!3d10.01245707281849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0882139720a77%3A0x3916a227d0b95a64!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgQ-G6p24gVGjGoQ!5e0!3m2!1sen!2s!4v1760637373613!5m2!1sen!2s"
                                        width="100%"
                                        height="320"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Company Location"
                                        className="w-full grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
