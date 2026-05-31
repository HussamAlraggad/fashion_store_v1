import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block card-hover"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-luxury-gray-light mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.compareAtPrice && (
          <span className="absolute top-3 left-3 bg-luxury-gold text-luxury-charcoal text-[10px] font-bold uppercase tracking-wider px-2 py-1">
            Sale
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-luxury-black/50 flex items-center justify-center">
            <span className="text-luxury-ivory font-display text-sm tracking-wider uppercase">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-gray font-body">
          {product.material}
        </p>
        <h3 className="font-display text-sm md:text-base text-luxury-charcoal group-hover:text-luxury-gold transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-body text-sm text-luxury-charcoal font-medium">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.compareAtPrice && (
            <span className="font-body text-xs text-luxury-gray line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-luxury-gold">
            {"★".repeat(Math.round(product.rating))}
          </span>
          <span className="text-xs text-luxury-gray">({product.reviewCount})</span>
        </div>
      </div>
    </Link>
  );
}
