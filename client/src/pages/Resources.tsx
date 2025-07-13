import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Image, Video, Archive, ChevronRight, Star, Sparkles, Eye, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "wouter";
import { BelugaMascot } from "@/components/BelugaMascot";

export default function Resources() {
  const { language, t } = useLanguage();

  // Create Beluga character template SVG for each merchandise type
  const createBelugaTemplate = (productType: string) => {
    const templateElements = {
      keyring: `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Template guideline -->
          <circle cx="100" cy="50" r="25" fill="none" stroke="#e5e7eb" stroke-width="2" stroke-dasharray="5,5"/>
          <!-- Keyring hole guide -->
          <circle cx="100" cy="25" r="3" fill="none" stroke="#3b82f6" stroke-width="2"/>
          <text x="100" y="20" text-anchor="middle" font-size="8" fill="#3b82f6">구멍</text>
          <!-- Beluga in keyring -->
          <g transform="translate(100, 100)">
            <ellipse cx="0" cy="0" rx="35" ry="30" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <ellipse cx="0" cy="-15" rx="25" ry="20" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <circle cx="-10" cy="-18" r="3" fill="#374151"/>
            <circle cx="10" cy="-18" r="3" fill="#374151"/>
            <path d="M -5 -10 Q 0 -8 5 -10" stroke="#6b7280" stroke-width="2" fill="none"/>
            <ellipse cx="-30" cy="-5" rx="8" ry="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
            <ellipse cx="30" cy="-5" rx="8" ry="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
          </g>
          <!-- Size guide -->
          <text x="100" y="190" text-anchor="middle" font-size="12" fill="#6b7280">50×50mm</text>
        </svg>
      `,
      stand: `
        <svg width="200" height="240" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
          <!-- Stand base guide -->
          <rect x="50" y="200" width="100" height="10" fill="#6b7280" stroke="#374151" stroke-width="1"/>
          <text x="100" y="225" text-anchor="middle" font-size="10" fill="#6b7280">받침대</text>
          <!-- Beluga on stand -->
          <g transform="translate(100, 120)">
            <ellipse cx="0" cy="20" rx="40" ry="35" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <ellipse cx="0" cy="-10" rx="30" ry="25" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <circle cx="-12" cy="-15" r="3" fill="#374151"/>
            <circle cx="12" cy="-15" r="3" fill="#374151"/>
            <path d="M -6 -5 Q 0 -3 6 -5" stroke="#6b7280" stroke-width="2" fill="none"/>
            <ellipse cx="-35" cy="10" rx="8" ry="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
            <ellipse cx="35" cy="10" rx="8" ry="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
          </g>
          <!-- Size guide -->
          <text x="100" y="235" text-anchor="middle" font-size="12" fill="#6b7280">60×80mm</text>
        </svg>
      `,
      smarttok: `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Smart tok circle guide -->
          <circle cx="100" cy="100" r="45" fill="none" stroke="#e5e7eb" stroke-width="2" stroke-dasharray="5,5"/>
          <!-- Beluga with smart tok -->
          <g transform="translate(100, 100)">
            <ellipse cx="0" cy="10" rx="30" ry="25" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <ellipse cx="0" cy="-10" rx="22" ry="18" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <circle cx="-8" cy="-12" r="2" fill="#374151"/>
            <circle cx="8" cy="-12" r="2" fill="#374151"/>
            <path d="M -4 -6 Q 0 -4 4 -6" stroke="#6b7280" stroke-width="2" fill="none"/>
            <!-- Smart tok attachment -->
            <circle cx="25" cy="5" r="8" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1"/>
            <circle cx="25" cy="5" r="4" fill="#ffffff"/>
          </g>
          <!-- Size guide -->
          <text x="100" y="190" text-anchor="middle" font-size="12" fill="#6b7280">40×40mm</text>
        </svg>
      `,
      photoholder: `
        <svg width="200" height="250" viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
          <!-- Photo holder frame guide -->
          <rect x="75" y="50" width="50" height="70" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="5,5"/>
          <text x="100" y="45" text-anchor="middle" font-size="10" fill="#8b5cf6">포토프레임</text>
          <!-- Beluga in photo holder -->
          <g transform="translate(100, 150)">
            <ellipse cx="0" cy="20" rx="35" ry="30" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <ellipse cx="0" cy="-10" rx="25" ry="20" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <circle cx="-10" cy="-12" r="3" fill="#374151"/>
            <circle cx="10" cy="-12" r="3" fill="#374151"/>
            <path d="M -5 -5 Q 0 -3 5 -5" stroke="#6b7280" stroke-width="2" fill="none"/>
            <ellipse cx="-30" cy="10" rx="8" ry="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
            <ellipse cx="30" cy="10" rx="8" ry="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
          </g>
          <!-- Size guide -->
          <text x="100" y="240" text-anchor="middle" font-size="12" fill="#6b7280">55×85mm</text>
        </svg>
      `,
      corot: `
        <svg width="200" height="220" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Flat character outline -->
          <rect x="60" y="60" width="80" height="100" rx="10" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5,5"/>
          <text x="100" y="55" text-anchor="middle" font-size="10" fill="#f59e0b">평면 캐릭터</text>
          <!-- Beluga flat design -->
          <g transform="translate(100, 110)">
            <ellipse cx="0" cy="0" rx="25" ry="20" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <ellipse cx="0" cy="-15" rx="20" ry="15" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <circle cx="-8" cy="-18" r="2" fill="#374151"/>
            <circle cx="8" cy="-18" r="2" fill="#374151"/>
            <path d="M -4 -12 Q 0 -10 4 -12" stroke="#6b7280" stroke-width="2" fill="none"/>
            <circle cx="0" cy="15" r="5" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
          </g>
          <!-- Size guide -->
          <text x="100" y="210" text-anchor="middle" font-size="12" fill="#6b7280">40×60mm</text>
        </svg>
      `,
      badge: `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Badge circle guide -->
          <circle cx="100" cy="100" r="40" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5"/>
          <!-- Beluga with badge -->
          <g transform="translate(100, 100)">
            <ellipse cx="0" cy="10" rx="30" ry="25" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <ellipse cx="0" cy="-10" rx="22" ry="18" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <circle cx="-8" cy="-12" r="2" fill="#374151"/>
            <circle cx="8" cy="-12" r="2" fill="#374151"/>
            <path d="M -4 -6 Q 0 -4 4 -6" stroke="#6b7280" stroke-width="2" fill="none"/>
            <!-- Badge on chest -->
            <circle cx="0" cy="5" r="8" fill="#ef4444" stroke="#dc2626" stroke-width="1"/>
            <text x="0" y="8" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="bold">★</text>
          </g>
          <!-- Size guide -->
          <text x="100" y="190" text-anchor="middle" font-size="12" fill="#6b7280">44×44mm</text>
        </svg>
      `,
      magnet: `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Magnet guide -->
          <rect x="140" y="60" width="30" height="80" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2"/>
          <rect x="145" y="85" width="15" height="10" fill="#dc2626" stroke="#b91c1c" stroke-width="1"/>
          <text x="100" y="55" text-anchor="middle" font-size="10" fill="#6b7280">냉장고 자석</text>
          <!-- Beluga with magnet -->
          <g transform="translate(100, 110)">
            <ellipse cx="0" cy="10" rx="30" ry="25" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <ellipse cx="0" cy="-10" rx="22" ry="18" fill="#ffffff" stroke="#d1d5db" stroke-width="2"/>
            <circle cx="-8" cy="-12" r="2" fill="#374151"/>
            <circle cx="8" cy="-12" r="2" fill="#374151"/>
            <path d="M -4 -6 Q 0 -4 4 -6" stroke="#6b7280" stroke-width="2" fill="none"/>
            <ellipse cx="-25" cy="5" rx="6" ry="4" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
            <ellipse cx="25" cy="5" rx="6" ry="4" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
          </g>
          <!-- Size guide -->
          <text x="100" y="190" text-anchor="middle" font-size="12" fill="#6b7280">50×50mm</text>
        </svg>
      `
    };

    return templateElements[productType as keyof typeof templateElements] || templateElements.keyring;
  };

  // Beluga merchandise templates based on AllThatPrinting resources
  const belugaTemplates = [
    {
      id: 'keyring',
      title: { ko: '렌야드 스트랩 키링', en: 'Lanyard Strap Keyring', ja: 'ランヤードストラップキーリング', zh: '挂绳钥匙扣' },
      description: { ko: '타공 고려 벨루가 키링 템플릿', en: 'Beluga keyring template with hole consideration', ja: '穴加工考慮ベルーガキーリングテンプレート', zh: '考虑打孔的白鲸钥匙扣模板' },
      category: 'template',
      format: 'AI/PSD',
      size: '2000px',
      dpi: '300dpi',
      downloads: 1247,
      featured: true,
      new: false
    },
    {
      id: 'stand',
      title: { ko: '렌티큘러 스탠드', en: 'Lenticular Stand', ja: 'レンチキュラースタンド', zh: '光栅立架' },
      description: { ko: '받침대 연결형 벨루가 스탠드', en: 'Beluga stand with base connection', ja: 'ベース接続型ベルーガスタンド', zh: '带底座连接的白鲸支架' },
      category: 'template',
      format: 'AI/PSD',
      size: '2000px',
      dpi: '300dpi',
      downloads: 892,
      featured: true,
      new: true
    },
    {
      id: 'smarttok',
      title: { ko: '렌티큘러 스마트톡', en: 'Lenticular Smart Tok', ja: 'レンチキュラースマートトック', zh: '光栅智能支架' },
      description: { ko: '원형/사각형 호환 벨루가 스마트톡', en: 'Circular/square compatible Beluga smart tok', ja: '円形/四角形対応ベルーガスマートトック', zh: '圆形/方形兼容白鲸智能支架' },
      category: 'template',
      format: 'AI/PSD',
      size: '2000px',
      dpi: '300dpi',
      downloads: 634,
      featured: false,
      new: true
    },
    {
      id: 'photoholder',
      title: { ko: '증명사진 포카홀더 키링', en: 'ID Photo Holder Keyring', ja: '証明写真ホルダーキーリング', zh: '证件照夹钥匙扣' },
      description: { ko: '세로형 반신 벨루가 포카홀더', en: 'Vertical half-body Beluga photo holder', ja: '縦型半身ベルーガフォトホルダー', zh: '竖向半身白鲸照片夹' },
      category: 'template',
      format: 'AI/PSD',
      size: '2000px',
      dpi: '300dpi',
      downloads: 1156,
      featured: true,
      new: false
    },
    {
      id: 'corot',
      title: { ko: '렌티큘러 코롯토', en: 'Lenticular Corot', ja: 'レンチキュラーコロット', zh: '光栅科罗托' },
      description: { ko: '평면 표정 강조 벨루가 코롯토', en: 'Flat expression-focused Beluga corot', ja: '平面表情強調ベルーガコロット', zh: '平面表情强调白鲸科罗托' },
      category: 'template',
      format: 'AI/PSD',
      size: '2000px',
      dpi: '300dpi',
      downloads: 723,
      featured: false,
      new: true
    },
    {
      id: 'badge',
      title: { ko: '회전형 캐릭터 뱃지', en: 'Rotating Character Badge', ja: '回転型キャラクターバッジ', zh: '旋转角色徽章' },
      description: { ko: '원형 중심 배치 벨루가 뱃지', en: 'Circular center-positioned Beluga badge', ja: '円形中心配置ベルーガバッジ', zh: '圆形居中白鲸徽章' },
      category: 'template',
      format: 'AI/PSD',
      size: '2000px',
      dpi: '300dpi',
      downloads: 445,
      featured: false,
      new: false
    },
    {
      id: 'magnet',
      title: { ko: '자석/문구류 우드굿즈', en: 'Magnet/Stationery Wood Goods', ja: '磁石/文具類ウッドグッズ', zh: '磁铁/文具木制商品' },
      description: { ko: '냉장고 부착용 벨루가 자석', en: 'Refrigerator-attachable Beluga magnet', ja: '冷蔵庫取付用ベルーガマグネット', zh: '冰箱贴白鲸磁铁' },
      category: 'template',
      format: 'AI/PSD',
      size: '2000px',
      dpi: '300dpi',
      downloads: 567,
      featured: false,
      new: false
    }
  ];

  const resourceCategories = [
    {
      id: 1,
      title: { ko: "벨루가 굿즈 템플릿", en: "Beluga Goods Templates", ja: "ベルーガグッズテンプレート", zh: "白鲸商品模板" },
      description: { ko: "올댓프린팅 공식 벨루가 캐릭터 템플릿", en: "Official AllThatPrinting Beluga character templates", ja: "オールザットプリンティング公式ベルーガキャラクターテンプレート", zh: "AllThatPrinting官方白鲸角色模板" },
      icon: <Sparkles className="w-6 h-6" />,
      items: belugaTemplates
    },
    {
      id: 2,
      title: { ko: "제작 가이드", en: "Production Guide", ja: "製作ガイド", zh: "制作指南" },
      description: { ko: "벨루가 캐릭터 제작을 위한 상세 가이드", en: "Detailed guide for Beluga character production", ja: "ベルーガキャラクター製作のための詳細ガイド", zh: "白鲸角色制作详细指南" },
      icon: <FileText className="w-6 h-6" />,
      items: [
        { name: "벨루가 디자인 제작 가이드", type: "PDF", size: "4MB", downloads: 2341 },
        { name: "아크릴 커팅 가이드라인", type: "PDF", size: "2MB", downloads: 1876 },
        { name: "해상도 및 DPI 설정", type: "PDF", size: "1MB", downloads: 1523 },
        { name: "색상 표현 가이드", type: "PDF", size: "3MB", downloads: 1247 }
      ]
    },
    {
      id: 3,
      title: { ko: "튜토리얼 영상", en: "Tutorial Videos", ja: "チュートリアル動画", zh: "教程视频" },
      description: { ko: "벨루가 굿즈 제작 과정 영상", en: "Beluga goods production process videos", ja: "ベルーガグッズ製作プロセス動画", zh: "白鲸商品制作过程视频" },
      icon: <Video className="w-6 h-6" />,
      items: [
        { name: "벨루가 키링 제작 과정", type: "MP4", size: "25MB", downloads: 1892 },
        { name: "스탠드 받침대 조립법", type: "MP4", size: "18MB", downloads: 1456 },
        { name: "올댓에디터 벨루가 활용", type: "MP4", size: "32MB", downloads: 2105 },
        { name: "템플릿 파일 준비 과정", type: "MP4", size: "15MB", downloads: 1678 }
      ]
    },
    {
      id: 4,
      title: { ko: "벨루가 클립아트", en: "Beluga Clip Art", ja: "ベルーガクリップアート", zh: "白鲸剪贴画" },
      description: { ko: "다양한 포즈의 벨루가 클립아트", en: "Beluga clip art in various poses", ja: "様々なポーズのベルーガクリップアート", zh: "各种姿势的白鲸剪贴画" },
      icon: <Image className="w-6 h-6" />,
      items: [
        { name: "벨루가 기본 포즈 세트", type: "PNG", size: "45MB", downloads: 3247 },
        { name: "벨루가 표정 변화 세트", type: "PNG", size: "38MB", downloads: 2891 },
        { name: "벨루가 액션 포즈 세트", type: "PNG", size: "52MB", downloads: 2456 },
        { name: "벨루가 시즌 테마 세트", type: "PNG", size: "28MB", downloads: 1923 }
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

        {/* Featured Beluga Templates Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  {t({ ko: "🐋 벨루가 굿즈 템플릿", en: "🐋 Beluga Goods Templates", ja: "🐋 ベルーガグッズテンプレート", zh: "🐋 白鲸商品模板" })}
                </h2>
                <p className="text-blue-100 mb-4">
                  {t({ ko: "올댓프린팅 공식 벨루가 캐릭터로 나만의 굿즈를 만들어보세요", en: "Create your own goods with AllThatPrinting's official Beluga character", ja: "オールザットプリンティング公式ベルーガキャラクターで自分だけのグッズを作ってみましょう", zh: "使用AllThatPrinting官方白鲸角色制作属于你的商品" })}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    {t({ ko: "7종 템플릿", en: "7 Templates", ja: "7種テンプレート", zh: "7种模板" })}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {t({ ko: "2000px 고해상도", en: "2000px High Resolution", ja: "2000px高解像度", zh: "2000px高分辨率" })}
                  </span>
                </div>
              </div>
              <div className="hidden sm:block">
                <BelugaMascot variant="design" className="w-20 h-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Beluga Templates Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t({ ko: "벨루가 굿즈 템플릿", en: "Beluga Goods Templates", ja: "ベルーガグッズテンプレート", zh: "白鲸商品模板" })}
            </h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/editor">
                {t({ ko: "에디터로 바로가기", en: "Go to Editor", ja: "エディターへ", zh: "前往编辑器" })}
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {belugaTemplates.map((template) => (
              <Card key={template.id} className="group relative overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {template.featured && (
                  <Badge className="absolute top-2 left-2 z-10 bg-yellow-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    {t({ ko: "인기", en: "Popular", ja: "人気", zh: "热门" })}
                  </Badge>
                )}
                {template.new && (
                  <Badge className="absolute top-2 right-2 z-10 bg-green-500 text-white">
                    {t({ ko: "NEW", en: "NEW", ja: "新着", zh: "新品" })}
                  </Badge>
                )}
                
                <div className="aspect-square bg-gray-50 p-4 flex items-center justify-center">
                  <div 
                    className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                    dangerouslySetInnerHTML={{ __html: createBelugaTemplate(template.id) }}
                  />
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {t(template.title)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {t(template.description)}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {template.format}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {template.size}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Download className="w-3 h-3 mr-1" />
                      {template.downloads.toLocaleString()}
                    </div>
                  </div>
                  
                  <Button className="w-full" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    {t({ ko: "다운로드", en: "Download", ja: "ダウンロード", zh: "下载" })}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resourceCategories.slice(1).map((category) => (
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
                            {'downloads' in item && (
                              <span className="text-xs text-gray-500">
                                • {item.downloads.toLocaleString()} downloads
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        {t({ ko: "다운로드", en: "Download", ja: "ダウンロード", zh: "下载" })}
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