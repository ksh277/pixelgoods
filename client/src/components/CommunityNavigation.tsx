import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { Share2, Calendar, FileText, Users, MessageSquare } from "lucide-react";

interface CommunityNavItem {
  id: string;
  label: { ko: string; en: string; ja: string; zh: string };
  description: { ko: string; en: string; ja: string; zh: string };
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isNew?: boolean;
}

const communityNavItems: CommunityNavItem[] = [
  {
    id: "showcase",
    label: { ko: "내가만든거보여줄게", en: "My Works", ja: "私の作品", zh: "我的作品" },
    description: { ko: "창작물 자랑 및 후기 공유", en: "Share your creations and reviews", ja: "創作物の紹介とレビュー共有", zh: "分享你的创作和评论" },
    href: "/community",
    icon: Users,
    badge: "HOT"
  },
  {
    id: "design-share",
    label: { ko: "도안공유", en: "Design Sharing", ja: "デザイン共有", zh: "设计分享" },
    description: { ko: "디자인 템플릿 공유 및 다운로드", en: "Share and download design templates", ja: "デザインテンプレートの共有とダウンロード", zh: "分享和下载设计模板" },
    href: "/community/design-share",
    icon: Share2,
    isNew: true
  },
  {
    id: "events",
    label: { ko: "이벤트", en: "Events & Contests", ja: "イベント・コンテスト", zh: "活动与比赛" },
    description: { ko: "다양한 이벤트 및 공모전 참여", en: "Join various events and contests", ja: "様々なイベントやコンテストに参加", zh: "参加各种活动和比赛" },
    href: "/community/events",
    icon: Calendar,
    badge: "3"
  },
  {
    id: "resources",
    label: { ko: "자료실", en: "AllThat Note", ja: "オールザット・ノート", zh: "AllThat笔记" },
    description: { ko: "제작 가이드 및 템플릿 다운로드", en: "Download production guides and templates", ja: "製作ガイドとテンプレートのダウンロード", zh: "下载制作指南和模板" },
    href: "/community/resources",
    icon: FileText,
    isNew: true
  },
  {
    id: "qa",
    label: { ko: "궁금햄물어바", en: "Q&A", ja: "質問・回答", zh: "问答" },
    description: { ko: "질문과 답변, 제작 문의", en: "Questions, answers, and production inquiries", ja: "質問・回答、製作相談", zh: "问题、答案和制作咨询" },
    href: "/community/question",
    icon: MessageSquare
  }
];

interface CommunityNavigationProps {
  className?: string;
}

export function CommunityNavigation({ className }: CommunityNavigationProps) {
  const { t } = useLanguage();
  const [location] = useLocation();

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t({ ko: "커뮤니티", en: "Community", ja: "コミュニティ", zh: "社区" })}
        </h2>
        <p className="text-gray-600">
          {t({ ko: "창작자들과 함께 소통하고 경험을 나누세요", en: "Connect with creators and share experiences", ja: "クリエイターと交流し、経験を共有しましょう", zh: "与创作者交流并分享经验" })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communityNavItems.map((item) => {
          const isActive = location === item.href;
          const IconComponent = item.icon;
          
          return (
            <Link key={item.id} href={item.href}>
              <Card className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
                isActive ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isActive ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-100'
                      }`}>
                        <IconComponent className={`h-5 w-5 ${
                          isActive ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg ${
                          isActive ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {t(item.label)}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      {item.isNew && (
                        <Badge className="bg-green-500 text-white text-xs">NEW</Badge>
                      )}
                      {item.badge && (
                        <Badge className="bg-red-500 text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {t(item.description)}
                  </p>
                  
                  <Button 
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {isActive ? (
                      t({ ko: "현재 페이지", en: "Current Page", ja: "現在のページ", zh: "当前页面" })
                    ) : (
                      t({ ko: "바로가기", en: "Go to Section", ja: "セクションへ", zh: "前往部分" })
                    )}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}