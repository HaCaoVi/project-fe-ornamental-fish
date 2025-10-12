"use client"

import type React from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="bg-card border-t border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">I</span>
                            </div>
                            <span className="text-xl font-bold text-foreground">IFish</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            The leading online store with thousands of high-quality products and excellent customer service.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>Hoa Tan, Chau Thanh, Dong Thap, Vietnam</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4 text-primary" />
                                <span>+84 0907626222</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4 text-primary" />
                                <span>icaovy2001@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
                        <ul className="space-y-2">
                            {["Home", "Product", "Blog", "Contact"].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Policies & Support</h3>
                        <ul className="space-y-2">
                            {["Privacy Policy", "Terms of Service", "Return Policy", "Shipping Info"].map((policy) => (
                                <li key={policy}>
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                                    >
                                        {policy}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Social Media</h3>
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="flex space-x-4">
                                {[
                                    { icon: FaFacebookF, href: "https://www.facebook.com/ThufyLaCuaTui", label: "Facebook" },
                                    { icon: FaInstagram, href: "https://www.instagram.com/icao201", label: "Instagram" },
                                    { icon: FaTwitter, href: "#", label: "Twitter" },
                                    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        target="_blank"
                                        key={label}
                                        href={href}
                                        className="w-13 h-13 bg-muted hover:bg-accent rounded-lg flex items-center justify-center transition-colors duration-200 group"
                                        aria-label={label}
                                    >
                                        <Icon className="w-7 h-7 text-muted-foreground group-hover:text-accent-foreground" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-muted-foreground">© 2025 IFish. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;