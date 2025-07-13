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
        {/* 상단 HOT 배지 + 찜 하트 */}
        <div className="unified-card-top">
          {/* HOT 배지 */}
          {product.isFeatured && (
            <div className="unified-card-badge">
              HOT
            </div>
          )}
          
          {/* 찜 하트 */}
          <motion.button
            className={`unified-card-heart ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
            }`}
            onClick={handleLike}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* 이미지 영역 - 스크린샷과 같은 회색 박스 */}
        <div className="unified-card-image">
          <div className="w-full h-full bg-gray-300 rounded-md">
            {/* 항상 회색 박스로 표시 */}
          </div>
        </div>

        {/* 제품명 - 회색 박스 */}
        <div className="mt-2 mb-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>

        {/* 가격 - 회색 박스 */}
        <div className="mb-2">
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* 리뷰/찜 정보 - 회색 박스들 */}
        <div className="flex justify-between items-center mt-auto">
          <div className="h-3 bg-gray-300 rounded w-16"></div>
          <div className="h-3 bg-gray-300 rounded w-12"></div>
        </div>
      </motion.div>
    </Link>
  );
}