import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, Palette, Truck, Clock, Shield, Star, ArrowRight, Users, Award, MessageCircle, Heart, Play, ChevronLeft, ChevronRight, Gift, Zap, Camera, TrendingUp, Calendar, Mail, Sparkles, Tag, Target } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { Product, Category } from "@shared/schema";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const slideIn = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function Home() {
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [activeSection, setActiveSection] = useState(0);
  const [featuredCarouselIndex, setFeaturedCarouselIndex] = useState(0);
  const [communityCarouselIndex, setCommunityCarouselIndex] = useState(0);
  
  // Refs for in-view animations
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const bestSellersRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const communityRef = useRef(null);
  const reviewsRef = useRef(null);
  const eventsRef = useRef(null);
  const newsletterRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const categoriesInView = useInView(categoriesRef, { once: true });
  const bestSellersInView = useInView(bestSellersRef, { once: true });
  const newArrivalsInView = useInView(newArrivalsRef, { once: true });
  const howItWorksInView = useInView(howItWorksRef, { once: true });
  const communityInView = useInView(communityRef, { once: true });
  const reviewsInView = useInView(reviewsRef, { once: true });
  const eventsInView = useInView(eventsRef, { once: true });
  const newsletterInView = useInView(newsletterRef, { once: true });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["/api/categories"],
    queryFn: () => api.getCategories(),
  });

  const { data: featuredProducts, isLoading: productsLoading } = useQuery({
    queryKey: ["/api/products", "featured"],
    queryFn: () => api.getProducts({ featured: true }),
  });

  const { data: communityPosts, isLoading: communityLoading } = useQuery({
    queryKey: ["/api/community/posts"],
    queryFn: () => api.getCommunityPosts(),
  });

  const handleAddToCart = (product: Product) => {
    toast({
      title: t({ ko: "장바구니에 추가됨", en: "Added to Cart" }),
      description: t({ 
        ko: `${product.nameKo}이(가) 장바구니에 추가되었습니다.`,
        en: `${product.name} has been added to your cart.`
      }),
    });
  };

  const handleToggleFavorite = (product: Product) => {
    toast({
      title: t({ ko: "찜 목록에 추가됨", en: "Added to Favorites" }),
      description: t({ 
        ko: `${product.nameKo}이(가) 찜 목록에 추가되었습니다.`,
        en: `${product.name} has been added to your favorites.`
      }),
    });
  };

  const handleLikePost = async (postId: number) => {
    try {
      await api.likeCommunityPost(postId);
      toast({
        title: t({ ko: "좋아요!", en: "Liked!" }),
        description: t({ ko: "게시물에 좋아요를 눌렀습니다.", en: "You liked this post." }),
      });
    } catch (error) {
      toast({
        title: t({ ko: "오류", en: "Error" }),
        description: t({ ko: "좋아요 처리 중 오류가 발생했습니다.", en: "An error occurred while liking the post." }),
        variant: "destructive",
      });
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedCarouselIndex((prev) => (prev + 1) % (featuredProducts?.length || 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredProducts?.length]);

  // Intersection Observer for slide animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const slideElements = document.querySelectorAll('.slide-in');
    slideElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Section 1: 🔥 인기상품 */}
        <section>
          <SectionHeader
            emoji="🔥"
            title={{ ko: "인기상품", en: "Popular Items" }}
            subtitle={{ ko: "창작자들이 가장 사랑하는 아이템", en: "Popular Items Loved by Creators" }}
            seeMoreLink="/popular"
          />
          <ProductGrid
            products={featuredProducts || []}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        </section>

        {/* Section 2: 🧡 따끈따끈한 신상품 */}
        <section>
          <SectionHeader
            emoji="🧡"
            title={{ ko: "따끈따끈한 신상품", en: "Fresh New Arrivals" }}
            subtitle={{ ko: "방금 출시된 따끈따끈한 신제품", en: "Fresh New Arrivals" }}
            seeMoreLink="/new"
          />
          <ProductGrid
            products={featuredProducts || []}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        </section>

        {/* Section 3: 🤗 창작자들의 소중한 리뷰 */}
        <section>
          <SectionHeader
            emoji="🤗"
            title={{ ko: "창작자들의 소중한 리뷰", en: "Creator Reviews" }}
            subtitle={{ ko: "실제 고객들의 생생한 후기", en: "Real reviews from our creators" }}
            seeMoreLink="/reviews"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "김민수",
                rating: 5,
                comment: "아크릴 키링 퀄리티가 정말 좋아요! 배송도 빨랐습니다.",
                productName: "아크릴 키링",
                avatar: "김"
              },
              {
                name: "이지은",
                rating: 5,
                comment: "커스텀 티셔츠 만들어서 친구들과 맞춰 입었어요!",
                productName: "커스텀 티셔츠",
                avatar: "이"
              },
              {
                name: "박준호",
                rating: 4,
                comment: "머그컵 프린팅이 고화질로 나와서 만족합니다.",
                productName: "머그컵",
                avatar: "박"
              },
              {
                name: "최유진",
                rating: 5,
                comment: "스티커 색상이 너무 예뻐요. 또 주문할게요!",
                productName: "스티커",
                avatar: "최"
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{review.name}</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                <div className="text-xs text-muted-foreground">
                  {review.productName} 구매
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 4: 🔥 굿즈 자랑 커뮤니티 */}
        <section>
          <SectionHeader
            emoji="🔥"
            title={{ ko: "굿즈 자랑 커뮤니티", en: "Community Showcase" }}
            subtitle={{ ko: "창작자들의 멋진 작품들을 구경해보세요", en: "Amazing creations from our community" }}
            seeMoreLink="/community"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <img
                    src={`/api/placeholder/300/300`}
                    alt={`Community showcase ${index}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white p-2 rounded text-sm">
                    커뮤니티 작품 {index}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>{Math.floor(Math.random() * 100) + 20}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{Math.floor(Math.random() * 20) + 1}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 5: ✨ 자재별 추천 */}
        <section>
          <SectionHeader
            emoji="✨"
            title={{ ko: "자재별 추천", en: "Material-Based Recommendations" }}
            subtitle={{ ko: "투명, 홀로그램, 미러 등 자재별 인기 아이템", en: "Top items by material type" }}
            seeMoreLink="/materials"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { material: "투명 아크릴", color: "bg-blue-100", icon: "💎" },
              { material: "홀로그램", color: "bg-purple-100", icon: "🌈" },
              { material: "미러", color: "bg-gray-100", icon: "✨" },
              { material: "우드", color: "bg-amber-100", icon: "🌳" }
            ].map((material, index) => (
              <motion.div
                key={index}
                className={`${material.color} p-6 rounded-lg cursor-pointer hover:shadow-md transition-shadow`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{material.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{material.material}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {material.material} 소재의 인기 제품들
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    제품 보기
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 6: ❤️ 인기급상승 아이템 */}
        <section>
          <SectionHeader
            emoji="❤️"
            title={{ ko: "인기급상승 아이템", en: "Trending Now" }}
            subtitle={{ ko: "지금 가장 핫한 트렌딩 아이템", en: "Rapidly rising popular items" }}
            seeMoreLink="/trending"
          />
          <ProductGrid
            products={featuredProducts || []}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        </section>

        {/* Section 7: 🎯 올댓추천 */}
        <section>
          <SectionHeader
            emoji="🎯"
            title={{ ko: "올댓추천", en: "Staff Picks" }}
            subtitle={{ ko: "올댓프린팅이 직접 추천하는 베스트 아이템", en: "Handpicked recommendations from our team" }}
            seeMoreLink="/recommendations"
          />
          <ProductGrid
            products={featuredProducts || []}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        </section>

        {/* Section 8: 🏷️ 브랜드 굿즈 안내 */}
        <section>
          <SectionHeader
            emoji="🏷️"
            title={{ ko: "브랜드 굿즈 안내", en: "Brand Custom Goods" }}
            subtitle={{ ko: "기업 및 브랜드 맞춤 굿즈 제작 서비스", en: "Custom goods for companies and brands" }}
            seeMoreLink="/brand"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">기업 맞춤 굿즈</h3>
              <p className="mb-6">
                회사 로고, 브랜드 캐릭터를 활용한 맞춤 굿즈를 제작해드립니다.
              </p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                상담 신청하기
              </Button>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-8 rounded-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">창작자 지원</h3>
              <p className="mb-6">
                개인 창작자, 인플루언서를 위한 특별한 할인 혜택을 제공합니다.
              </p>
              <Button className="bg-white text-green-600 hover:bg-gray-100">
                혜택 확인하기
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Section 9: 🎁 고객 맞춤 혜택 배너 */}
        <section>
          <SectionHeader
            emoji="🎁"
            title={{ ko: "고객 맞춤 혜택 배너", en: "Personalized Benefits" }}
            subtitle={{ ko: "회원님을 위한 특별한 혜택과 이벤트", en: "Special benefits and events just for you" }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <Gift className="h-8 w-8 mr-3" />
                <h3 className="text-xl font-bold">신규 회원 혜택</h3>
              </div>
              <p className="mb-4">첫 주문 시 30% 할인 + 무료 배송</p>
              <Button className="bg-white text-pink-600 hover:bg-gray-100">
                지금 가입하기
              </Button>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 mr-3" />
                <h3 className="text-xl font-bold">이달의 특가</h3>
              </div>
              <p className="mb-4">인기 상품 최대 50% 할인</p>
              <Button className="bg-white text-orange-600 hover:bg-gray-100">
                특가 상품 보기
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
