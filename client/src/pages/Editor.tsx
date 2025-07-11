import { useState, useRef, useCallback } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Upload, 
  X, 
  Undo2, 
  Redo2, 
  Move, 
  Trash2, 
  Download, 
  Save, 
  FolderOpen,
  Home,
  RotateCcw,
  Scissors,
  HelpCircle,
  Settings,
  MessageCircle,
  Puzzle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductType {
  id: string;
  name: { ko: string; en: string; ja: string; zh: string };
  description: { ko: string; en: string; ja: string; zh: string };
  icon: string;
  defaultSize: { width: number; height: number };
  available: boolean;
}

interface CanvasImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export default function Editor() {
  const { t } = useLanguage();
  const [showProductSelector, setShowProductSelector] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 50, height: 50 });
  const [images, setImages] = useState<CanvasImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [ringPosition, setRingPosition] = useState<'top' | 'left' | 'right'>('top');
  const [ringSize, setRingSize] = useState(3);
  const [whiteAreaAdjustment, setWhiteAreaAdjustment] = useState(0);
  const [removeWhiteSpill, setRemoveWhiteSpill] = useState(false);
  const [doubleSided, setDoubleSided] = useState(false);
  const [currentSide, setCurrentSide] = useState<'front' | 'back'>('front');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const productTypes: ProductType[] = [
    {
      id: 'keyring',
      name: { ko: '키링', en: 'Keyring', ja: 'キーリング', zh: '钥匙扣' },
      description: { ko: '가장 기본적인 아크릴 키링 타공 포함', en: 'Basic acrylic keyring with hole', ja: '基本的なアクリルキーリング（穴あき）', zh: '基本亚克力钥匙扣带孔' },
      icon: '🔑',
      defaultSize: { width: 50, height: 50 },
      available: true
    },
    {
      id: 'stand',
      name: { ko: '스탠드', en: 'Stand', ja: 'スタンド', zh: '支架' },
      description: { ko: '받침대 포함 자립형 아크릴', en: 'Self-standing acrylic with base', ja: '台座付き自立式アクリル', zh: '带底座的自立式亚克力' },
      icon: '🎯',
      defaultSize: { width: 60, height: 80 },
      available: true
    },
    {
      id: 'corot',
      name: { ko: '코롯토', en: 'Corot', ja: 'コロット', zh: '科罗托' },
      description: { ko: '평면형 캐릭터 굿즈', en: 'Flat character goods', ja: '平面キャラクターグッズ', zh: '平面角色商品' },
      icon: '🎨',
      defaultSize: { width: 40, height: 60 },
      available: true
    },
    {
      id: 'photoholder',
      name: { ko: '포카홀더', en: 'Photo Holder', ja: 'フォトホルダー', zh: '相片夹' },
      description: { ko: '카드 형태의 프레임형 굿즈', en: 'Card-type frame goods', ja: 'カード型フレームグッズ', zh: '卡片式框架商品' },
      icon: '🖼️',
      defaultSize: { width: 55, height: 85 },
      available: true
    },
    {
      id: 'smarttok',
      name: { ko: '스마트톡', en: 'Smart Tok', ja: 'スマートトック', zh: '智能支架' },
      description: { ko: '후면에 접착 가능한 톡형 악세사리', en: 'Adhesive tok-type accessory', ja: '背面接着可能なトック型アクセサリー', zh: '后面可粘贴的支架配件' },
      icon: '📱',
      defaultSize: { width: 40, height: 40 },
      available: true
    },
    {
      id: 'badge',
      name: { ko: '뱃지', en: 'Badge', ja: 'バッジ', zh: '徽章' },
      description: { ko: '원형/사각형 금속 또는 아크릴', en: 'Round/square metal or acrylic', ja: '円形/四角形金属またはアクリル', zh: '圆形/方形金属或亚克力' },
      icon: '🏅',
      defaultSize: { width: 44, height: 44 },
      available: true
    },
    {
      id: 'magnet',
      name: { ko: '자석/문구류', en: 'Magnet/Stationery', ja: '磁石/文具類', zh: '磁铁/文具' },
      description: { ko: '냉장고 부착, 문구형 굿즈', en: 'Refrigerator attachment, stationery goods', ja: '冷蔵庫取付、文具型グッズ', zh: '冰箱贴，文具商品' },
      icon: '🧲',
      defaultSize: { width: 50, height: 50 },
      available: true
    },
    {
      id: 'carabiner',
      name: { ko: '카라비너', en: 'Carabiner', ja: 'カラビナ', zh: '登山扣' },
      description: { ko: '고리형 연결 장치 (준비 중)', en: 'Ring-type connector (Coming Soon)', ja: 'リング型接続装置（準備中）', zh: '环形连接装置（准备中）' },
      icon: '🔗',
      defaultSize: { width: 30, height: 60 },
      available: false
    }
  ];

  const handleProductSelect = (product: ProductType) => {
    if (!product.available) return;
    setSelectedProduct(product);
    setCanvasSize(product.defaultSize);
    setShowProductSelector(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: CanvasImage = {
          id: Date.now().toString(),
          src: e.target?.result as string,
          x: 100,
          y: 100,
          width: 150,
          height: 150,
          rotation: 0
        };
        setImages([...images, newImage]);
        setSelectedImage(newImage.id);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageMove = (id: string, deltaX: number, deltaY: number) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, x: img.x + deltaX, y: img.y + deltaY } : img
    ));
  };

  const handleImageResize = (id: string, newWidth: number, newHeight: number) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, width: newWidth, height: newHeight } : img
    ));
  };

  const deleteSelectedImage = () => {
    if (selectedImage) {
      setImages(images.filter(img => img.id !== selectedImage));
      setSelectedImage(null);
    }
  };

  const clearCanvas = () => {
    setImages([]);
    setSelectedImage(null);
  };

  if (showProductSelector) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {t({ ko: '제작할 제품을 선택해주세요', en: 'Select Product to Create', ja: '製作する製品を選択してください', zh: '请选择要制作的产品' })}
                </h1>
                <p className="text-gray-600">
                  {t({ ko: '원하는 굿즈를 클릭하여 에디터를 시작하세요', en: 'Click desired goods to start editor', ja: 'お好みのグッズをクリックしてエディタを開始', zh: '点击所需商品开始编辑器' })}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productTypes.map((product) => (
                  <Card 
                    key={product.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-lg border-2",
                      product.available 
                        ? "hover:border-blue-500 hover:bg-blue-50" 
                        : "opacity-50 cursor-not-allowed bg-gray-50"
                    )}
                    onClick={() => handleProductSelect(product)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{product.icon}</div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {t(product.name)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {t(product.description)}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t({ ko: '기본 사이즈', en: 'Default Size', ja: 'デフォルトサイズ', zh: '默认尺寸' })}: {product.defaultSize.width}×{product.defaultSize.height}mm
                      </div>
                      {!product.available && (
                        <div className="mt-2 text-xs text-red-500 font-medium">
                          {t({ ko: '준비 중', en: 'Coming Soon', ja: '準備中', zh: '准备中' })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline" onClick={() => setShowHelp(true)}>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  {t({ ko: '제작 필독사항', en: 'Production Guide', ja: '製作必読事項', zh: '制作必读事项' })}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Dialog */}
        <Dialog open={showHelp} onOpenChange={setShowHelp}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t({ ko: '제작 필독사항', en: 'Production Guide', ja: '製作必読事項', zh: '制作必读事项' })}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">{t({ ko: '이미지 업로드 가이드', en: 'Image Upload Guide', ja: '画像アップロードガイド', zh: '图片上传指南' })}</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>{t({ ko: '300DPI 이상의 고해상도 이미지를 권장합니다', en: 'High resolution images (300DPI+) recommended', ja: '300DPI以上の高解像度画像を推奨', zh: '建议使用300DPI以上的高分辨率图片' })}</li>
                  <li>{t({ ko: 'PNG, JPG, JPEG 형식을 지원합니다', en: 'PNG, JPG, JPEG formats supported', ja: 'PNG、JPG、JPEG形式をサポート', zh: '支持PNG、JPG、JPEG格式' })}</li>
                  <li>{t({ ko: '파일 크기는 최대 10MB까지 가능합니다', en: 'Maximum file size: 10MB', ja: 'ファイルサイズは最大10MBまで', zh: '文件大小最大10MB' })}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t({ ko: '제작 시 주의사항', en: 'Production Notes', ja: '製作時の注意事項', zh: '制作注意事项' })}</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>{t({ ko: '고리 부분은 자동으로 타공됩니다', en: 'Ring holes are automatically punched', ja: 'リング部分は自動的に打ち抜かれます', zh: '环孔部分自动打孔' })}</li>
                  <li>{t({ ko: '화이트 영역 조절로 투명도를 설정할 수 있습니다', en: 'Adjust transparency with white area control', ja: '白い領域調整で透明度を設定できます', zh: '可通过白色区域调节设置透明度' })}</li>
                  <li>{t({ ko: '앞뒤 다른 디자인으로 제작 가능합니다', en: 'Different designs for front and back available', ja: '表裏異なるデザインで製作可能', zh: '可制作正反面不同设计' })}</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Fixed Floating Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-4 z-50">
          {/* Inquiry Button (Top) */}
          <Button
            variant="outline"
            size="lg"
            className="bg-white hover:bg-gray-50 text-gray-700 shadow-lg border border-gray-200 rounded-full px-4 sm:px-6 py-3 flex items-center space-x-2 transition-all hover:shadow-xl"
            onClick={() => {
              // Navigate to inquiry or chat
              window.open('/inquiry', '_blank');
            }}
          >
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              <span className="font-medium text-xs sm:text-sm">
                {t({ ko: '문의하기', en: 'Inquiry', ja: 'お問い合わせ', zh: '咨询' })}
              </span>
            </div>
          </Button>

          {/* Editor Button (Bottom) */}
          <Button
            size="lg"
            className="bg-black hover:bg-gray-800 text-white shadow-lg rounded-full px-4 sm:px-6 py-3 flex items-center space-x-2 transition-all hover:shadow-xl"
            onClick={() => setShowProductSelector(false)}
          >
            <div className="flex items-center space-x-2">
              <Puzzle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium text-xs sm:text-sm">
                {t({ ko: '🧩 올댓에디터', en: '🧩 AllThat Editor', ja: '🧩 オールザットエディタ', zh: '🧩 全能编辑器' })}
              </span>
            </div>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowProductSelector(true)}
            >
              <Home className="h-4 w-4 mr-2" />
              {t({ ko: '제품 선택', en: 'Select Product', ja: '製品選択', zh: '选择产品' })}
            </Button>
            <div className="text-sm text-gray-600">
              {selectedProduct && (
                <span>
                  {t(selectedProduct.name)} ({canvasSize.width}×{canvasSize.height}mm)
                </span>
              )}
            </div>
          </div>

          {/* Top Right Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Redo2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Move className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={deleteSelectedImage}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <FolderOpen className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowProductSelector(true)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-80 bg-white shadow-sm border-r p-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Size Controls */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                {t({ ko: '사이즈 (mm)', en: 'Size (mm)', ja: 'サイズ (mm)', zh: '尺寸 (mm)' })}
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-gray-500">
                    {t({ ko: '가로', en: 'Width', ja: '横', zh: '宽' })}
                  </Label>
                  <Input
                    type="number"
                    value={canvasSize.width}
                    onChange={(e) => setCanvasSize({ ...canvasSize, width: parseInt(e.target.value) || 0 })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">
                    {t({ ko: '세로', en: 'Height', ja: '縦', zh: '高' })}
                  </Label>
                  <Input
                    type="number"
                    value={canvasSize.height}
                    onChange={(e) => setCanvasSize({ ...canvasSize, height: parseInt(e.target.value) || 0 })}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                {t({ ko: '이미지 업로드', en: 'Image Upload', ja: '画像アップロード', zh: '图片上传' })}
              </Label>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {t({ ko: '+ 내 PC 이미지 불러오기', en: '+ Load Image from PC', ja: '+ PCから画像を読み込み', zh: '+ 从PC加载图片' })}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Background Removal */}
            <div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {}}
              >
                <Scissors className="h-4 w-4 mr-2" />
                {t({ ko: '배경이미지 제거', en: 'Remove Background', ja: '背景画像除去', zh: '移除背景图片' })}
              </Button>
            </div>

            {/* Double Sided */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="double-sided"
                checked={doubleSided}
                onCheckedChange={(checked) => setDoubleSided(checked as boolean)}
              />
              <Label htmlFor="double-sided" className="text-sm">
                {t({ ko: '앞뒤 다르게 그리기', en: 'Different Front/Back', ja: '表裏異なる描画', zh: '正反面不同绘制' })}
              </Label>
            </div>

            {doubleSided && (
              <div className="flex space-x-2">
                <Button
                  variant={currentSide === 'front' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentSide('front')}
                  className="flex-1"
                >
                  {t({ ko: '앞면', en: 'Front', ja: '表面', zh: '正面' })}
                </Button>
                <Button
                  variant={currentSide === 'back' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentSide('back')}
                  className="flex-1"
                >
                  {t({ ko: '뒷면', en: 'Back', ja: '裏面', zh: '背面' })}
                </Button>
              </div>
            )}

            {/* Clear Canvas */}
            <Button
              variant="destructive"
              className="w-full"
              onClick={clearCanvas}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {t({ ko: '캔버스 초기화', en: 'Clear Canvas', ja: 'キャンバスクリア', zh: '清空画布' })}
            </Button>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="relative bg-white rounded-lg shadow-lg border-2 border-gray-300 overflow-hidden">
              <canvas
                ref={canvasRef}
                width={canvasSize.width * 4}
                height={canvasSize.height * 4}
                className="block"
                style={{
                  width: `${canvasSize.width * 4}px`,
                  height: `${canvasSize.height * 4}px`,
                  maxWidth: '600px',
                  maxHeight: '600px'
                }}
              />
              
              {/* Product Guide Overlay */}
              {selectedProduct && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Ring Position Indicator */}
                  <div
                    className={cn(
                      "absolute w-3 h-3 bg-red-500 rounded-full opacity-50",
                      ringPosition === 'top' && "top-2 left-1/2 transform -translate-x-1/2",
                      ringPosition === 'left' && "left-2 top-1/2 transform -translate-y-1/2",
                      ringPosition === 'right' && "right-2 top-1/2 transform -translate-y-1/2"
                    )}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Toolbar */}
          <div className="bg-white border-t p-4">
            <div className="flex items-center justify-center space-x-8">
              {/* Ring Position */}
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium">
                  {t({ ko: '고리방향', en: 'Ring Position', ja: 'リング位置', zh: '环位置' })}:
                </Label>
                <Select value={ringPosition} onValueChange={(value: any) => setRingPosition(value)}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">{t({ ko: '상단', en: 'Top', ja: '上', zh: '上' })}</SelectItem>
                    <SelectItem value="left">{t({ ko: '왼쪽', en: 'Left', ja: '左', zh: '左' })}</SelectItem>
                    <SelectItem value="right">{t({ ko: '오른쪽', en: 'Right', ja: '右', zh: '右' })}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ring Size */}
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium">
                  {t({ ko: '고리크기', en: 'Ring Size', ja: 'リングサイズ', zh: '环尺寸' })}:
                </Label>
                <Select value={ringSize.toString()} onValueChange={(value) => setRingSize(parseFloat(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2mm</SelectItem>
                    <SelectItem value="2.5">2.5mm</SelectItem>
                    <SelectItem value="3">3mm</SelectItem>
                    <SelectItem value="4">4mm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* White Area Adjustment */}
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium">
                  {t({ ko: '화이트영역', en: 'White Area', ja: '白い領域', zh: '白色区域' })}:
                </Label>
                <div className="w-24">
                  <Slider
                    value={[whiteAreaAdjustment]}
                    onValueChange={(value) => setWhiteAreaAdjustment(value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Remove White Spill */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remove-white-spill"
                  checked={removeWhiteSpill}
                  onCheckedChange={(checked) => setRemoveWhiteSpill(checked as boolean)}
                />
                <Label htmlFor="remove-white-spill" className="text-sm">
                  {t({ ko: '흰색 돌출 제거', en: 'Remove White Spill', ja: '白い突出除去', zh: '移除白色溢出' })}
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-4 z-50">
        {/* Inquiry Button (Top) */}
        <Button
          variant="outline"
          size="lg"
          className="bg-white hover:bg-gray-50 text-gray-700 shadow-lg border border-gray-200 rounded-full px-6 py-3 flex items-center space-x-2 transition-all hover:shadow-xl"
          onClick={() => {
            // Navigate to inquiry or chat
            window.open('/inquiry', '_blank');
          }}
        >
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            <span className="font-medium text-sm sm:text-base">
              {t({ ko: '문의하기', en: 'Inquiry', ja: 'お問い合わせ', zh: '咨询' })}
            </span>
          </div>
        </Button>

        {/* Editor Button (Bottom) */}
        <Button
          size="lg"
          className="bg-black hover:bg-gray-800 text-white shadow-lg rounded-full px-6 py-3 flex items-center space-x-2 transition-all hover:shadow-xl"
          onClick={() => setShowProductSelector(true)}
        >
          <div className="flex items-center space-x-2">
            <Puzzle className="h-5 w-5" />
            <span className="font-medium text-sm sm:text-base">
              {t({ ko: '🧩 올댓에디터', en: '🧩 AllThat Editor', ja: '🧩 オールザットエディタ', zh: '🧩 全能编辑器' })}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
}