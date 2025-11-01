import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Mail } from "lucide-react"

export function Newsletter() {
    return (
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-foreground/10 rounded-full mb-6">
                        <Mail className="h-8 w-8" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Join Our Aquarium Community</h2>
                    <p className="text-lg text-primary-foreground/90 mb-8 text-pretty">
                        Subscribe to receive exclusive discounts, aquarium care tips, and updates on new arrivals
                    </p>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 h-12 bg-primary-foreground text-foreground border-0 rounded-full px-6"
                        />
                        <Button
                            type="submit"
                            size="lg"
                            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8"
                        >
                            Subscribe
                        </Button>
                    </form>

                    <p className="text-sm text-primary-foreground/70 mt-4">
                        Join 10,000+ aquarium enthusiasts. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    )
}
