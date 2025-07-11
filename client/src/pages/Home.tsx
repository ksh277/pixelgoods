import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Flame, Palette, Truck, Clock, Shield, Star, ArrowRight, Users, Award, MessageCircle, Heart, Play, ChevronLeft, ChevronRight } from "lucide-react";
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

export default function Home() {
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [activeSection, setActiveSection] = useState(0);
  const [featuredCarouselIndex, setFeaturedCarouselIndex] = useState(0);
  const [communityCarouselIndex, setCommunityCarouselIndex] = useState(0);

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
      <section className="slide-section relative">
        <Hero />
      </section>

      {/* Featured Categories */}
      <section className="slide-section section-padding bg-soft-gray dark:bg-background slide-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-korean text-tight">
              {t({ ko: "인기 카테고리", en: "Popular Categories" })}
            </h2>
            <p className="text-lg text-muted-foreground text-korean">
              {t({ ko: "원하는 제품을 선택해 나만의 디자인을 만들어보세요", en: "Choose your product and create your own unique design" })}
            </p>
          </div>
          
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories?.slice(0, 3).map((category: Category, index) => (
                <Card key={category.id} className="group cursor-pointer hover-lift bg-card/50 backdrop-blur-sm border-2 border-border/50">
                  <CardContent className="p-8 text-center">
                    <div className="relative overflow-hidden rounded-xl mb-6">
                      <img
                        src={category.imageUrl || "/api/placeholder/400/300"}
                        alt={language === 'ko' ? category.nameKo : category.name}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="slide-section section-padding bg-background slide-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-korean text-tight">
              <Flame className="inline h-10 w-10 text-accent mr-3" />
              {t({ ko: "베스트 셀러", en: "Best Sellers" })}
            </h2>
            <p className="text-lg text-muted-foreground text-korean">
              {t({ ko: "가장 인기 있는 커스텀 제품들을 만나보세요", en: "Discover our most popular custom products" })}
            </p>
          </div>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts?.slice(0, 8).map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="slide-section section-padding bg-soft-gray dark:bg-muted/20 slide-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-korean text-tight">
              {t({ ko: "제작 과정", en: "How It Works" })}
            </h2>
            <p className="text-lg text-muted-foreground text-korean">
              {t({ ko: "간단한 3단계로 나만의 제품을 만들어보세요", en: "Create your custom product in just 3 easy steps" })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Palette className="h-10 w-10 text-primary-foreground" />,
                title: { ko: "1. 제품 선택", en: "1. Choose Product" },
                description: { ko: "원하는 제품을 선택하고 사이즈와 색상을 정하세요", en: "Select your desired product and choose size and color" },
                color: "bg-primary"
              },
              {
                icon: <Palette className="h-10 w-10 text-primary-foreground" />,
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
              <div key={index} className="text-center group">
                <div className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mx-auto mb-8 transition-transform duration-300 group-hover:scale-110 shadow-lg`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 text-korean text-tight">
                  {t(step.title)}
                </h3>
                <p className="text-muted-foreground text-korean leading-relaxed">
                  {t(step.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Gallery */}
      <section className="slide-section section-padding bg-background slide-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-korean text-tight">
              <Users className="inline h-10 w-10 text-accent mr-3" />
              {t({ ko: "커뮤니티 갤러리", en: "Community Gallery" })}
            </h2>
            <p className="text-lg text-muted-foreground text-korean">
              {t({ ko: "사용자들이 제작한 창작물을 구경해보세요", en: "Explore amazing creations from our community" })}
            </p>
          </div>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {communityPosts?.slice(0, 8).map((post: any) => (
                <Card key={post.id} className="overflow-hidden hover-lift cursor-pointer group bg-card/50 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.imageUrl || "/api/placeholder/300/300"}
                      alt={post.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-medium truncate">
                        {post.title}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 text-korean">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className="flex items-center text-accent hover:text-red-600 transition-colors"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{post.likes || 0}</span>
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
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/community">
              <Button className="btn-primary hover-scale">
                {t({ ko: "더 많은 작품 보기", en: "View More Creations" })}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="slide-section section-padding bg-soft-gray dark:bg-muted/20 slide-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-korean text-tight">
              <Award className="inline h-10 w-10 text-accent mr-3" />
              {t({ ko: "고객 후기", en: "Customer Reviews" })}
            </h2>
            <p className="text-lg text-muted-foreground text-korean">
              {t({ ko: "실제 고객들의 생생한 후기를 확인해보세요", en: "Read authentic reviews from our satisfied customers" })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <Card key={index} className="p-6 hover-lift bg-card/50 backdrop-blur-sm">
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
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="btn-secondary hover-scale">
              {t({ ko: "모든 리뷰 보기", en: "View All Reviews" })}
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="slide-section section-padding bg-primary text-primary-foreground slide-in">
        <div className="max-w-4xl mx-auto text-center">
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
        </div>
      </section>
    </div>
  );
}