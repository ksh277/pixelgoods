import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { BelugaMascot } from "@/components/BelugaMascot";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Beluga Mascot */}
        <div className="mb-8">
          <BelugaMascot variant="error" />
        </div>
        
        {/* Error Message */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t({ 
            ko: "페이지를 찾을 수 없습니다", 
            en: "Page Not Found",
            ja: "ページが見つかりません",
            zh: "页面未找到"
          })}
        </h2>
        <p className="text-gray-600 mb-8">
          {t({ 
            ko: "요청하신 페이지를 찾을 수 없습니다. 올바른 주소를 입력했는지 확인해주세요.",
            en: "The page you're looking for doesn't exist. Please check the URL and try again.",
            ja: "お探しのページは存在しません。URLを確認してもう一度お試しください。",
            zh: "您访问的页面不存在。请检查网址后重试。"
          })}
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto">
              {t({ 
                ko: "홈으로 돌아가기", 
                en: "Go Home",
                ja: "ホームに戻る",
                zh: "返回首页"
              })}
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="w-full sm:w-auto">
              {t({ 
                ko: "상품 보러가기", 
                en: "Browse Products",
                ja: "商品を見る",
                zh: "浏览产品"
              })}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}