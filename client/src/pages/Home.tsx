import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Heart, MessageCircle, ShoppingCart, Star, Eye, ArrowRight, ChevronRight, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Hero } from "@/components/Hero";
import { CategoryNav } from "@/components/CategoryNav";
import { SectionHeader } from "@/components/SectionHeader";
import { UserReviewsSection } from "@/components/UserReviewsSection";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import type { Product } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [favorites, setFavorites] = useState<number[]>([]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/products"],
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Mock data for enhanced sections
  const creatorReviews = [
    {
      id: 1,
      productImage: "/api/placeholder/300/300",
      productName: "홀로그램 아크릴 키링",
      userName: "창작자님***",
      rating: 5,
      date: "2025.01.10",
      reviewCount: 127,
      comment: "퀄리티가 정말 좋아요! 색감도 예쁘고 홀로그램 효과가 환상적이에요",
      tags: ["홀로그램", "아크릴", "키링"]
    },
    {
      id: 2,
      productImage: "/api/placeholder/300/300",
      productName: "투명 아크릴 스탠드",
      userName: "디자이너***",
      rating: 5,
      date: "2025.01.09",
      reviewCount: 89,
      comment: "투명도가 완벽하고 마감이 깔끔해요. 캐릭터가 생생하게 보입니다",
      tags: ["투명", "스탠드", "아크릴"]
    },
    {
      id: 3,
      productImage: "/api/placeholder/300/300",
      productName: "우드 키링 세트",
      userName: "작가님***",
      rating: 4,
      date: "2025.01.08",
      reviewCount: 156,
      comment: "나무 질감이 좋고 레이저 각인이 선명해요. 선물용으로 최고!",
      tags: ["우드", "키링", "레이저각인"]
    }
  ];

  const communityShowcase = [
    {
      id: 1,
      image: "/api/placeholder/300/300",
      title: "나만의 캐릭터 키링 완성!",
      likes: 245,
      comments: 18,
      tags: ["캐릭터", "키링", "커스텀"],
      author: "네기디***"
    },
    {
      id: 2,
      image: "/api/placeholder/300/300",
      title: "홀로그램 스티커 대박!",
      likes: 189,
      comments: 24,
      tags: ["홀로그램", "스티커", "반짝"],
      author: "모토***"
    },
    {
      id: 3,
      image: "/api/placeholder/300/300",
      title: "투명 아크릴 스탠드 후기",
      likes: 167,
      comments: 12,
      tags: ["투명", "스탠드", "아크릴"],
      author: "짱구***"
    },
    {
      id: 4,
      image: "/api/placeholder/300/300",
      title: "레진 키링 DIY 성공!",
      likes: 134,
      comments: 15,
      tags: ["레진", "DIY", "키링"],
      author: "토루***"
    }
  ];

  const materialRecommendations = [
    {
      id: 1,
      image: "/api/placeholder/300/300",
      title: "프리미엄 홀로그램 키링",
      price: 12000,
      originalPrice: 15000,
      reviewCount: 245,
      badge: "HIT",
      material: "홀로그램",
      discount: 20
    },
    {
      id: 2,
      image: "/api/placeholder/300/300",
      title: "투명 아크릴 스탠드",
      price: 8000,
      reviewCount: 189,
      badge: "NEW",
      material: "투명아크릴",
      discount: 0
    },
    {
      id: 3,
      image: "/api/placeholder/300/300",
      title: "미러 아크릴 키링",
      price: 10000,
      reviewCount: 167,
      badge: "추천",
      material: "미러",
      discount: 0
    },
    {
      id: 4,
      image: "/api/placeholder/300/300",
      title: "원목 레이저 키링",
      price: 9000,
      reviewCount: 134,
      badge: "HIT",
      material: "원목",
      discount: 0
    }
  ];

  const instagramFeed = [
    { id: 1, image: "/api/placeholder/300/300", likes: 125, comments: 8 },
    { id: 2, image: "/api/placeholder/300/300", likes: 98, comments: 12 },
    { id: 3, image: "/api/placeholder/300/300", likes: 156, comments: 15 },
    { id: 4, image: "/api/placeholder/300/300", likes: 89, comments: 6 },
    { id: 5, image: "/api/placeholder/300/300", likes: 234, comments: 18 },
    { id: 6, image: "/api/placeholder/300/300", likes: 167, comments: 9 },
    { id: 7, image: "/api/placeholder/300/300", likes: 145, comments: 11 },
    { id: 8, image: "/api/placeholder/300/300", likes: 201, comments: 16 }
  ];

  const handleAddToCart = (product: Product) => {
    toast({
      title: t({ ko: "장바구니에 추가되었습니다", en: "Added to cart" }),
      description: `${product.nameKo || product.name}`,
    });
  };

  const handleToggleFavorite = (product: Product) => {
    setFavorites(prev => 
      prev.includes(product.id) 
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
    toast({
      title: t({ ko: "찜 목록에 추가되었습니다", en: "Added to favorites" }),
      description: `${product.nameKo || product.name}`,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CategoryNav />
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Popular Products Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Mobile-Optimized Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔥</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  {t({ ko: "인기상품", en: "Popular Items" })}
                </h2>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {t({ ko: "지금 가장 핫한 아이템들을 만나보세요", en: "Meet the hottest items right now" })}
                </p>
              </div>
            </div>
            <Link href="/products">
              <Button variant="ghost" size="sm" className="text-primary">
                {t({ ko: "더보기", en: "View More" })} <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile-First 2-Column Product Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            variants={containerVariants}
          >
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                    <div className="aspect-square bg-gray-200 animate-pulse" />
                    <div className="p-3">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 animate-pulse rounded" />
                        <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3" />
                        <div className="h-2 bg-gray-200 animate-pulse rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              products?.slice(0, 4).map((product: Product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative aspect-square">
                        {/* HOT Badge - Top Left */}
                        <div className="absolute top-2 left-2 z-10">
                          <Badge className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            HOT
                          </Badge>
                        </div>
                        
                        {/* Product Image */}
                        <img
                          src="/api/placeholder/300/300"
                          alt={product.nameKo || product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/api/placeholder/300/300";
                          }}
                        />
                        
                        {/* Like Button - Top Right */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleFavorite(product);
                          }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Heart 
                            className={`w-3 h-3 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                          />
                        </button>
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-3">
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm leading-tight text-gray-900 line-clamp-2">
                            {product.nameKo || product.name}
                          </h3>
                          <div className="text-sm font-medium text-gray-900">
                            {parseInt(product.basePrice).toLocaleString()} won
                          </div>
                          <div className="text-xs text-gray-500">
                            {t({ ko: "리뷰", en: "Reviews" })} {Math.floor(Math.random() * 10000) + 1000}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.section>

        {/* Creator Reviews Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Mobile-Optimized Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤗</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  {t({ ko: "창작자들의 소중한 리뷰", en: "Precious Reviews from Creators" })}
                </h2>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {t({ ko: "실제 창작자들이 남긴 생생한 후기를 확인해보세요", en: "Check out vivid reviews from real creators" })}
                </p>
              </div>
            </div>
            <Link href="/reviews">
              <Button variant="ghost" size="sm" className="text-primary">
                {t({ ko: "더보기", en: "View More" })} <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            variants={containerVariants}
          >
            {creatorReviews.map((review) => (
              <motion.div key={review.id} variants={itemVariants}>
                <Link href={`/product/${review.id}`} className="block">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-square">
                      {/* HOT Badge */}
                      <div className="absolute top-2 left-2 z-10">
                        <Badge className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                          HOT
                        </Badge>
                      </div>
                      
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        {review.reviewCount}개 리뷰
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <h3 className="font-bold text-sm leading-tight text-gray-900 line-clamp-2">
                          {review.productName}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {review.comment}
                        </p>
                        <div className="text-xs text-gray-500">
                          {review.userName} • {review.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Community Showcase */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔥</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  {t({ ko: "굿즈 자랑 커뮤니티", en: "Goods Showcase Community" })}
                </h2>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {t({ ko: "멋진 굿즈들을 자랑해보세요", en: "Show off your amazing goods" })}
                </p>
              </div>
            </div>
            <Link href="/community">
              <Button variant="ghost" size="sm" className="text-primary">
                {t({ ko: "더보기", en: "View More" })} <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            variants={containerVariants}
          >
            {communityShowcase.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link href={`/community/${item.id}`} className="block">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-square">
                      <div className="absolute top-2 left-2 z-10">
                        <Badge className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                          인기
                        </Badge>
                      </div>
                      
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Heart className="h-3 w-3 text-red-400" />
                            <span className="text-xs">{item.likes}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="h-3 w-3 text-blue-400" />
                            <span className="text-xs">{item.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <div className="space-y-1">
                        <h3 className="font-bold text-sm leading-tight text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="text-xs text-gray-500">
                          {item.author}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Material Recommendations */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✨</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  {t({ ko: "자재별 추천", en: "Material-Based Recommendations" })}
                </h2>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {t({ ko: "원하는 재질의 완벽한 굿즈를 찾아보세요", en: "Find perfect goods with your desired materials" })}
                </p>
              </div>
            </div>
            <Link href="/products">
              <Button variant="ghost" size="sm" className="text-primary">
                {t({ ko: "더보기", en: "View More" })} <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            variants={containerVariants}
          >
            {materialRecommendations.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link href={`/product/${item.id}`} className="block">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-square">
                      <Badge className={`absolute top-2 left-2 z-10 ${
                        item.badge === 'HIT' ? 'bg-red-500' : 
                        item.badge === 'NEW' ? 'bg-green-500' : 'bg-orange-500'
                      } text-white text-xs font-bold px-2 py-1 rounded`}>
                        {item.badge}
                      </Badge>
                      
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      {/* Heart Button - Top Right */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                        <Heart className="w-3 h-3 text-gray-600" />
                      </button>
                      
                      {item.discount > 0 && (
                        <div className="absolute top-10 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                          -{item.discount}%
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3">
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs mb-1">
                          {item.material}
                        </Badge>
                        <h3 className="font-bold text-sm leading-tight text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">
                            {item.price.toLocaleString()} won
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">
                              {item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {t({ ko: "리뷰", en: "Reviews" })} {item.reviewCount}개
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* User Reviews Section */}
        <UserReviewsSection />

        {/* Instagram Feed */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📸</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  {t({ ko: "인스타그램 피드", en: "Instagram Feed" })}
                </h2>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {t({ ko: "@allthatprinting_ 최신 소식을 확인해보세요", en: "Check out the latest from @allthatprinting_" })}
                </p>
              </div>
            </div>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
            variants={containerVariants}
          >
            {instagramFeed.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <div className="relative aspect-square group cursor-pointer">
                  <img
                    src={post.image}
                    alt={`Instagram post ${post.id}`}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center space-x-4 text-white">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>


    </div>
  );
}