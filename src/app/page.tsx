"use server"

import { FeaturedCategories } from "@components/features/Home/featured-categories";
import { Hero } from "@components/features/Home/hero";
import { Newsletter } from "@components/features/Home/newsletter";
import { SpecialOffers } from "@components/features/Home/special-offers";
import { Testimonials } from "@components/features/Home/testimonials";
import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import { countCartAPI } from "@lib/api/cart";
const Home = async () => {
  const res = await countCartAPI();
  const countCart = res.statusCode === 200 ? res.data : 0
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header countCart={countCart} />
      <div>
        <Hero />
        <FeaturedCategories />
        <SpecialOffers />
        <Testimonials />
        {/* <Newsletter /> */}
      </div>
      <Footer />
    </div>
  );
}
export default Home;