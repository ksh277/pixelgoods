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
    name: "Basic Design Service",
    nameKo: "기본 도안작업",
    price: 3000,
    description: "전문 디자이너가 고객님의 요청에 따라 기본적인 도안을 제작해드립니다.",
    category: "design",
    isPopular: true,
    isRecommended: false,
    features: ["기본 도안 제작", "2회 수정", "AI 파일 제공", "24시간 내 완성"],
    deliveryTime: "1-2일",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    id: "2",
    name: "Premium Design Service",
    nameKo: "프리미엄 도안작업",
    price: 5000,
    originalPrice: 7000,
    description: "고급 디자인 도구와 전문 디자이너의 정교한 작업으로 완성도 높은 도안을 제작합니다.",
    category: "design",
    isPopular: false,
    isRecommended: true,
    features: ["고급 도안 제작", "무제한 수정", "AI/PSD 파일 제공", "12시간 내 완성", "디자인 컨셉 제안"],
    deliveryTime: "12시간",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    id: "3",
    name: "Deluxe Design Service",
    nameKo: "디럭스 도안작업",
    price: 7000,
    description: "최고급 디자인 서비스로 브랜드 수준의 완성도를 제공합니다.",
    category: "design",
    isPopular: false,
    isRecommended: false,
    features: ["최고급 도안 제작", "무제한 수정", "전 파일 포맷 제공", "6시간 내 완성", "브랜드 가이드 제공"],
    deliveryTime: "6시간",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    id: "4",
    name: "Quick Service",
    nameKo: "퀵비 서비스",
    price: 10000,
    description: "긴급한 작업을 위한 초고속 서비스입니다.",
    category: "speed",
    isPopular: true,
    isRecommended: false,
    features: ["초고속 처리", "우선순위 작업", "실시간 진행상황 알림", "2시간 내 완성"],
    deliveryTime: "2시간",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    id: "5",
    name: "Express Service",
    nameKo: "급한작업 서비스",
    price: 15000,
    description: "당일 완성이 필요한 초급한 작업을 위한 서비스입니다.",
    category: "speed",
    isPopular: false,
    isRecommended: true,
    features: ["당일 완성", "전담 디자이너 배정", "실시간 소통", "1시간 내 완성"],
    deliveryTime: "1시간",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    id: "6",
    name: "Custom Package",
    nameKo: "맞춤 패키지",
    price: 20000,
    description: "고객 맞춤형 특별 서비스 패키지입니다.",
    category: "special",
    isPopular: false,
    isRecommended: false,
    features: ["맞춤형 서비스", "전담 매니저", "VIP 고객 지원", "맞춤 일정 조정"],
    deliveryTime: "협의",
    thumbnail: "/api/placeholder/300/200"
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow group">
              <CardHeader className="pb-4">
                <div className="relative">
                  <img 
                    src={service.thumbnail} 
                    alt={service.nameKo}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {service.isPopular && (
                      <Badge className="bg-red-500 text-white">
                        HOT
                      </Badge>
                    )}
                    {service.isRecommended && (
                      <Badge className="bg-blue-500 text-white">
                        추천
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={getCategoryColor(service.category)}>
                      {getCategoryIcon(service.category)}
                      <span className="ml-1">
                        {service.category === "design" && "도안작업"}
                        {service.category === "speed" && "급한작업"}
                        {service.category === "special" && "특별서비스"}
                      </span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{service.nameKo}</h3>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {service.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₩{service.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xl font-bold text-gray-900">
                        ₩{service.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.deliveryTime}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">포함 서비스</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    장바구니
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
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