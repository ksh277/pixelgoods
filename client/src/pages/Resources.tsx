import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Image, Video, Archive, ChevronRight, Star, Sparkles, Eye, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "wouter";
import { BelugaMascot } from "@/components/BelugaMascot";

export default function Resources() {
  const { language, t } = useLanguage();

  // Create production-ready Beluga character template SVG for each merchandise type
  const createBelugaTemplate = (productType: string) => {
    const templateElements = {
      keyring: `
        <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <!-- Background -->
          <rect width="400" height="400" fill="transparent"/>
          
          <!-- Keyring hole guide (top) -->
          <circle cx="200" cy="40" r="8" fill="none" stroke="#3b82f6" stroke-width="3"/>
          <text x="200" y="30" text-anchor="middle" font-size="14" fill="#3b82f6" font-weight="bold">타공 위치</text>
          
          <!-- Main Beluga Character (70% of template) -->
          <g transform="translate(200, 220)">
            <!-- Body -->
            <ellipse cx="0" cy="20" rx="85" ry="75" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Head -->
            <ellipse cx="0" cy="-40" rx="70" ry="55" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Eyes -->
            <circle cx="-25" cy="-50" r="8" fill="#2d3748"/>
            <circle cx="25" cy="-50" r="8" fill="#2d3748"/>
            <circle cx="-23" cy="-52" r="3" fill="#ffffff"/>
            <circle cx="27" cy="-52" r="3" fill="#ffffff"/>
            
            <!-- Mouth -->
            <path d="M -15 -25 Q 0 -20 15 -25" stroke="#2d3748" stroke-width="4" fill="none" stroke-linecap="round"/>
            
            <!-- Fins -->
            <ellipse cx="-70" cy="0" rx="20" ry="12" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            <ellipse cx="70" cy="0" rx="20" ry="12" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            
            <!-- Belly -->
            <ellipse cx="0" cy="30" rx="45" ry="35" fill="#f7fafc" stroke="#2d3748" stroke-width="2"/>
          </g>
          
          <!-- Template guidelines -->
          <rect x="50" y="80" width="300" height="280" fill="none" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="10,5"/>
          
          <!-- Size specifications -->
          <text x="200" y="380" text-anchor="middle" font-size="16" fill="#4a5568" font-weight="bold">50×50mm</text>
          <text x="200" y="395" text-anchor="middle" font-size="12" fill="#718096">권장 사이즈</text>
        </svg>
      `,
      stand: `
        <svg width="400" height="480" viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg">
          <!-- Background -->
          <rect width="400" height="480" fill="transparent"/>
          
          <!-- Stand base (bottom) -->
          <rect x="100" y="400" width="200" height="20" fill="#4a5568" stroke="#2d3748" stroke-width="2"/>
          <text x="200" y="440" text-anchor="middle" font-size="14" fill="#4a5568" font-weight="bold">받침대</text>
          
          <!-- Support structure -->
          <rect x="180" y="350" width="40" height="50" fill="#e2e8f0" stroke="#a0aec0" stroke-width="2"/>
          
          <!-- Main Beluga Character (70% of template) -->
          <g transform="translate(200, 240)">
            <!-- Body -->
            <ellipse cx="0" cy="40" rx="90" ry="80" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Head -->
            <ellipse cx="0" cy="-30" rx="75" ry="60" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Eyes -->
            <circle cx="-28" cy="-40" r="9" fill="#2d3748"/>
            <circle cx="28" cy="-40" r="9" fill="#2d3748"/>
            <circle cx="-26" cy="-42" r="3" fill="#ffffff"/>
            <circle cx="30" cy="-42" r="3" fill="#ffffff"/>
            
            <!-- Mouth -->
            <path d="M -18 -15 Q 0 -10 18 -15" stroke="#2d3748" stroke-width="4" fill="none" stroke-linecap="round"/>
            
            <!-- Fins -->
            <ellipse cx="-75" cy="10" rx="22" ry="15" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            <ellipse cx="75" cy="10" rx="22" ry="15" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            
            <!-- Belly -->
            <ellipse cx="0" cy="50" rx="50" ry="40" fill="#f7fafc" stroke="#2d3748" stroke-width="2"/>
          </g>
          
          <!-- Template guidelines -->
          <rect x="60" y="80" width="280" height="320" fill="none" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="10,5"/>
          
          <!-- Size specifications -->
          <text x="200" y="465" text-anchor="middle" font-size="16" fill="#4a5568" font-weight="bold">60×80mm</text>
          <text x="200" y="480" text-anchor="middle" font-size="12" fill="#718096">권장 사이즈</text>
        </svg>
      `,
      smarttok: `
        <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <!-- Background -->
          <rect width="400" height="400" fill="transparent"/>
          
          <!-- Smart tok center square guide -->
          <rect x="160" y="160" width="80" height="80" fill="none" stroke="#3b82f6" stroke-width="3" stroke-dasharray="8,4"/>
          <text x="200" y="150" text-anchor="middle" font-size="14" fill="#3b82f6" font-weight="bold">중앙 정사각형</text>
          
          <!-- Main Beluga Character (70% of template) -->
          <g transform="translate(200, 200)">
            <!-- Body -->
            <ellipse cx="0" cy="30" rx="80" ry="70" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Head -->
            <ellipse cx="0" cy="-25" rx="65" ry="50" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Eyes -->
            <circle cx="-22" cy="-35" r="7" fill="#2d3748"/>
            <circle cx="22" cy="-35" r="7" fill="#2d3748"/>
            <circle cx="-20" cy="-37" r="2" fill="#ffffff"/>
            <circle cx="24" cy="-37" r="2" fill="#ffffff"/>
            
            <!-- Mouth -->
            <path d="M -12 -15 Q 0 -10 12 -15" stroke="#2d3748" stroke-width="3" fill="none" stroke-linecap="round"/>
            
            <!-- Fins -->
            <ellipse cx="-65" cy="5" rx="18" ry="12" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            <ellipse cx="65" cy="5" rx="18" ry="12" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            
            <!-- Belly -->
            <ellipse cx="0" cy="40" rx="45" ry="35" fill="#f7fafc" stroke="#2d3748" stroke-width="2"/>
          </g>
          
          <!-- Template guidelines -->
          <circle cx="200" cy="200" r="120" fill="none" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="10,5"/>
          
          <!-- Size specifications -->
          <text x="200" y="370" text-anchor="middle" font-size="16" fill="#4a5568" font-weight="bold">40×40mm</text>
          <text x="200" y="385" text-anchor="middle" font-size="12" fill="#718096">권장 사이즈</text>
        </svg>
      `,
      photoholder: `
        <svg width="400" height="500" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
          <!-- Background -->
          <rect width="400" height="500" fill="transparent"/>
          
          <!-- Photo holder frame guide (top) -->
          <rect x="150" y="40" width="100" height="140" fill="none" stroke="#8b5cf6" stroke-width="3" stroke-dasharray="8,4"/>
          <text x="200" y="30" text-anchor="middle" font-size="14" fill="#8b5cf6" font-weight="bold">프레임 가이드</text>
          
          <!-- Main Beluga Character (70% of template) -->
          <g transform="translate(200, 300)">
            <!-- Body -->
            <ellipse cx="0" cy="50" rx="85" ry="75" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Head -->
            <ellipse cx="0" cy="-20" rx="70" ry="55" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Eyes -->
            <circle cx="-25" cy="-30" r="8" fill="#2d3748"/>
            <circle cx="25" cy="-30" r="8" fill="#2d3748"/>
            <circle cx="-23" cy="-32" r="3" fill="#ffffff"/>
            <circle cx="27" cy="-32" r="3" fill="#ffffff"/>
            
            <!-- Mouth -->
            <path d="M -15 -5 Q 0 0 15 -5" stroke="#2d3748" stroke-width="4" fill="none" stroke-linecap="round"/>
            
            <!-- Fins -->
            <ellipse cx="-70" cy="20" rx="20" ry="12" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            <ellipse cx="70" cy="20" rx="20" ry="12" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            
            <!-- Belly -->
            <ellipse cx="0" cy="60" rx="45" ry="35" fill="#f7fafc" stroke="#2d3748" stroke-width="2"/>
          </g>
          
          <!-- Template guidelines -->
          <rect x="70" y="100" width="260" height="340" fill="none" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="10,5"/>
          
          <!-- Size specifications -->
          <text x="200" y="470" text-anchor="middle" font-size="16" fill="#4a5568" font-weight="bold">55×85mm</text>
          <text x="200" y="485" text-anchor="middle" font-size="12" fill="#718096">권장 사이즈</text>
        </svg>
      `,
      corot: `
        <svg width="400" height="440" viewBox="0 0 400 440" xmlns="http://www.w3.org/2000/svg">
          <!-- Background -->
          <rect width="400" height="440" fill="transparent"/>
          
          <!-- Flat character outline -->
          <rect x="80" y="80" width="240" height="280" rx="20" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="8,4"/>
          <text x="200" y="70" text-anchor="middle" font-size="14" fill="#f59e0b" font-weight="bold">평면 캐릭터 영역</text>
          
          <!-- Main Beluga Character (70% of template) -->
          <g transform="translate(200, 220)">
            <!-- Body (flattened) -->
            <ellipse cx="0" cy="20" rx="75" ry="65" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Head (flattened) -->
            <ellipse cx="0" cy="-35" rx="60" ry="45" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Eyes (emphasized for flat design) -->
            <circle cx="-22" cy="-45" r="9" fill="#2d3748"/>
            <circle cx="22" cy="-45" r="9" fill="#2d3748"/>
            <circle cx="-20" cy="-47" r="3" fill="#ffffff"/>
            <circle cx="24" cy="-47" r="3" fill="#ffffff"/>
            
            <!-- Mouth (more prominent) -->
            <path d="M -18 -20 Q 0 -15 18 -20" stroke="#2d3748" stroke-width="4" fill="none" stroke-linecap="round"/>
            
            <!-- Fins (flattened) -->
            <ellipse cx="-55" cy="0" rx="15" ry="10" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            <ellipse cx="55" cy="0" rx="15" ry="10" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            
            <!-- Belly -->
            <ellipse cx="0" cy="30" rx="40" ry="30" fill="#f7fafc" stroke="#2d3748" stroke-width="2"/>
            
            <!-- Decorative element -->
            <circle cx="0" cy="50" r="12" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
          </g>
          
          <!-- Size specifications -->
          <text x="200" y="410" text-anchor="middle" font-size="16" fill="#4a5568" font-weight="bold">40×60mm</text>
          <text x="200" y="425" text-anchor="middle" font-size="12" fill="#718096">권장 사이즈</text>
        </svg>
      `,
      badge: `
        <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <!-- Background -->
          <rect width="400" height="400" fill="transparent"/>
          
          <!-- Badge circle guide -->
          <circle cx="200" cy="200" r="120" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="8,4"/>
          <text x="200" y="90" text-anchor="middle" font-size="14" fill="#ef4444" font-weight="bold">원형 뱃지 영역</text>
          
          <!-- Main Beluga Character (70% of template) -->
          <g transform="translate(200, 200)">
            <!-- Body -->
            <ellipse cx="0" cy="25" rx="75" ry="65" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Head -->
            <ellipse cx="0" cy="-30" rx="60" ry="50" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Eyes -->
            <circle cx="-20" cy="-40" r="7" fill="#2d3748"/>
            <circle cx="20" cy="-40" r="7" fill="#2d3748"/>
            <circle cx="-18" cy="-42" r="2" fill="#ffffff"/>
            <circle cx="22" cy="-42" r="2" fill="#ffffff"/>
            
            <!-- Mouth -->
            <path d="M -12 -20 Q 0 -15 12 -20" stroke="#2d3748" stroke-width="3" fill="none" stroke-linecap="round"/>
            
            <!-- Fins -->
            <ellipse cx="-60" cy="0" rx="18" ry="12" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            <ellipse cx="60" cy="0" rx="18" ry="12" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            
            <!-- Belly -->
            <ellipse cx="0" cy="35" rx="40" ry="30" fill="#f7fafc" stroke="#2d3748" stroke-width="2"/>
            
            <!-- Badge star -->
            <circle cx="0" cy="20" r="18" fill="#ef4444" stroke="#dc2626" stroke-width="3"/>
            <text x="0" y="26" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="bold">★</text>
          </g>
          
          <!-- Size specifications -->
          <text x="200" y="350" text-anchor="middle" font-size="16" fill="#4a5568" font-weight="bold">44×44mm</text>
          <text x="200" y="365" text-anchor="middle" font-size="12" fill="#718096">권장 사이즈</text>
        </svg>
      `,
      magnet: `
        <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <!-- Background -->
          <rect width="400" height="400" fill="transparent"/>
          
          <!-- Refrigerator background -->
          <rect x="280" y="80" width="60" height="160" fill="#f7fafc" stroke="#a0aec0" stroke-width="3"/>
          <rect x="290" y="130" width="30" height="20" fill="#dc2626" stroke="#b91c1c" stroke-width="2"/>
          <text x="200" y="70" text-anchor="middle" font-size="14" fill="#4a5568" font-weight="bold">냉장고 자석</text>
          
          <!-- Main Beluga Character (70% of template) -->
          <g transform="translate(200, 200)">
            <!-- Body -->
            <ellipse cx="0" cy="25" rx="80" ry="70" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Head -->
            <ellipse cx="0" cy="-30" rx="65" ry="50" fill="#ffffff" stroke="#2d3748" stroke-width="4"/>
            
            <!-- Eyes -->
            <circle cx="-22" cy="-40" r="8" fill="#2d3748"/>
            <circle cx="22" cy="-40" r="8" fill="#2d3748"/>
            <circle cx="-20" cy="-42" r="3" fill="#ffffff"/>
            <circle cx="24" cy="-42" r="3" fill="#ffffff"/>
            
            <!-- Mouth -->
            <path d="M -15 -20 Q 0 -15 15 -20" stroke="#2d3748" stroke-width="4" fill="none" stroke-linecap="round"/>
            
            <!-- Fins -->
            <ellipse cx="-65" cy="0" rx="18" ry="12" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            <ellipse cx="65" cy="0" rx="18" ry="12" fill="#f7fafc" stroke="#2d3748" stroke-width="3"/>
            
            <!-- Belly -->
            <ellipse cx="0" cy="35" rx="45" ry="35" fill="#f7fafc" stroke="#2d3748" stroke-width="2"/>
          </g>
          
          <!-- Template guidelines -->
          <rect x="80" y="80" width="240" height="240" fill="none" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="10,5"/>
          
          <!-- Size specifications -->
          <text x="200" y="360" text-anchor="middle" font-size="16" fill="#4a5568" font-weight="bold">50×50mm</text>
          <text x="200" y="375" text-anchor="middle" font-size="12" fill="#718096">권장 사이즈</text>
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