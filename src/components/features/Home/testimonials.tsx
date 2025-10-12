import { Card, CardContent } from "@components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
    {
        id: 1,
        name: "Sarah Mitchell",
        rating: 5,
        text: "Amazing selection of healthy fish! My betta is thriving and the customer service was exceptional. Highly recommend!",
        image: "/images/professional-woman-portrait.png",
    },
    {
        id: 2,
        name: "James Chen",
        rating: 5,
        text: "The starter kit was perfect for my first aquarium. Everything arrived in perfect condition and the setup guide was incredibly helpful.",
        image: "/images/professional-man-portrait.png",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        rating: 5,
        text: "Best aquarium store online! The fish food quality is outstanding and my fish have never looked more vibrant. Will definitely order again.",
        image: "/images/smiling-woman-portrait.png",
    },
]

export function Testimonials() {
    return (
        <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">What Our Customers Say</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Join thousands of happy aquarium enthusiasts who trust us
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="border-2 hover:border-primary/50 transition-colors">
                            <CardContent className="p-8">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="text-foreground/80 mb-6 text-pretty leading-relaxed">"{testimonial.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div
                                        className="h-12 w-12 rounded-full bg-cover bg-center"
                                        style={{ backgroundImage: `url(${testimonial.image})` }}
                                    />
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">Verified Customer</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
