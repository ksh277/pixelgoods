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
    >
      <Card className="group cursor-pointer overflow-hidden hover-lift bg-card/80 backdrop-blur-sm border-border/50">
        <div className="relative">
          <motion.img
            src={product.imageUrl}
            alt={language === 'ko' ? product.nameKo : product.name}
            className="w-full h-64 object-cover"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/api/placeholder/300/300";
            }}
          />
          
          {/* Overlay with hover effects */}
          <motion.div 
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
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
            className={`absolute top-3 right-3 p-2 rounded-full ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-foreground'
            } shadow-md hover:scale-110 transition-all duration-200`}
            onClick={handleLike}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Featured badge */}
          {product.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
              {t({ ko: "인기", en: "Popular" })}
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-accent">
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
              <span className="text-xs text-muted-foreground ml-1">4.8</span>
            </div>
          </div>

          <h3 className="font-semibold text-foreground mb-2 text-korean text-tight line-clamp-2">
            {language === 'ko' ? product.nameKo : product.name}
          </h3>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 text-korean">
            {language === 'ko' ? product.descriptionKo : product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-primary">
              ₩{formattedPrice}
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="sm"
                className="btn-primary text-xs px-3 py-1"
                onClick={handleAddToCart}
              >
                {t({ ko: "담기", en: "Add" })}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}