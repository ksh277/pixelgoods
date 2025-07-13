import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "wouter";
import { Home, ArrowLeft, Search } from "lucide-react";
import { BelugaMascot } from "@/components/BelugaMascot";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <BelugaMascot variant="error" className="mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t({ 
                  ko: "앗! 벨루가가 길을 잃었어요...", 
                  en: "Oops! Beluga got lost...", 
                  ja: "おっと！ベルーガが迷子になってしまいました...", 
                  zh: "哎呀！白鲸迷路了..." 
                })}
              </h2>
              <p className="text-gray-600 mb-6">
                {t({ 
                  ko: "요청하신 페이지를 찾을 수 없습니다. 다른 경로를 확인해보시거나 홈페이지로 돌아가주세요.", 
                  en: "The page you requested could not be found. Please check another path or return to the homepage.", 
                  ja: "お探しのページが見つかりません。他のパスをご確認いただくか、ホームページに戻ってください。", 
                  zh: "找不到您请求的页面。请检查其他路径或返回主页。" 
                })}
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/" className="w-full">
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white">
                  <Home className="w-4 h-4 mr-2" />
                  {t({ 
                    ko: "홈페이지로 돌아가기", 
                    en: "Go to Homepage", 
                    ja: "ホームページに戻る", 
                    zh: "返回主页" 
                  })}
                </Button>
              </Link>

              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="w-full h-12"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t({ 
                  ko: "이전 페이지로", 
                  en: "Previous Page", 
                  ja: "前のページに戻る", 
                  zh: "返回上一页" 
                })}
              </Button>

              <Link href="/products" className="w-full">
                <Button variant="outline" className="w-full h-12">
                  <Search className="w-4 h-4 mr-2" />
                  {t({ 
                    ko: "상품 둘러보기", 
                    en: "Browse Products", 
                    ja: "商品を見る", 
                    zh: "浏览产品" 
                  })}
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                {t({ 
                  ko: "자주 찾는 페이지", 
                  en: "Popular Pages", 
                  ja: "よく利用されるページ", 
                  zh: "常用页面" 
                })}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/editor">
                  <Button variant="ghost" size="sm" className="text-xs">
                    {t({ ko: "굿즈 에디터", en: "Goods Editor", ja: "グッズエディター", zh: "商品编辑器" })}
                  </Button>
                </Link>
                <Link href="/community">
                  <Button variant="ghost" size="sm" className="text-xs">
                    {t({ ko: "커뮤니티", en: "Community", ja: "コミュニティ", zh: "社区" })}
                  </Button>
                </Link>
                <Link href="/inquiry">
                  <Button variant="ghost" size="sm" className="text-xs">
                    {t({ ko: "문의", en: "Inquiry", ja: "お問い合わせ", zh: "咨询" })}
                  </Button>
                </Link>
                <Link href="/rewards">
                  <Button variant="ghost" size="sm" className="text-xs">
                    {t({ ko: "혜택", en: "Benefits", ja: "特典", zh: "福利" })}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}