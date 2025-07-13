import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
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

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    onToggleFavorite?.(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const formattedPrice = parseInt(product.basePrice).toLocaleString();

  return (
    <Link href={`/product/${product.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="rounded-xl bg-white shadow-md p-2 h-[270px] flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div className="relative">
          <motion.img
            src={product.imageUrl}
            alt={language === 'ko' ? product.nameKo : product.name}
            className="w-full h-[140px] object-cover rounded-md"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/api/placeholder/300/300";
            }}
          />

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

        <div className="flex flex-col flex-grow">
          {/* Product title - single line with ellipsis */}
          <h3 className="text-sm font-bold mt-2 truncate text-korean">
            {language === 'ko' ? product.nameKo : product.name}
          </h3>
          
          {/* Price */}
          <p className="text-xs text-gray-500 mt-1">
            ₩{formattedPrice} <span className="line-through text-gray-400">₩{parseInt(product.basePrice * 1.2).toLocaleString()}</span>
          </p>
          
          {/* Reviews */}
          <div className="flex items-center mt-1 gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">
              {t({ ko: "리뷰 234개", en: "234 reviews" })}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}