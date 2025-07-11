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
          <SectionHeader
            emoji="🔥"
            title={{ ko: "인기상품", en: "Popular Items" }}
            subtitle={{ ko: "지금 가장 핫한 아이템들을 만나보세요", en: "Meet the hottest items right now" }}
            seeMoreLink="/products"
          />
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="overflow-hidden">
                    <div className="aspect-square bg-muted animate-pulse" />
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="h-4 bg-muted animate-pulse rounded" />
                        <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              products?.slice(0, 4).map((product: Product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative aspect-square">
                      <img
                        src="/api/placeholder/300/300"
                        alt={product.nameKo || product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        HOT
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {product.nameKo || product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-foreground">
                          ₩{product.price?.toLocaleString() || 0}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleToggleFavorite(product)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <Heart 
                              className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                            />
                          </button>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
          <SectionHeader
            emoji="🤗"
            title={{ ko: "창작자들의 소중한 리뷰", en: "Precious Reviews from Creators" }}
            subtitle={{ ko: "실제 창작자들이 남긴 생생한 후기를 확인해보세요", en: "Check out vivid reviews from real creators" }}
            seeMoreLink="/reviews"
          />
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {creatorReviews.map((review) => (
              <motion.div key={review.id} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={review.productImage}
                      alt={review.productName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                      {review.reviewCount}개 리뷰
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {review.productName}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {review.comment}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {review.userName}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {review.tags.slice(0, 2).map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
          <div className="flex items-center justify-between mb-8">
            <SectionHeader
              emoji="🔥"
              title={{ ko: "굿즈 자랑 커뮤니티", en: "Goods Showcase Community" }}
              subtitle={{ ko: "멋진 굿즈들을 자랑해보세요", en: "Show off your amazing goods" }}
            />
            <Button variant="outline" size="sm">
              {t({ ko: "더보기", en: "More" })}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {communityShowcase.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative aspect-square">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">
                        {item.author}
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{item.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{item.comments}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
          <SectionHeader
            emoji="✨"
            title={{ ko: "자재별 추천", en: "Material-Based Recommendations" }}
            subtitle={{ ko: "원하는 재질의 완벽한 굿즈를 찾아보세요", en: "Find perfect goods with your desired materials" }}
            seeMoreLink="/products"
          />
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {materialRecommendations.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative aspect-square">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className={`absolute top-2 left-2 ${
                      item.badge === 'HIT' ? 'bg-red-500' : 
                      item.badge === 'NEW' ? 'bg-green-500' : 'bg-orange-500'
                    } text-white`}>
                      {item.badge}
                    </Badge>
                    {item.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{item.discount}%
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs mb-2">
                        {item.material}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-foreground">
                          ₩{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₩{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">
                          리뷰 {item.reviewCount}개
                        </span>
                      </div>
                      <Button size="sm" variant="outline">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Instagram Feed */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            emoji="📸"
            title={{ ko: "인스타그램 피드", en: "Instagram Feed" }}
            subtitle={{ ko: "@allthatprinting_ 최신 소식을 확인해보세요", en: "Check out the latest from @allthatprinting_" }}
          />
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={containerVariants}
          >
            {instagramFeed.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <div className="relative aspect-square group cursor-pointer">
                  <img
                    src={post.image}
                    alt={`Instagram post ${post.id}`}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center space-x-4 text-white">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-5 w-5" />
                        <span className="font-medium">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-medium">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>

      {/* Fixed Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-4 z-50">
        {/* Inquiry Button (Top) */}
        <Link href="/inquiry">
          <Button
            variant="outline"
            size="lg"
            className="bg-white hover:bg-gray-50 text-gray-700 shadow-lg border border-gray-200 rounded-full px-4 sm:px-6 py-3 flex items-center space-x-2 transition-all hover:shadow-xl"
          >
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              <span className="font-medium text-xs sm:text-sm">
                {t({ ko: '문의하기', en: 'Inquiry', ja: 'お問い合わせ', zh: '咨询' })}
              </span>
            </div>
          </Button>
        </Link>

        {/* Editor Button (Bottom) */}
        <Link href="/editor">
          <Button
            size="lg"
            className="bg-black hover:bg-gray-800 text-white shadow-lg rounded-full px-4 sm:px-6 py-3 flex items-center space-x-2 transition-all hover:shadow-xl"
          >
            <div className="flex items-center space-x-2">
              <Puzzle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium text-xs sm:text-sm">
                {t({ ko: '🧩 굿즈 에디터', en: '🧩 Goods Editor', ja: '🧩 グッズエディタ', zh: '🧩 商品编辑器' })}
              </span>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}