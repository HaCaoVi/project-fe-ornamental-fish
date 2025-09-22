import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-6 text-balance">Welcome to Our E-commerce Store</h1>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            This is a demo page showcasing the responsive header and footer components for an online store. The design
            includes modern styling, company information, quick navigation, and newsletter subscription.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Premium Products", desc: "High-quality items from trusted brands" },
              { title: "Fast Shipping", desc: "Quick delivery to your doorstep" },
              { title: "24/7 Support", desc: "Customer service whenever you need it" },
              { title: "Secure Payment", desc: "Safe and encrypted transactions" },
              { title: "Easy Returns", desc: "Hassle-free return policy" },
              { title: "Best Prices", desc: "Competitive pricing on all products" },
            ].map((item, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
