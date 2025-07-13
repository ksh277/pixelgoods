import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye, Plus, Minus, ImageIcon } from "lucide-react";
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
  const [likes, setLikes] = useState(product.likeCount || 0);
  const [reviews, setReviews] = useState(product.reviewCount || 0);
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

  const increaseLikes = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikes(prev => prev + 1);
  };

  const decreaseLikes = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikes(prev => Math.max(0, prev - 1));
  };

  const increaseReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setReviews(prev => prev + 1);
  };

  const decreaseReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setReviews(prev => Math.max(0, prev - 1));
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
        className="bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition-shadow duration-200 min-h-[420px] max-h-[420px] flex flex-col justify-between"
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

        {/* Image Section */}
        <div className="relative mb-3 flex-shrink-0">
          {product.imageUrl ? (
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
          ) : (
            <div className="w-full h-[140px] bg-gray-200 rounded-md flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-grow flex flex-col justify-between">
          {/* Product name and price */}
          <div className="mb-3">
            <h3 className="text-sm font-bold mb-1 text-korean line-clamp-1">
              {language === 'ko' ? product.nameKo : product.name}
            </h3>
            <p className="text-sm font-medium text-gray-900">
              ₩{formattedPrice}
            </p>
          </div>

          {/* Counters Section */}
          <div className="space-y-2">
            {/* Reviews counter */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">
                {t({ ko: "리뷰", en: "Reviews" })}:
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={decreaseReviews}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-xs font-medium min-w-[20px] text-center">
                  {reviews}
                </span>
                <button
                  onClick={increaseReviews}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Likes counter */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">
                {t({ ko: "찜", en: "Likes" })}:
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={decreaseLikes}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-xs font-medium min-w-[20px] text-center">
                  {likes}
                </span>
                <button
                  onClick={increaseLikes}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}