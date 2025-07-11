import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleFavorite, 
  isFavorite = false 
}: ProductCardProps) {
  const formatPrice = (price: string) => {
    return `₩${parseInt(price).toLocaleString()}`;
  };

  const generateStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="group cursor-pointer card-hover overflow-hidden">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.imageUrl}
            alt={product.nameKo}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite?.(product);
          }}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "text-red-500 fill-current" : "text-gray-600"}`} />
        </Button>

        {/* Featured Badge */}
        {product.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
            인기
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {product.nameKo}
          </h3>
        </Link>
        
        <div className="flex items-center mb-3">
          <div className="flex mr-2">
            {generateStars()}
          </div>
          <span className="text-sm text-muted-foreground">(127)</span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.descriptionKo}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">
            {formatPrice(product.basePrice)}
          </span>
          
          {/* Customization Options Preview */}
          {product.customizationOptions && (
            <div className="flex gap-1">
              {(product.customizationOptions as any)?.colors?.slice(0, 3).map((color: string, index: number) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: color.toLowerCase() === "clear" ? "transparent" : color.toLowerCase() }}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1 btn-primary"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.(product);
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            장바구니
          </Button>
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              커스터마이즈
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
