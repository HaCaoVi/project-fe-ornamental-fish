import { Button } from "@components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section className="relative h-[600px] md:h-[900px] flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "url(/images/banner.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-background/60" />
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance leading-tight">
                    Bring the Ocean Home
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
                    Discover a world of vibrant fish, premium nutrition, and everything you need to create your perfect aquatic
                    paradise
                </p>
                <Button size="lg" className="text-lg px-8 py-6 rounded-full group">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </section>
    )
}
