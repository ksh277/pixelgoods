import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, Palette, Truck, Clock, Shield, Star, ArrowRight, Users, Award, MessageCircle, Heart, Play, ChevronLeft, ChevronRight, Gift, Zap, Camera, TrendingUp, Calendar, Mail } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
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
    <div className="min-h-screen scroll-smooth">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="slide-section relative"
        initial="initial"
        animate={heroInView ? "animate" : "initial"}
        variants={fadeInUp}
      >
        <Hero />
      </motion.section>

      {/* Featured Categories */}
      <motion.section 
        ref={categoriesRef}
        className="slide-section section-padding bg-soft-gray dark:bg-background"
        initial="initial"
        animate={categoriesInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-foreground mb-4 text-korean text-tight">
              {t({ ko: "인기 카테고리", en: "Popular Categories" })}
            </h2>
            <p className="text-lg text-muted-foreground text-korean">
              {t({ ko: "원하는 제품을 선택해 나만의 디자인을 만들어보세요", en: "Choose your product and create your own unique design" })}
            </p>
          </motion.div>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-8 animate-pulse">
                  <div className="h-48 bg-muted rounded-lg mb-6"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {categories?.slice(0, 3).map((category: Category, index) => (
                <motion.div key={category.id} variants={fadeInUp}>
                  <Card className="group cursor-pointer hover-lift bg-card/50 backdrop-blur-sm border-2 border-border/50">
                    <CardContent className="p-8 text-center">
                      <div className="relative overflow-hidden rounded-xl mb-6">
                        <motion.img
                          src={category.imageUrl || "/api/placeholder/400/300"}
                          alt={language === 'ko' ? category.nameKo : category.name}
                          className="w-full h-48 object-cover"
                          loading="lazy"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3 text-korean text-tight">
                        {language === 'ko' ? category.nameKo : category.name}
                      </h3>
                      <p className="text-muted-foreground mb-6 text-korean">
                        {language === 'ko' ? category.descriptionKo : category.description}
                      </p>
                      <Link href={`/products?category=${category.id}`}>
                        <Button className="btn-primary hover-scale group w-full">
                          {t({ ko: "제품 보기", en: "View Products" })}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Best Sellers */}
      <motion.section 
        ref={bestSellersRef}
        className="slide-section section-padding bg-background"
        initial="initial"
        animate={bestSellersInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-foreground mb-4 text-korean text-tight">
              <Flame className="inline h-10 w-10 text-accent mr-3" />
              {t({ ko: "베스트 셀러", en: "Best Sellers" })}
            </h2>
            <p className="text-lg text-muted-foreground text-korean">
              {t({ ko: "가장 인기 있는 커스텀 제품들을 만나보세요", en: "Discover our most popular custom products" })}
            </p>
          </motion.div>

          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-64 bg-muted"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="h-8 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={staggerContainer}
            >
              {featuredProducts?.slice(0, 8).map((product: Product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* New Arrivals */}
      <motion.section 
        ref={newArrivalsRef}
        className="slide-section section-padding bg-soft-gray dark:bg-muted/20"
        initial="initial"
        animate={newArrivalsInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-foreground mb-4 text-korean text-tight">
              <TrendingUp className="inline h-10 w-10 text-primary mr-3" />
              {t({ ko: "신제품", en: "New Arrivals" })}
            </h2>
            <p className="text-lg text-muted-foreground text-korean">
              {t({ ko: "새롭게 출시된 최신 제품들을 확인해보세요", en: "Check out our latest product releases" })}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {featuredProducts?.slice(4, 8).map((product: Product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <Card className="group cursor-pointer overflow-hidden hover-lift bg-card/80 backdrop-blur-sm">
                  <div className="relative">
                    <motion.img
                      src={product.imageUrl || "/api/placeholder/300/300"}
                      alt={language === 'ko' ? product.nameKo : product.name}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                      {t({ ko: "NEW", en: "NEW" })}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 text-korean text-tight">
                      {language === 'ko' ? product.nameKo : product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        ₩{parseInt(product.basePrice).toLocaleString()}
                      </span>
                      <Button size="sm" className="btn-primary">
                        {t({ ko: "보기", en: "View" })}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        ref={howItWorksRef}
        className="slide-section section-padding bg-background"
        initial="initial"
        animate={howItWorksInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-foreground mb-4 text-korean text-tight">
              {t({ ko: "제작 과정", en: "How It Works" })}
            </h2>
            <p className="text-lg text-muted-foreground text-korean">
              {t({ ko: "간단한 3단계로 나만의 제품을 만들어보세요", en: "Create your custom product in just 3 easy steps" })}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={staggerContainer}
          >
            {[
              {
                icon: <Palette className="h-10 w-10 text-primary-foreground" />,
                title: { ko: "1. 제품 선택", en: "1. Choose Product" },
                description: { ko: "원하는 제품을 선택하고 사이즈와 색상을 정하세요", en: "Select your desired product and choose size and color" },
                color: "bg-primary"
              },
              {
                icon: <Camera className="h-10 w-10 text-primary-foreground" />,
                title: { ko: "2. 디자인 제작", en: "2. Create Design" },
                description: { ko: "이미지를 업로드하거나 텍스트를 추가해 디자인을 완성하세요", en: "Upload images or add text to complete your design" },
                color: "bg-accent"
              },
              {
                icon: <Truck className="h-10 w-10 text-primary-foreground" />,
                title: { ko: "3. 주문 완료", en: "3. Order Complete" },
                description: { ko: "결제를 완료하면 고품질로 제작해서 빠르게 배송해드려요", en: "Complete payment and we'll create and ship your high-quality product" },
                color: "bg-green-500"
              }
            ].map((step, index) => (
              <motion.div key={index} className="text-center group" variants={fadeInUp}>
                <motion.div 
                  className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-4 text-korean text-tight">
                  {t(step.title)}
                </h3>
                <p className="text-muted-foreground text-korean leading-relaxed">
                  {t(step.description)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Community Gallery */}
      <motion.section 
        ref={communityRef}
        className="slide-section section-padding bg-soft-gray dark:bg-muted/20"
        initial="initial"
        animate={communityInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-foreground mb-4 text-korean text-tight">
              <Users className="inline h-10 w-10 text-accent mr-3" />
              {t({ ko: "커뮤니티 갤러리", en: "Community Gallery" })}
            </h2>
            <p className="text-lg text-muted-foreground text-korean">
              {t({ ko: "사용자들이 제작한 창작물을 구경해보세요", en: "Explore amazing creations from our community" })}
            </p>
          </motion.div>

          {communityLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-64 bg-muted"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-6 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
            >
              {/* Sample community posts when no data */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="overflow-hidden hover-lift cursor-pointer group bg-card/50 backdrop-blur-sm">
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={`/api/placeholder/300/300`}
                        alt={`Community post ${index}`}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm font-medium truncate">
                          {t({ ko: `커뮤니티 작품 ${index}`, en: `Community Work ${index}` })}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 text-korean">
                        {t({ ko: "멋진 커스텀 제품을 만들어보세요", en: "Create amazing custom products" })}
                      </p>
                      <div className="flex items-center justify-between">
                        <button className="flex items-center text-accent hover:text-red-600 transition-colors">
                          <Heart className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">{Math.floor(Math.random() * 100) + 20}</span>
                        </button>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {Math.floor(Math.random() * 20) + 1}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <Link href="/community">
              <Button className="btn-primary hover-scale">
                {t({ ko: "더 많은 작품 보기", en: "View More Creations" })}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Customer Reviews */}
      <motion.section 
        ref={reviewsRef}
        className="slide-section section-padding bg-background"
        initial="initial"
        animate={reviewsInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-foreground mb-4 text-korean text-tight">
              <Award className="inline h-10 w-10 text-accent mr-3" />
              {t({ ko: "고객 후기", en: "Customer Reviews" })}
            </h2>
            <p className="text-lg text-muted-foreground text-korean">
              {t({ ko: "실제 고객들의 생생한 후기를 확인해보세요", en: "Read authentic reviews from our satisfied customers" })}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              {
                name: { ko: "김민수", en: "Minsu Kim" },
                initial: "김",
                rating: 5,
                comment: {
                  ko: "아크릴 키링 퀄리티가 정말 좋아요! 디자인도 제가 원하는 대로 나왔고, 배송도 빨랐습니다. 또 주문할 예정이에요.",
                  en: "The acrylic keychain quality is amazing! The design came out exactly as I wanted, and shipping was fast. I'll definitely order again."
                },
                color: "bg-primary",
                verified: true
              },
              {
                name: { ko: "이지은", en: "Jieun Lee" },
                initial: "이",
                rating: 5,
                comment: {
                  ko: "커스텀 티셔츠 만들어서 친구들과 맞춰 입었는데 반응이 너무 좋았어요. 프린팅 질도 만족스럽습니다!",
                  en: "Made custom t-shirts for me and my friends and everyone loved them. The printing quality is excellent!"
                },
                color: "bg-accent",
                verified: true
              },
              {
                name: { ko: "박준호", en: "Junho Park" },
                initial: "박",
                rating: 4,
                comment: {
                  ko: "머그컵에 가족사진을 프린팅해서 선물했는데 너무 예쁘게 나왔어요. 고화질로 인쇄되어서 만족합니다.",
                  en: "Printed a family photo on a mug as a gift and it turned out beautiful. The high-quality printing is impressive."
                },
                color: "bg-purple-500",
                verified: true
              }
            ].map((review, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 hover-lift bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${review.color} rounded-full flex items-center justify-center text-white font-bold mr-4`}>
                      {review.initial}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground text-korean">
                          {t(review.name)}
                        </h4>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            {t({ ko: "인증", en: "Verified" })}
                          </Badge>
                        )}
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-korean leading-relaxed">
                    "{t(review.comment)}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <Button className="btn-secondary hover-scale">
              {t({ ko: "모든 리뷰 보기", en: "View All Reviews" })}
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Special Events */}
      <motion.section 
        ref={eventsRef}
        className="slide-section section-padding bg-soft-gray dark:bg-muted/20"
        initial="initial"
        animate={eventsInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-foreground mb-4 text-korean text-tight">
              <Gift className="inline h-10 w-10 text-accent mr-3" />
              {t({ ko: "특별 이벤트", en: "Special Events" })}
            </h2>
            <p className="text-lg text-muted-foreground text-korean">
              {t({ ko: "지금 진행중인 특별한 혜택들을 확인해보세요", en: "Check out our current special offers and events" })}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white hover-lift">
                <div className="flex items-center mb-6">
                  <Zap className="h-8 w-8 mr-3" />
                  <h3 className="text-2xl font-bold text-korean">
                    {t({ ko: "신규 회원 30% 할인", en: "30% Off for New Members" })}
                  </h3>
                </div>
                <p className="text-white/90 mb-6 text-korean">
                  {t({ ko: "첫 주문 시 모든 제품 30% 할인 혜택을 받으세요", en: "Get 30% off all products on your first order" })}
                </p>
                <Button className="bg-white text-purple-600 hover:bg-white/90 font-semibold">
                  {t({ ko: "지금 가입하기", en: "Join Now" })}
                </Button>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8 bg-gradient-to-br from-green-500 to-blue-500 text-white hover-lift">
                <div className="flex items-center mb-6">
                  <Calendar className="h-8 w-8 mr-3" />
                  <h3 className="text-2xl font-bold text-korean">
                    {t({ ko: "무료 배송 이벤트", en: "Free Shipping Event" })}
                  </h3>
                </div>
                <p className="text-white/90 mb-6 text-korean">
                  {t({ ko: "3만원 이상 주문 시 무료 배송 + 추가 사은품 증정", en: "Free shipping on orders over ₩30,000 + bonus gifts" })}
                </p>
                <Button className="bg-white text-green-600 hover:bg-white/90 font-semibold">
                  {t({ ko: "자세히 보기", en: "Learn More" })}
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section 
        ref={newsletterRef}
        className="slide-section section-padding bg-primary text-primary-foreground"
        initial="initial"
        animate={newsletterInView ? "animate" : "initial"}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp}>
            <Mail className="h-16 w-16 mx-auto mb-6 text-primary-foreground" />
            <h2 className="text-4xl font-bold mb-6 text-korean text-tight">
              {t({ ko: "뉴스레터 구독하기", en: "Subscribe to Newsletter" })}
            </h2>
            <p className="text-xl mb-8 opacity-90 text-korean">
              {t({ 
                ko: "최신 제품 정보와 특별 할인 혜택을 가장 먼저 받아보세요",
                en: "Be the first to know about new products and special discounts"
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t({ ko: "이메일 주소를 입력하세요", en: "Enter your email address" })}
                className="flex-1 px-6 py-4 rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent text-korean"
              />
              <Button className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-lg hover-scale">
                {t({ ko: "구독하기", en: "Subscribe" })}
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}