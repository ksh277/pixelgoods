import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
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
  const [isHovered, setIsHovered] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 200) + 50);
  const [isLiked, setIsLiked] = useState(isFavorite);
  const { language, t } = useLanguage();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    onToggleFavorite?.(product);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const formattedPrice = parseInt(product.basePrice).toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="group cursor-pointer overflow-hidden hover-lift bg-white shadow-sm border border-gray-200 h-full flex flex-col">
        <div className="relative">
          <motion.div className="aspect-[3/4] bg-gray-100 overflow-hidden">
            <motion.img
              src={product.imageUrl}
              alt={language === 'ko' ? product.nameKo : product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/api/placeholder/300/300";
              }}
            />
          </motion.div>
          
          {/* Overlay with hover effects - only on desktop */}
          <motion.div 
            className="absolute inset-0 bg-black/40 items-center justify-center hidden md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white/90 hover:bg-white text-foreground"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white/90 hover:bg-white text-foreground"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Like button */}
          <motion.button
            className={`absolute top-2 right-2 p-1.5 rounded-full ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700'
            } shadow-md transition-all duration-200 active:scale-95`}
            onClick={handleLike}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Featured badge */}
          {product.isFeatured && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5">
              HOT
            </Badge>
          )}
        </div>

        <CardContent className="p-3 flex flex-col flex-grow">
          {/* Likes and rating section */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-red-500">
              <Heart className="h-3 w-3 fill-current" />
              <span className="text-xs font-medium">{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">4.8</span>
            </div>
          </div>

          {/* Product title - single line with ellipsis */}
          <h3 className="font-bold text-sm text-gray-900 mb-1 truncate text-korean">
            {language === 'ko' ? product.nameKo : product.name}
          </h3>

          {/* Product description - 2 lines max */}
          <p className="text-xs text-gray-500 mb-3 line-clamp-2 text-korean flex-grow">
            {language === 'ko' ? product.descriptionKo : product.description}
          </p>

          {/* Price section - always at bottom */}
          <div className="flex items-center justify-between mt-auto">
            <div className="text-sm font-bold text-gray-900">
              ₩{formattedPrice}
            </div>
            <div className="text-xs text-gray-500">
              {t({ ko: "리뷰 234", en: "234 reviews" })}
            </div>
          </div>

          {/* Mobile add to cart button */}
          <div className="mt-2 md:hidden">
            <Button
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2"
              onClick={handleAddToCart}
            >
              {t({ ko: "담기", en: "Add to Cart" })}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}