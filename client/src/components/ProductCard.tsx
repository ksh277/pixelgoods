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
        className="unified-card"
      >
        {/* HOT 배지 (절대 위치) */}
        {product.isFeatured && (
          <div className="unified-card-badge">
            HOT
          </div>
        )}
        
        {/* 찜 하트 (절대 위치) */}
        <motion.button
          className={`unified-card-heart ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          }`}
          onClick={handleLike}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
        </motion.button>

        {/* 상단 이미지 영역 (60%) */}
        <div className="unified-card-image">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              loading="lazy"
            />
          ) : (
            <div className="unified-card-image-placeholder">
              <ImageIcon />
            </div>
          )}
        </div>

        {/* 하단 텍스트 영역 (40%) */}
        <div className="unified-card-content">
          <div className="unified-card-title">
            {language === 'ko' ? product.nameKo : product.name}
          </div>
          {/* 별점 표시 (리뷰가 있는 경우) */}
          {reviewCount > 0 && (
            <div className="unified-card-rating">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`${i < 4 ? 'fill-current' : ''}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}