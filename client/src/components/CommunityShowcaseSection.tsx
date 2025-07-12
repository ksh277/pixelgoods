import { useState } from "react";
import { Heart, Eye, MessageCircle, Filter, Grid, List, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface CommunityPost {
  id: string;
  title: string;
  userNickname: string;
  image: string;
  category: string;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  uploadDate: string;
  isHot: boolean;
  isNew: boolean;
}

const mockCommunityPosts: CommunityPost[] = [
  {
    id: "1",
    title: "내 최애 캐릭터 아크릴 키링 만들기",
    userNickname: "키링마니아***",
    image: "/api/placeholder/300/300",
    category: "키링",
    tags: ["아크릴", "키링", "캐릭터", "DIY"],
    likes: 234,
    views: 1456,
    comments: 28,
    uploadDate: "2024.12.15",
    isHot: true,
    isNew: false
  },
  {
    id: "2",
    title: "홀로그램 스티커 제작 후기",
    userNickname: "반짝이조아***",
    image: "/api/placeholder/300/300",
    category: "스티커",
    tags: ["홀로그램", "스티커", "후기", "반짝"],
    likes: 189,
    views: 892,
    comments: 15,
    uploadDate: "2024.12.14",
    isHot: false,
    isNew: true
  },
  {
    id: "3",
    title: "투명 아크릴 스탠드 완성!",
    userNickname: "스탠드러버***",
    image: "/api/placeholder/300/300",
    category: "스탠드",
    tags: ["아크릴", "스탠드", "투명", "완성"],
    likes: 167,
    views: 723,
    comments: 19,
    uploadDate: "2024.12.13",
    isHot: true,
    isNew: false
  },
  {
    id: "4",
    title: "커스텀 폰케이스 디자인",
    userNickname: "폰케이스킹***",
    image: "/api/placeholder/300/300",
    category: "폰케이스",
    tags: ["폰케이스", "커스텀", "디자인", "개성"],
    likes: 145,
    views: 654,
    comments: 12,
    uploadDate: "2024.12.12",
    isHot: false,
    isNew: true
  },
  {
    id: "5",
    title: "포토카드 홀더 제작기",
    userNickname: "포카수집가***",
    image: "/api/placeholder/300/300",
    category: "홀더",
    tags: ["포토카드", "홀더", "제작", "수집"],
    likes: 198,
    views: 967,
    comments: 24,
    uploadDate: "2024.12.11",
    isHot: true,
    isNew: false
  },
  {
    id: "6",
    title: "맞춤 배지 만들기 도전",
    userNickname: "배지콜렉터***",
    image: "/api/placeholder/300/300",
    category: "배지",
    tags: ["배지", "맞춤", "도전", "컬렉션"],
    likes: 123,
    views: 543,
    comments: 11,
    uploadDate: "2024.12.10",
    isHot: false,
    isNew: false
  },
  {
    id: "7",
    title: "셰이커 키링 만들기 성공!",
    userNickname: "셰이커러버***",
    image: "/api/placeholder/300/300",
    category: "키링",
    tags: ["셰이커", "키링", "성공", "만들기"],
    likes: 276,
    views: 1234,
    comments: 32,
    uploadDate: "2024.12.09",
    isHot: true,
    isNew: false
  },
  {
    id: "8",
    title: "카라비너 키링 완성작",
    userNickname: "카라비너짱***",
    image: "/api/placeholder/300/300",
    category: "키링",
    tags: ["카라비너", "키링", "완성", "실용"],
    likes: 89,
    views: 456,
    comments: 8,
    uploadDate: "2024.12.08",
    isHot: false,
    isNew: true
  },
  {
    id: "9",
    title: "거울 아크릴 제작 과정",
    userNickname: "거울마니아***",
    image: "/api/placeholder/300/300",
    category: "거울",
    tags: ["거울", "아크릴", "제작", "과정"],
    likes: 156,
    views: 789,
    comments: 16,
    uploadDate: "2024.12.07",
    isHot: false,
    isNew: false
  }
];

export function CommunityShowcaseSection() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const categories = ["all", "키링", "스티커", "스탠드", "폰케이스", "홀더", "배지", "거울"];

  const filteredPosts = mockCommunityPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      case "popular":
        return b.likes - a.likes;
      case "views":
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const handleLikeToggle = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
    
    toast({
      title: t({ ko: "좋아요", en: "Like", ja: "いいね", zh: "点赞" }),
      description: t({ ko: "게시물을 좋아요했습니다!", en: "Post liked!", ja: "投稿にいいねしました！", zh: "帖子已点赞！" }),
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t({ ko: "내가만든굿즈자랑", en: "My Goods Showcase", ja: "私が作ったグッズ自慢", zh: "我制作的商品展示" })}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {t({ ko: "다른 창작자들이 만든 굿즈를 구경해보세요!", en: "Check out what other creators are making!", ja: "他のクリエイターが作ったグッズを見てみましょう！", zh: "看看其他创作者制作的商品！" })}
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t({ ko: "굿즈 검색...", en: "Search goods...", ja: "グッズ検索...", zh: "搜索商品..." })}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? t({ ko: "전체", en: "All", ja: "全て", zh: "全部" }) : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">{t({ ko: "최신순", en: "Latest", ja: "最新", zh: "最新" })}</SelectItem>
                  <SelectItem value="popular">{t({ ko: "인기순", en: "Popular", ja: "人気", zh: "热门" })}</SelectItem>
                  <SelectItem value="views">{t({ ko: "조회순", en: "Views", ja: "閲覧", zh: "浏览" })}</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "masonry" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("masonry")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6">
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}>
            {sortedPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    
                    {/* Overlay badges */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      {post.isHot && (
                        <Badge className="bg-red-500 text-white text-xs">HOT</Badge>
                      )}
                      {post.isNew && (
                        <Badge className="bg-green-500 text-white text-xs">NEW</Badge>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90 text-xs">
                        {post.category}
                      </Badge>
                    </div>

                    {/* Like button */}
                    <button
                      onClick={() => handleLikeToggle(post.id)}
                      className="absolute bottom-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          likedPosts.includes(post.id)
                            ? "text-red-500 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {t({ ko: "작성자", en: "by", ja: "作成者", zh: "作者" })} {post.userNickname}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <span className="text-xs">{post.uploadDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* View More Button */}
        <motion.div variants={itemVariants} className="text-center">
          <Link href="/community/showcase">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              {t({ ko: "더 많은 굿즈 보기", en: "View More Goods", ja: "もっとグッズを見る", zh: "查看更多商品" })}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}