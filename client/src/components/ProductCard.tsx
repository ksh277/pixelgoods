import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product & { reviewCount?: number; likeCount?: number };
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
  const [isLiked, setIsLiked] = useState(isFavorite);
  const { language, t } = useLanguage();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    onToggleFavorite?.(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const formattedPrice = parseInt(product.basePrice).toLocaleString();
  
  // Use actual database values
  const reviewCount = product.reviewCount || 0;
  const likeCount = product.likeCount || 0;

  return (
    <Link href={`/product/${product.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="product-card"
      >
        {/* Header: HOT badge and Like button */}
        <div className="flex justify-between items-start mb-2">
          {/* HOT badge */}
          {product.isFeatured && (
            <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              HOT
            </Badge>
          )}
          {!product.isFeatured && <div></div>}
          
          {/* Like button */}
          <motion.button
            className={`p-1.5 rounded-full ${
              isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
            } shadow-sm transition-all duration-200 active:scale-95`}
            onClick={handleLike}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Product Image */}
        <div className="product-card-image mb-3">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover rounded-md"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500">
                  {t({ ko: "이미지 준비중", en: "Image Coming Soon" })}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Product Content */}
        <div className="product-card-content">
          <div className="flex-1">
            <h3 className="product-card-name">
              {language === 'ko' ? product.nameKo : product.name}
            </h3>
            <p className="product-card-price">
              ₩{formattedPrice}
            </p>
          </div>

          {/* Footer: Reviews and Likes */}
          <div className="product-card-footer">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center">
                <Star className="h-3 w-3 mr-1" />
                {t({ ko: "리뷰", en: "Reviews" })}: {reviewCount}
              </span>
              <span className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                {t({ ko: "찜", en: "Likes" })}: {likeCount}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}