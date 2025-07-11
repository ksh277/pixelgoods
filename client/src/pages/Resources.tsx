import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Image, Video, Archive, ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "wouter";

export default function Resources() {
  const { language, t } = useLanguage();

  const resourceCategories = [
    {
      id: 1,
      title: { ko: "디자인 템플릿", en: "Design Templates" },
      description: { ko: "다양한 굿즈 제작을 위한 디자인 템플릿", en: "Design templates for various goods" },
      icon: <Image className="w-6 h-6" />,
      items: [
        { name: "아크릴 키링 템플릿", type: "AI", size: "2MB" },
        { name: "스탠드 디자인 템플릿", type: "PSD", size: "5MB" },
        { name: "스티커 템플릿", type: "AI", size: "3MB" },
        { name: "폰케이스 템플릿", type: "PSD", size: "8MB" }
      ]
    },
    {
      id: 2,
      title: { ko: "제작 가이드", en: "Production Guide" },
      description: { ko: "올바른 제작을 위한 가이드 문서", en: "Guide documents for proper production" },
      icon: <FileText className="w-6 h-6" />,
      items: [
        { name: "디자인 제작 가이드", type: "PDF", size: "4MB" },
        { name: "색상 표현 가이드", type: "PDF", size: "2MB" },
        { name: "해상도 설정 가이드", type: "PDF", size: "1MB" },
        { name: "파일 포맷 가이드", type: "PDF", size: "3MB" }
      ]
    },
    {
      id: 3,
      title: { ko: "튜토리얼 영상", en: "Tutorial Videos" },
      description: { ko: "제작 과정을 따라할 수 있는 영상 자료", en: "Video materials for production process" },
      icon: <Video className="w-6 h-6" />,
      items: [
        { name: "아크릴 키링 제작 과정", type: "MP4", size: "25MB" },
        { name: "스탠드 디자인 팁", type: "MP4", size: "18MB" },
        { name: "올댓에디터 사용법", type: "MP4", size: "32MB" },
        { name: "파일 준비 과정", type: "MP4", size: "15MB" }
      ]
    },
    {
      id: 4,
      title: { ko: "폰트 패키지", en: "Font Package" },
      description: { ko: "상업적 사용 가능한 폰트 모음", en: "Commercial use available font collection" },
      icon: <Archive className="w-6 h-6" />,
      items: [
        { name: "한글 폰트 패키지", type: "ZIP", size: "45MB" },
        { name: "영문 폰트 패키지", type: "ZIP", size: "38MB" },
        { name: "장식 폰트 패키지", type: "ZIP", size: "52MB" },
        { name: "손글씨 폰트 패키지", type: "ZIP", size: "28MB" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">자료실</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t({ ko: "자료실", en: "Resources" })}
          </h1>
          <p className="text-gray-600">
            {t({ 
              ko: "굿즈 제작에 필요한 다양한 자료를 다운로드하세요", 
              en: "Download various materials needed for goods production" 
            })}
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {resourceCategories.map((category) => (
            <Card key={category.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {t(category.title)}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {t(category.description)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Download className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {item.name}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {item.type}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {item.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        {t({ ko: "다운로드", en: "Download" })}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Notice */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  {t({ ko: "자료 이용 안내", en: "Resource Usage Guide" })}
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• {t({ ko: "모든 자료는 회원 가입 후 무료로 다운로드 가능합니다", en: "All materials are free to download after registration" })}</li>
                  <li>• {t({ ko: "상업적 사용이 가능하며, 재배포는 금지됩니다", en: "Commercial use is allowed, redistribution is prohibited" })}</li>
                  <li>• {t({ ko: "자료 사용 시 출처 표기를 권장합니다", en: "Source attribution is recommended when using materials" })}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}