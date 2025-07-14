import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Heart, MessageCircle, ShoppingCart, Eye, ArrowRight, ChevronRight, Puzzle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Hero } from "@/components/Hero";
import { CategoryNav } from "@/components/CategoryNav";
import { SectionHeader } from "@/components/SectionHeader";
import { UserReviewsSection } from "@/components/UserReviewsSection";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { ProductCard } from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import type { Product } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const isMobile = useIsMobile();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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
    },
    {
      id: 4,
      productImage: "/api/placeholder/300/300",
      productName: "반투명 스마트톡",
      userName: "사용자***",
      rating: 5,
      date: "2025.01.07",
      reviewCount: 203,
      comment: "접착력도 좋고 회전도 부드러워요. 디자인이 너무 예뻐서 자랑하고 다녀요",
      tags: ["반투명", "스마트톡", "회전"]
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
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CategoryNav />
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        {/* Popular Products Section */}
        <motion.section
          className="section-spacing"
          variants={containerVariants}
          initial="visible"
          animate="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Section Header */}
          <div className="flex items-center justify-between section-header">
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
              <button className="text-sm text-blue-500 hover:underline flex items-center">
                {t({ ko: "더보기", en: "View More" })} <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
          </div>

          {/* 모바일 2x2 그리드 시스템 */}
          {isLoading ? (
            <ProductCardSkeleton count={4} className="gap-2 sm:gap-3 lg:gap-4" />
          ) : (
            <motion.div 
              className="popular-products-grid"
              variants={containerVariants}
              style={{ opacity: 1 }}
            >
              {products?.slice(0, 4).map((product: Product) => (
                <motion.div key={product.id} variants={itemVariants} style={{ opacity: 1 }}>
                  <ProductCard
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onAddToCart={handleAddToCart}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>

        {/* Creator Reviews Section */}
        <motion.section
          className="section-spacing"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <div className="flex items-center justify-between section-header">
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
              <button className="text-sm text-blue-500 hover:underline flex items-center">
                {t({ ko: "더보기", en: "View More" })} <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
          </div>

          <motion.div 
            className="allprint-grid"
            variants={containerVariants}
          >
            {creatorReviews.map((review) => (
              <motion.div key={review.id} variants={itemVariants}>
                <Link href={`/product/${review.id}`} className="block">
                  <div className="allprint-card">
                    {/* 상단 이미지 영역 (70%) */}
                    <div className="allprint-card-image">
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        loading="lazy"
                      />
                      
                      {/* HOT 배지 (왼쪽 상단 절대 위치) */}
                      <div className="allprint-card-hot-badge">
                        HOT
                      </div>
                      
                      {/* LIKE 수 배지 (오른쪽 상단 절대 위치) */}
                      <div className="allprint-card-like-badge">
                        LIKE {review.rating * 40 + 120}
                      </div>
                    </div>
                    
                    {/* 하단 텍스트 영역 (30%) */}
                    <div className="allprint-card-content">
                      <div className="allprint-card-title">
                        {review.productName}
                      </div>
                      
                      <div className="allprint-card-price">
                        ₩ {(review.rating * 1200 + 3500).toLocaleString()}
                      </div>
                      
                      <div className="allprint-card-stats">
                        리뷰 {review.rating * 25 + 45} / LIKE {review.rating * 40 + 120}
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
          className="section-spacing"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center justify-between section-header">
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
              <button className="text-sm text-blue-500 hover:underline flex items-center">
                {t({ ko: "더보기", en: "View More" })} <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
          </div>

          <motion.div 
            className="allprint-grid"
            variants={containerVariants}
          >
            {communityShowcase.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link href={`/community/${item.id}`} className="block">
                  <div className="allprint-card">
                    {/* 상단 이미지 영역 (70%) */}
                    <div className="allprint-card-image">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                      />
                      
                      {/* HOT 배지 (왼쪽 상단 절대 위치) */}
                      <div className="allprint-card-hot-badge">
                        인기
                      </div>
                      
                      {/* LIKE 수 배지 (오른쪽 상단 절대 위치) */}
                      <div className="allprint-card-like-badge">
                        LIKE {item.likes}
                      </div>
                    </div>
                    
                    {/* 하단 텍스트 영역 (30%) */}
                    <div className="allprint-card-content">
                      <div className="allprint-card-title">
                        {item.title}
                      </div>
                      
                      <div className="allprint-card-price">
                        @{item.author}
                      </div>
                      
                      <div className="allprint-card-stats">
                        리뷰 {item.comments} / LIKE {item.likes}
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
          className="section-spacing"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center justify-between section-header">
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
              <button className="text-sm text-blue-500 hover:underline flex items-center">
                {t({ ko: "더보기", en: "View More" })} <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
          </div>

          <motion.div 
            className="allprint-grid"
            variants={containerVariants}
          >
            {materialRecommendations.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link href={`/product/${item.id}`} className="block">
                  <div className="allprint-card">
                    {/* 상단 이미지 영역 (70%) */}
                    <div className="allprint-card-image">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      {/* HOT 배지 (왼쪽 상단 절대 위치) */}
                      <div className="allprint-card-hot-badge">
                        {item.badge}
                      </div>
                      
                      {/* LIKE 수 배지 (오른쪽 상단 절대 위치) */}
                      <div className="allprint-card-like-badge">
                        LIKE {Math.floor(item.reviewCount * 0.6)}
                      </div>
                    </div>
                    
                    {/* 하단 텍스트 영역 (30%) */}
                    <div className="allprint-card-content">
                      <div className="allprint-card-title">
                        {item.title}
                      </div>
                      
                      <div className="allprint-card-price">
                        ₩{item.price.toLocaleString()}
                      </div>
                      
                      <div className="allprint-card-stats">
                        리뷰 {item.reviewCount} / LIKE {Math.floor(item.reviewCount * 0.6)}
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
          <div className="flex items-center justify-between mb-2">
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
            className="allprint-grid"
            variants={containerVariants}
          >
            {instagramFeed.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <div className="allprint-card">
                  {/* 상단 이미지 영역 (70%) */}
                  <div className="allprint-card-image">
                    <img
                      src={post.image}
                      alt={`Instagram post ${post.id}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* HOT 배지 (왼쪽 상단 절대 위치) */}
                    <div className="allprint-card-hot-badge">
                      인기
                    </div>
                    
                    {/* LIKE 수 배지 (오른쪽 상단 절대 위치) */}
                    <div className="allprint-card-like-badge">
                      LIKE {post.likes}
                    </div>
                  </div>
                  
                  {/* 하단 텍스트 영역 (30%) */}
                  <div className="allprint-card-content">
                    <div className="allprint-card-title">
                      Instagram Post #{post.id}
                    </div>
                    
                    <div className="allprint-card-price">
                      @allthatprinting_
                    </div>
                    
                    <div className="allprint-card-stats">
                      리뷰 {post.comments} / LIKE {post.likes}
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