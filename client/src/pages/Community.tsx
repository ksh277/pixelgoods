import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Heart, MessageCircle, Share2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { api } from "@/lib/api";
import type { CommunityPost, CommunityComment } from "@shared/schema";

export default function Community() {
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["/api/community/posts"],
  });

  const { data: comments } = useQuery({
    queryKey: ["/api/community/comments", selectedPost?.id],
    enabled: !!selectedPost,
  });

  // Mock featured posts data to match the design
  const featuredPosts = [
    {
      id: 1,
      title: "오늘의 하루종일 아크릴 스탠드 제작 과정!",
      description: "처음부터 끝까지 모든 과정을 담았습니다",
      author: "네기디모토짱",
      authorLevel: "골드회원",
      image: "/api/placeholder/400/300",
      likes: 245,
      comments: 18,
      badge: "BEST",
      category: "제작후기"
    },
    {
      id: 2,
      title: "아크릴 키링 리뷰 대공개!",
      description: "실제 주문해서 받은 퀄리티 후기입니다",
      author: "데가키모토루",
      authorLevel: "실버회원",
      image: "/api/placeholder/400/300",
      likes: 189,
      comments: 12,
      badge: "BEST",
      category: "상품후기"
    },
    {
      id: 3,
      title: "프린팅 서비스 품질 후기 (5점만점)",
      description: "색감이 정말 좋네요!",
      author: "네기디모토짱",
      authorLevel: "골드회원",
      image: "/api/placeholder/400/300",
      likes: 156,
      comments: 8,
      badge: "BEST", 
      category: "서비스후기"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  const handleLike = (postId: number) => {
    toast({
      title: t({ ko: "좋아요!", en: "Liked!" }),
      description: t({ ko: "게시물에 좋아요를 눌렀습니다.", en: "You liked this post." }),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">📸</span>
            <h1 className="text-3xl font-bold text-foreground">
              {t({ ko: "이번주 베스트 컨텐츠", en: "This Week's Best Content" })}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            {t({ ko: "회원들이 공유한 최고의 제작 후기와 작품들을 만나보세요", en: "Discover the best creation reviews and works shared by our members" })}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts Carousel */}
        <div className="relative mb-16">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredPosts.map((post) => (
                <div key={post.id} className="w-full flex-shrink-0 relative">
                  <div className="aspect-[16/9] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 flex items-center">
                    <div className="flex w-full max-w-6xl mx-auto">
                      {/* Content */}
                      <div className="flex-1 pr-8">
                        <div className="flex items-center space-x-3 mb-4">
                          <Badge className="bg-red-500 text-white font-bold px-3 py-1">
                            {post.badge}
                          </Badge>
                          <Badge variant="outline" className="text-muted-foreground">
                            {post.category}
                          </Badge>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                          {post.title}
                        </h2>
                        
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          {post.description}
                        </p>
                        
                        <div className="flex items-center space-x-6 mb-6">
                          <div className="flex items-center space-x-2">
                            <Heart className="h-5 w-5 text-red-500" />
                            <span className="font-medium">{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="h-5 w-5 text-blue-500" />
                            <span className="font-medium">{post.comments}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {post.author.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{post.author}</p>
                            <p className="text-sm text-muted-foreground">{post.authorLevel}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Image */}
                      <div className="w-80 h-60 rounded-xl overflow-hidden shadow-lg">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full p-3 shadow-lg transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full p-3 shadow-lg transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {featuredPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-primary' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="h-6 w-6 text-amber-500" />
              <h3 className="text-2xl font-bold text-foreground">
                {t({ ko: "지난 1개월간 누적 매출액", en: "Total Sales in the Last Month" })}
              </h3>
            </div>
            <div className="flex items-center justify-center space-x-8 text-center">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-primary">3,000</span>
                <span className="text-lg text-muted-foreground">
                  {t({ ko: "만원 돌파와 함께", en: "KRW breakthrough with" })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-secondary">500</span>
                <span className="text-lg text-muted-foreground">
                  {t({ ko: "명의 회원이 함께 했습니다", en: "members participated" })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {t({ ko: "최근 게시물", en: "Recent Posts" })}
          </h2>
          
          {postsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-muted animate-pulse" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted animate-pulse rounded mb-2" />
                    <div className="h-3 bg-muted animate-pulse rounded mb-4" />
                    <div className="flex justify-between">
                      <div className="h-3 bg-muted animate-pulse rounded w-16" />
                      <div className="h-3 bg-muted animate-pulse rounded w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: CommunityPost) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                    <img 
                      src="/api/placeholder/300/200" 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-1 text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">0</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t({ ko: "아직 게시물이 없습니다", en: "No posts yet" })}
              </h3>
              <p className="text-muted-foreground">
                {t({ ko: "첫 번째 게시물을 작성해보세요!", en: "Be the first to create a post!" })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}