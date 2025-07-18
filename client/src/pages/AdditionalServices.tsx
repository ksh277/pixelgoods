import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "wouter";
import { 
  Plus, 
  Clock, 
  Star, 
  Heart, 
  ShoppingCart, 
  ChevronRight,
  Palette,
  Zap,
  Users,
  FileText
} from "lucide-react";

interface AdditionalService {
  id: string;
  name: string;
  nameKo: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: "design" | "speed" | "special";
  isPopular: boolean;
  isRecommended: boolean;
  features: string[];
  deliveryTime: string;
  thumbnail: string;
}

const mockServices: AdditionalService[] = [
  {
    id: "1",
    name: "Design Work [+3,000원]",
    nameKo: "도안작업 [+3,000원]",
    price: 3000,
    description: "전문 디자이너가 고객님의 요청에 따라 기본적인 도안을 제작해드립니다.",
    category: "design",
    isPopular: true,
    isRecommended: false,
    features: ["기본 도안 제작", "2회 수정", "AI 파일 제공", "24시간 내 완성"],
    deliveryTime: "1-2일",
    thumbnail: "#F5E6D3"
  },
  {
    id: "2",
    name: "Design Work [+5,000원]",
    nameKo: "도안작업 [+5,000원]",
    price: 5000,
    description: "고급 디자인 도구와 전문 디자이너의 정교한 작업으로 완성도 높은 도안을 제작합니다.",
    category: "design",
    isPopular: false,
    isRecommended: true,
    features: ["고급 도안 제작", "무제한 수정", "AI/PSD 파일 제공", "12시간 내 완성", "디자인 컨셉 제안"],
    deliveryTime: "12시간",
    thumbnail: "#FFF2CC"
  },
  {
    id: "3",
    name: "Design Work [+7,000원]",
    nameKo: "도안작업 [+7,000원]",
    price: 7000,
    description: "최고급 디자인 서비스로 브랜드 수준의 완성도를 제공합니다.",
    category: "design",
    isPopular: false,
    isRecommended: false,
    features: ["최고급 도안 제작", "무제한 수정", "전 파일 포맷 제공", "6시간 내 완성", "브랜드 가이드 제공"],
    deliveryTime: "6시간",
    thumbnail: "#FFD4B3"
  },
  {
    id: "4",
    name: "Design Work [+10,000원]",
    nameKo: "도안작업 [+10,000원]",
    price: 10000,
    description: "프리미엄 디자인 서비스로 완성도 높은 도안을 제작합니다.",
    category: "design",
    isPopular: true,
    isRecommended: false,
    features: ["프리미엄 도안 제작", "무제한 수정", "전 파일 포맷 제공", "4시간 내 완성", "브랜드 가이드 제공"],
    deliveryTime: "4시간",
    thumbnail: "#D2B48C"
  },
  {
    id: "5",
    name: "Design Work [+15,000원]",
    nameKo: "도안작업 [+15,000원]",
    price: 15000,
    description: "최고급 디자인 서비스로 전문가 수준의 도안을 제작합니다.",
    category: "design",
    isPopular: false,
    isRecommended: true,
    features: ["최고급 도안 제작", "무제한 수정", "전 파일 포맷 제공", "2시간 내 완성", "브랜드 가이드 제공"],
    deliveryTime: "2시간",
    thumbnail: "#8B4513"
  },
  {
    id: "6",
    name: "Design Work [+20,000원]",
    nameKo: "도안작업 [+20,000원]",
    price: 20000,
    description: "최고급 디자인 서비스로 최상의 완성도를 제공합니다.",
    category: "design",
    isPopular: false,
    isRecommended: false,
    features: ["최고급 도안 제작", "무제한 수정", "전 파일 포맷 제공", "1시간 내 완성", "브랜드 가이드 제공"],
    deliveryTime: "1시간",
    thumbnail: "#DEB887"
  },
  {
    id: "7",
    name: "Design Work [+30,000원]",
    nameKo: "도안작업 [+30,000원]",
    price: 30000,
    description: "프리미엄 디자인 서비스로 최상급 완성도를 제공합니다.",
    category: "design",
    isPopular: false,
    isRecommended: false,
    features: ["프리미엄 도안 제작", "무제한 수정", "전 파일 포맷 제공", "30분 내 완성", "브랜드 가이드 제공"],
    deliveryTime: "30분",
    thumbnail: "#8B7355"
  },
  {
    id: "8",
    name: "Quick Payment Additional Service",
    nameKo: "퀵비 추가결제",
    price: 3000,
    description: "긴급한 작업을 위한 초고속 서비스입니다.",
    category: "speed",
    isPopular: true,
    isRecommended: false,
    features: ["초고속 처리", "우선순위 작업", "실시간 진행상황 알림", "2시간 내 완성"],
    deliveryTime: "2시간",
    thumbnail: "#87CEEB"
  }
];

