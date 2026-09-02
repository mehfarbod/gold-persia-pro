import Link from "next/link";
import { Category } from "@/lib/types";
import {
  Gem,
  Circle,
  LinkIcon,
  Star,
  Award,
  Coins,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  rings: <Gem className="w-6 h-6" />,
  necklaces: <LinkIcon className="w-6 h-6" />,
  bracelets: <Circle className="w-6 h-6" />,
  earrings: <Star className="w-6 h-6" />,
  pendants: <Award className="w-6 h-6" />,
  coins: <Coins className="w-6 h-6" />,
};

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
          دسته‌بندی محصولات
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          مجموعه‌ای متنوع از طلا و جواهرات
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.slug}`}
            className="group flex flex-col items-center gap-3 p-5 bg-card border border-border rounded-xl hover:border-gold/30 hover:shadow-md transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-secondary/50 group-hover:bg-gold/10 flex items-center justify-center text-muted-foreground group-hover:text-gold transition-colors">
              {categoryIcons[cat.slug] || <Gem className="w-6 h-6" />}
            </div>
            <div className="text-center">
              <h3 className="text-sm font-semibold text-foreground">{cat.name}</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {cat.productCount} محصول
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
