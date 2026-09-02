import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import GoldPriceWidget from "@/components/home/GoldPriceWidget";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { getGoldPrice } from "@/lib/data/gold-prices";
import { categories } from "@/lib/data/categories";

export default function HomePage() {
  const goldPrice = getGoldPrice();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Gold Prices */}
        <section className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <GoldPriceWidget goldPrice={goldPrice} />
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 pb-12 lg:pb-16">
          <FeaturedProducts />
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 pb-12 lg:pb-16">
          <Categories categories={categories} />
        </section>

        {/* Why Choose Us */}
        <section className="max-w-7xl mx-auto px-4 pb-12 lg:pb-16">
          <WhyChooseUs />
        </section>
      </main>
      <Footer />
    </div>
  );
}
