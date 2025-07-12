import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { Share2, Calendar, FileText, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  showCommunityNav?: boolean;
}

interface CommunityNavItem {
  id: string;
  label: { ko: string; en: string; ja: string; zh: string };
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isNew?: boolean;
}

const communityNavItems: CommunityNavItem[] = [
  {
    id: "showcase",
    label: { ko: "내가만든거보여줄게", en: "My Works", ja: "私の作品", zh: "我的作品" },
    href: "/community",
    icon: Users,
    badge: "HOT"
  },
  {
    id: "design-share",
    label: { ko: "도안공유", en: "Design Sharing", ja: "デザイン共有", zh: "设计分享" },
    href: "/community/design-share",
    icon: Share2,
    isNew: true
  },
  {
    id: "events",
    label: { ko: "이벤트", en: "Events & Contests", ja: "イベント・コンテスト", zh: "活动与比赛" },
    href: "/community/events",
    icon: Calendar,
    badge: "3"
  },
  {
    id: "resources",
    label: { ko: "자료실", en: "AllThat Note", ja: "オールザット・ノート", zh: "AllThat笔记" },
    href: "/community/resources",
    icon: FileText,
    isNew: true
  },
  {
    id: "qa",
    label: { ko: "궁금햄물어바", en: "Q&A", ja: "質問・回答", zh: "问答" },
    href: "/community/question",
    icon: MessageSquare
  }
];

function CommunityTopNav() {
  const { t } = useLanguage();
  const [location] = useLocation();

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {communityNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href || 
                              (item.href === '/community' && location === '/community') ||
                              (item.href !== '/community' && location.startsWith(item.href));
              
              return (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "relative h-10 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive 
                        ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {t(item.label)}
                    {item.badge && (
                      <Badge 
                        variant={item.badge === "HOT" ? "destructive" : "secondary"}
                        className="ml-2 h-4 px-1.5 text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.isNew && (
                      <Badge variant="default" className="ml-2 h-4 px-1.5 text-xs bg-green-500">
                        NEW
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-1 overflow-x-auto">
            {communityNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href || 
                              (item.href === '/community' && location === '/community') ||
                              (item.href !== '/community' && location.startsWith(item.href));
              
              return (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "relative flex-shrink-0 h-8 px-2 text-xs font-medium rounded-md transition-colors",
                      isActive 
                        ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {t(item.label)}
                    {item.badge && (
                      <Badge 
                        variant={item.badge === "HOT" ? "destructive" : "secondary"}
                        className="ml-1 h-3 px-1 text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.isNew && (
                      <Badge variant="default" className="ml-1 h-3 px-1 text-xs bg-green-500">
                        NEW
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Layout({ children, showCommunityNav = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showCommunityNav && <CommunityTopNav />}
      <div className={cn(showCommunityNav ? "pt-0" : "")}>
        {children}
      </div>
    </div>
  );
}