export default function AdditionalServices() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredServices = selectedCategory === "all" 
    ? mockServices 
    : mockServices.filter(service => service.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "design": return <Palette className="w-4 h-4" />;
      case "speed": return <Zap className="w-4 h-4" />;
      case "special": return <Star className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "design": return "bg-blue-100 text-blue-800";
      case "speed": return "bg-orange-100 text-orange-800";
      case "special": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">추가결제 서비스</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t({ ko: "추가결제 서비스", en: "Additional Services", ja: "追加決済サービス", zh: "附加付费服务" })}
          </h1>
          <p className="text-gray-600">
            {t({ ko: "더 빠르고 완성도 높은 서비스를 원하시나요?", en: "Want faster and higher quality service?", ja: "より速く、より完成度の高いサービスをお望みですか？", zh: "想要更快、更高质量的服务吗？" })}
          </p>
        </div>

        {/* Service Categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              전체
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              도안작업
            </TabsTrigger>
            <TabsTrigger value="speed" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              급한작업
            </TabsTrigger>
            <TabsTrigger value="special" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              특별서비스
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Services Grid - Korean E-commerce Card Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow group bg-white border border-gray-200">
              {/* Status Badges - Top Left */}
              <div className="absolute top-3 left-3 flex gap-2 z-10">
                {service.isPopular && (
                  <Badge className="bg-red-500 text-white text-xs font-bold px-2 py-1">
                    HOT
                  </Badge>
                )}
                {service.isRecommended && (
                  <Badge className="bg-blue-500 text-white text-xs font-bold px-2 py-1">
                    추천
                  </Badge>
                )}
              </div>
              
              {/* Heart Icon - Top Right */}
              <div className="absolute top-3 right-3 z-10">
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-white/80 hover:bg-white">
                  <Heart className="w-4 h-4 text-gray-600" />
                </Button>
              </div>

              {/* Circular Thumbnail with Text */}
              <div className="p-4 pb-2">
                <div className="relative mx-auto mb-3" style={{ width: '120px', height: '120px' }}>
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center text-center"
                    style={{ backgroundColor: service.thumbnail }}
                  >
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-800 mb-1">
                        {service.category === "design" ? "도안작업" : "퀵비"}
                      </div>
                      <div className="text-lg font-black text-gray-900">
                        {service.price.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4 pt-0">
                <div className="text-center mb-3">
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{service.nameKo}</h3>
                  <div className="text-sm font-bold text-gray-900 mb-1">
                    {service.price.toLocaleString()} won
                  </div>
                  <div className="text-xs text-gray-500 flex items-center justify-center">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    <span>리뷰 {Math.floor(Math.random() * 200 + 50)}개</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
                  onClick={() => window.location.href = `/product/${service.id}`}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  장바구니
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                맞춤형 서비스가 필요하신가요?
              </h3>
              <p className="text-gray-600 mb-6">
                특별한 요구사항이나 대량 주문을 위한 맞춤형 서비스를 제공합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/inquiry">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                    <Users className="w-4 h-4 mr-2" />
                    상담 신청
                  </Button>
                </Link>
                <Link href="/editor">
                  <Button variant="outline" className="px-8">
                    <Palette className="w-4 h-4 mr-2" />
                    직접 제작하기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}