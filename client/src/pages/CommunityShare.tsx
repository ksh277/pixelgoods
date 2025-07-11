import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Eye, Upload, Search, Filter, ChevronRight, Plus, Star, Download } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "wouter";
import { useState } from "react";

export default function CommunityShare() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const sharedDesigns = [
    {
      id: 1,
      title: "미니멀 일러스트 키링 디자인",
      description: "깔끔한 선화 스타일의 미니멀 일러스트 키링입니다. 자유롭게 사용하세요!",
      author: "디자이너김**",
      authorLevel: "PRO",
      category: "아크릴키링",
      tags: ["미니멀", "일러스트", "키링", "선화"],
      image: "/api/placeholder/300/300",
      likes: 245,
      views: 1234,
      downloads: 89,
      comments: 23,
      rating: 4.8,
      createdAt: "2024-12-10",
      fileFormat: "AI, PNG",
      fileSize: "3.2MB",
      featured: true
    },
    {
      id: 2,
      title: "귀여운 동물 스티커 팩",
      description: "다양한 동물 캐릭터들의 귀여운 스티커 디자인 모음입니다.",
      author: "토끼굴**",
      authorLevel: "VIP",
      category: "스티커",
      tags: ["동물", "귀여움", "스티커", "캐릭터"],
      image: "/api/placeholder/300/300",
      likes: 189,
      views: 892,
      downloads: 67,
      comments: 18,
      rating: 4.9,
      createdAt: "2024-12-08",
      fileFormat: "PSD, PNG",
      fileSize: "5.7MB",
      featured: false
    },
    {
      id: 3,
      title: "빈티지 레터링 포스터",
      description: "빈티지 감성의 손글씨 레터링 포스터 디자인입니다.",
      author: "빈티지럽**",
      authorLevel: "GOLD",
      category: "포스터",
      tags: ["빈티지", "레터링", "포스터", "손글씨"],
      image: "/api/placeholder/300/300",
      likes: 156,
      views: 678,
      downloads: 45,
      comments: 12,
      rating: 4.6,
      createdAt: "2024-12-05",
      fileFormat: "AI, PDF",
      fileSize: "2.8MB",
      featured: true
    },
    {
      id: 4,
      title: "기하학적 패턴 디자인",
      description: "모던한 기하학적 패턴을 활용한 다양한 굿즈 디자인 템플릿입니다.",
      author: "패턴마스터**",
      authorLevel: "PRO",
      category: "패턴",
      tags: ["기하학", "패턴", "모던", "템플릿"],
      image: "/api/placeholder/300/300",
      likes: 134,
      views: 567,
      downloads: 38,
      comments: 9,
      rating: 4.7,
      createdAt: "2024-12-03",
      fileFormat: "AI, SVG",
      fileSize: "4.1MB",
      featured: false
    },
    {
      id: 5,
      title: "손그림 일러스트 콜렉션",
      description: "따뜻한 감성의 손그림 일러스트 콜렉션을 공유합니다.",
      author: "손그림장인**",
      authorLevel: "VIP",
      category: "일러스트",
      tags: ["손그림", "일러스트", "감성", "콜렉션"],
      image: "/api/placeholder/300/300",
      likes: 198,
      views: 923,
      downloads: 72,
      comments: 15,
      rating: 4.9,
      createdAt: "2024-12-01",
      fileFormat: "PSD, PNG",
      fileSize: "6.3MB",
      featured: true
    },
    {
      id: 6,
      title: "K-POP 스타일 굿즈 디자인",
      description: "K-POP 아이돌 스타일의 굿즈 디자인 템플릿 모음입니다.",
      author: "케이팝러버**",
      authorLevel: "GOLD",
      category: "굿즈",
      tags: ["K-POP", "아이돌", "굿즈", "트렌디"],
      image: "/api/placeholder/300/300",
      likes: 267,
      views: 1456,
      downloads: 95,
      comments: 31,
      rating: 4.8,
      createdAt: "2024-11-28",
      fileFormat: "AI, PNG",
      fileSize: "7.2MB",
      featured: false
    }
  ];

  const categories = [
    { id: "all", name: "전체", count: 156 },
    { id: "keyring", name: "키링", count: 45 },
    { id: "sticker", name: "스티커", count: 32 },
    { id: "poster", name: "포스터", count: 28 },
    { id: "pattern", name: "패턴", count: 23 },
    { id: "illustration", name: "일러스트", count: 18 },
    { id: "goods", name: "굿즈", count: 10 }
  ];

  const filteredDesigns = sharedDesigns.filter(design => {
    const matchesSearch = design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === "all" || design.category.toLowerCase().includes(filterType.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/community" className="hover:text-gray-700">커뮤니티</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">도안공유</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t({ ko: "도안공유", en: "Design Share" })}
              </h1>
              <p className="text-gray-600">
                {t({ 
                  ko: "창작자들의 소중한 디자인을 공유하고 다운로드하세요", 
                  en: "Share and download precious designs from creators" 
                })}
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              {t({ ko: "도안 업로드", en: "Upload Design" })}
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder={t({ ko: "디자인명, 태그, 작성자 검색...", en: "Search designs, tags, authors..." })}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge
                key={category.id}
                variant={filterType === category.id ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-50"
                onClick={() => setFilterType(category.id)}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Designs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            {t({ ko: "추천 도안", en: "Featured Designs" })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredDesigns.filter(design => design.featured).map((design) => (
              <Card key={design.id} className="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={design.image} 
                    alt={design.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-yellow-500 text-white px-3 py-1 text-sm">
                      {t({ ko: "추천", en: "Featured" })}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                    <Eye className="w-4 h-4 inline mr-1" />
                    {design.views}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {design.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{design.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {design.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {design.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <span>{design.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {design.authorLevel}
                      </Badge>
                    </div>
                    <span>{design.createdAt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{design.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{design.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{design.downloads}</span>
                      </div>
                    </div>
                    <Button size="sm">
                      {t({ ko: "다운로드", en: "Download" })}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Designs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t({ ko: "전체 도안", en: "All Designs" })} ({filteredDesigns.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDesigns.map((design) => (
              <Card key={design.id} className="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={design.image} 
                    alt={design.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                    <Eye className="w-4 h-4 inline mr-1" />
                    {design.views}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {design.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{design.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {design.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {design.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {design.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <span>{design.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {design.authorLevel}
                      </Badge>
                    </div>
                    <span>{design.fileFormat}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{design.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{design.downloads}</span>
                      </div>
                    </div>
                    <Button size="sm">
                      {t({ ko: "다운로드", en: "Download" })}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}