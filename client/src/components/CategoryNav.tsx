import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  className?: string;
}

export function CategoryNav({ className }: CategoryNavProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('acrylic');

  const categories = [
    {
      id: 'acrylic',
      name: { ko: "아크릴굿즈", en: "Acrylic Goods", ja: "アクリルグッズ", zh: "亚克力商品" },
      items: [
        { ko: "아크릴키링", en: "Acrylic Keychain", ja: "アクリルキーリング", zh: "亚克力钥匙扣" },
        { ko: "코롯토", en: "Corot", ja: "コロット", zh: "科罗托" },
        { ko: "스마트톡", en: "Smart Tok", ja: "スマートトック", zh: "智能支架" },
        { ko: "스탠드/디오라마", en: "Stand/Diorama", ja: "スタンド/ジオラマ", zh: "支架/立体模型" },
        { ko: "포카홀더/포토액자", en: "Photo Holder/Frame", ja: "写真ホルダー/フレーム", zh: "相框/相片夹" },
        { ko: "아크릴쉐이커", en: "Acrylic Shaker", ja: "アクリルシェイカー", zh: "亚克力摇摆器" },
        { ko: "아크릴카라비너", en: "Acrylic Carabiner", ja: "アクリルカラビナ", zh: "亚克力登山扣" },
        { ko: "거울", en: "Mirror", ja: "ミラー", zh: "镜子" },
        { ko: "자석/뱃지/코스터", en: "Magnet/Badge/Coaster", ja: "磁石/バッジ/コースター", zh: "磁铁/徽章/杯垫" },
        { ko: "문구류(집게, 볼펜 등)", en: "Stationery (Clips, Pens)", ja: "文具(クリップ、ペンなど)", zh: "文具(夹子、笔等)" },
        { ko: "아크릴 재단", en: "Acrylic Cutting", ja: "アクリルカット", zh: "亚克力切割" }
      ]
    },
    {
      id: 'wood',
      name: { ko: "우드굿즈", en: "Wood Goods", ja: "ウッドグッズ", zh: "木制商品" },
      items: [
        { ko: "우드키링", en: "Wood Keychain", ja: "ウッドキーリング", zh: "木制钥匙扣" },
        { ko: "우드마그넷", en: "Wood Magnet", ja: "ウッドマグネット", zh: "木制磁铁" },
        { ko: "우드스탠드", en: "Wood Stand", ja: "ウッドスタンド", zh: "木制支架" }
      ]
    },
    {
      id: 'lanyard',
      name: { ko: "렌야드굿즈", en: "Lanyard Goods", ja: "ランヤードグッズ", zh: "挂绳商品" },
      items: [
        { ko: "렌야드 기본끈", en: "Basic Lanyard", ja: "基本ランヤード", zh: "基本挂绳" },
        { ko: "후가공 고리", en: "Post-processed Ring", ja: "後加工リング", zh: "后加工环" },
        { ko: "버클", en: "Buckle", ja: "バックル", zh: "扣子" },
        { ko: "탈부착 장치", en: "Detachable Device", ja: "着脱装置", zh: "可拆卸装置" },
        { ko: "명찰", en: "Name Tag", ja: "名札", zh: "名牌" }
      ]
    },
    {
      id: 'packaging',
      name: { ko: "포장/부자재", en: "Packaging/Materials", ja: "包装/副資材", zh: "包装/辅料" },
      items: [
        { ko: "스와치", en: "Swatch", ja: "スウォッチ", zh: "色样" },
        { ko: "부자재", en: "Materials", ja: "副資材", zh: "辅料" },
        { ko: "포장재", en: "Packaging", ja: "包装材", zh: "包装材料" }
      ]
    }
  ];

  const activeCategory = categories.find(cat => cat.id === activeTab);

  return (
    <div className={cn("bg-white border-b border-gray-200", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex justify-center border-b border-gray-100">
          <div className="flex space-x-8 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={cn(
                  "relative py-4 px-2 text-sm font-medium whitespace-nowrap transition-colors",
                  "hover:text-gray-700 focus:outline-none focus:text-gray-700",
                  activeTab === category.id
                    ? "text-gray-900 border-b-2 border-black"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {t(category.name)}
              </button>
            ))}
          </div>
        </div>

        {/* Sub Menu */}
        <div className="py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {activeCategory?.items.map((item, index) => (
              <div key={index} className="flex items-center">
                <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 whitespace-nowrap">
                  {t(item)}
                </button>
                {index < activeCategory.items.length - 1 && (
                  <div className="w-px h-4 bg-gray-300 mx-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}