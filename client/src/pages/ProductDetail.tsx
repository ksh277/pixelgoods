import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Plus, 
  Minus, 
  Upload,
  Download,
  MessageCircle,
  Puzzle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Palette,
  Package,
  Info,
  ChevronDown,
  ChevronUp,
  Eye,
  User,
  Calendar,
  HelpCircle,
  Phone,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import type { Product, ProductReview } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  
  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedPackaging, setSelectedPackaging] = useState("기본 포장"); // Default packaging
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState("pdf");
  const [customText, setCustomText] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data for demonstration
  const mockProduct = {
    id: parseInt(id || "1"),
    name: "Acrylic Stand",
    nameKo: "아크릴 스탠드",
    nameEn: "Acrylic Stand",
    nameJa: "アクリルスタンド",
    nameZh: "亚克力支架",
    description: "Premium acrylic stand for displaying your custom designs",
    descriptionKo: "맞춤형 디자인을 위한 프리미엄 아크릴 스탠드",
    basePrice: "3500",
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600"
    ],
    sizes: [
      { name: "일반 35x50", price: 3500, description: "기본 사이즈" },
      { name: "라미 70x140", price: 8500, description: "라미네이팅 처리" },
      { name: "대형 100x200", price: 12000, description: "대형 사이즈" }
    ],
    bases: [
      { name: "투명", price: 0, description: "투명 받침" },
      { name: "인쇄", price: 500, description: "인쇄 받침" },
      { name: "라미 3T", price: 800, description: "라미네이팅 3T" },
      { name: "라미 5T", price: 1200, description: "라미네이팅 5T" }
    ],
    quantityRanges: [
      { range: "1~9개", condition: "도안 1종류", multiplier: 1 },
      { range: "10~99개", condition: "도안 1종류", multiplier: 0.9 },
      { range: "100~499개", condition: "도안 3종류 이하", multiplier: 0.8 },
      { range: "500개 이상", condition: "도안 5종류 이하", multiplier: 0.7 }
    ],
    packaging: [
      { name: "기본 포장", price: 0, description: "기본 포장" },
      { name: "OPP 동봉", price: 200, description: "OPP 포장지 동봉" }
    ],
    rating: 4.8,
    reviewCount: 1247,
    isFeatured: true
  };

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      userId: 1,
      productId: 1,
      rating: 5,
      title: "정말 만족스러운 품질이에요!",
      content: "디자인이 선명하게 나오고 아크릴 재질도 고급스럽습니다. 받침도 튼튼하고 완성도가 높네요. 다음에 또 주문할 예정입니다.",
      userName: "창작자님***",
      createdAt: new Date("2024-01-15"),
      images: ["/api/placeholder/150/150", "/api/placeholder/150/150"]
    },
    {
      id: 2,
      userId: 2,
      productId: 1,
      rating: 4,
      title: "빠른 배송과 좋은 퀄리티",
      content: "주문 후 2일 만에 받았어요. 색상도 정확하고 크기도 딱 맞습니다. 포장도 깔끔하게 되어있고 만족합니다.",
      userName: "굿즈러버***",
      createdAt: new Date("2024-01-10"),
      images: ["/api/placeholder/150/150"]
    }
  ];

  // Calculate total price
  const calculateTotalPrice = () => {
    const basePrice = mockProduct.basePrice ? parseInt(mockProduct.basePrice) : 0;
    const sizePrice = mockProduct.sizes.find(s => s.name === selectedSize)?.price || 0;
    const baseTypePrice = mockProduct.bases.find(b => b.name === selectedBase)?.price || 0;
    const packagingPrice = mockProduct.packaging.find(p => p.name === selectedPackaging)?.price || 0;
    
    const subtotal = sizePrice + baseTypePrice + packagingPrice;
    const quantityRange = mockProduct.quantityRanges.find(r => {
      const [min, max] = r.range.split('~').map(n => parseInt(n.replace(/\D/g, '')));
      return quantity >= min && (isNaN(max) || quantity <= max);
    });
    const multiplier = quantityRange?.multiplier || 1;
    
    return Math.round(subtotal * multiplier * quantity);
  };

  // File upload handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: t({ ko: "파일 업로드 완료", en: "File uploaded successfully" }),
        description: t({ ko: `${file.name}이(가) 업로드되었습니다.`, en: `${file.name} has been uploaded.` }),
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      toast({
        title: t({ ko: "PDF 파일 업로드 완료", en: "PDF file uploaded successfully" }),
        description: t({ ko: `${file.name}이(가) 업로드되었습니다.`, en: `${file.name} has been uploaded.` }),
      });
    }
  };

  const handleAddToCart = () => {
    // Validate required selections
    if (!selectedSize || !selectedBase) {
      toast({
        title: t({ ko: "옵션을 선택해주세요", en: "Please select options" }),
        description: t({ ko: "사이즈와 받침을 선택해야 합니다.", en: "Size and base must be selected." }),
        variant: "destructive",
      });
      return;
    }

    try {
      // Create cart item object
      const cartItem = {
        id: mockProduct.id,
        name: mockProduct.name,
        nameKo: mockProduct.nameKo,
        price: calculateTotalPrice(),
        quantity: quantity,
        image: mockProduct.images[0],
        options: {
          size: selectedSize,
          base: selectedBase,
          packaging: selectedPackaging,
          uploadedFile: uploadedFile?.name || null,
          customText: customText || null,
          activeTab: activeTab
        }
      };

      // Get existing cart from localStorage
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if item already exists with same options
      const existingItemIndex = existingCart.findIndex((item: any) => 
        item.id === cartItem.id && 
        JSON.stringify(item.options) === JSON.stringify(cartItem.options)
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        existingCart.push(cartItem);
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(existingCart));

      // Dispatch cart update event to notify header
      window.dispatchEvent(new CustomEvent('cartUpdated'));

      toast({
        title: t({ ko: "장바구니에 추가됨", en: "Added to cart" }),
        description: t({ ko: `${mockProduct.nameKo}이(가) 장바구니에 추가되었습니다.`, en: `${mockProduct.nameKo} has been added to cart.` }),
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: t({ ko: "오류", en: "Error" }),
        description: t({ ko: "장바구니 추가 중 오류가 발생했습니다.", en: "An error occurred while adding to cart." }),
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? t({ ko: "찜 목록에서 제거됨", en: "Removed from favorites" }) : t({ ko: "찜 목록에 추가됨", en: "Added to favorites" }),
      description: isFavorite ? 
        t({ ko: `${mockProduct.nameKo}이(가) 찜 목록에서 제거되었습니다.`, en: `${mockProduct.nameKo} has been removed from favorites.` }) :
        t({ ko: `${mockProduct.nameKo}이(가) 찜 목록에 추가되었습니다.`, en: `${mockProduct.nameKo} has been added to favorites.` }),
    });
  };

  // Generate star rating
  const generateStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">홈</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/products" className="hover:text-gray-700">제품</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">{mockProduct.nameKo}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src={mockProduct.images[currentImageIndex]}
                alt={mockProduct.nameKo}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${mockProduct.nameKo} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {mockProduct.nameKo}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {generateStars(Math.round(mockProduct.rating))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {mockProduct.rating} ({mockProduct.reviewCount} 리뷰)
                  </span>
                </div>
                {mockProduct.isFeatured && (
                  <Badge className="bg-red-500 text-white">
                    인기상품
                  </Badge>
                )}
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {calculateTotalPrice().toLocaleString()} 원
              </div>
              <div className="text-sm text-gray-600">
                기본 가격부터 시작 (옵션에 따라 변동)
              </div>
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              {/* Size Selection */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  ✅ 스탠드 사이즈
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mockProduct.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedSize === size.name
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{size.name}</div>
                      <div className="text-sm text-gray-500">{size.description}</div>
                      <div className="text-sm font-medium text-blue-600">
                        {size.price.toLocaleString()}원
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Base Selection */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  ✅ 받침 선택
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {mockProduct.bases.map((base) => (
                    <button
                      key={base.name}
                      onClick={() => setSelectedBase(base.name)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        selectedBase === base.name
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{base.name}</div>
                      <div className="text-xs text-gray-500">{base.description}</div>
                      <div className="text-sm font-medium text-blue-600">
                        {base.price > 0 ? `+${base.price.toLocaleString()}원` : '무료'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  ✅ 수량 선택
                </Label>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 rounded-l-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 rounded-r-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">
                    <strong>수량별 할인 안내:</strong>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 space-y-1">
                    {mockProduct.quantityRanges.map((range) => (
                      <div key={range.range} className="flex justify-between">
                        <span>{range.range} ({range.condition})</span>
                        <span className="font-medium">
                          {range.multiplier === 1 ? '정가' : `${((1 - range.multiplier) * 100).toFixed(0)}% 할인`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Packaging Selection */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  ✅ 포장 방식
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {mockProduct.packaging.map((pkg) => (
                    <button
                      key={pkg.name}
                      onClick={() => setSelectedPackaging(pkg.name)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedPackaging === pkg.name
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{pkg.name}</div>
                      <div className="text-sm text-gray-500">{pkg.description}</div>
                      <div className="text-sm font-medium text-blue-600">
                        {pkg.price > 0 ? `+${pkg.price.toLocaleString()}원` : '무료'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload Section */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  ✅ 파일 업로드
                </Label>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="pdf">PDF 업로드</TabsTrigger>
                    <TabsTrigger value="design">도안 작업 의뢰</TabsTrigger>
                    <TabsTrigger value="editor">올댓에디터</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pdf" className="mt-4">
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                        isDragOver 
                          ? 'border-blue-400 bg-blue-50' 
                          : uploadedFile 
                            ? 'border-green-400 bg-green-50' 
                            : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="pdf-upload"
                      />
                      <label htmlFor="pdf-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        {uploadedFile ? (
                          <div>
                            <p className="text-green-600 font-medium mb-2">
                              ✅ {uploadedFile.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              파일이 업로드되었습니다. 다른 파일을 선택하려면 클릭하세요.
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-600 font-medium mb-2">
                              PDF 파일을 드래그하거나 클릭하여 업로드
                            </p>
                            <p className="text-sm text-gray-500">
                              최대 50MB, PDF 파일만 업로드 가능합니다.
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="design" className="mt-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Palette className="w-5 h-5 text-yellow-600 mr-2" />
                        <h3 className="font-medium text-yellow-800">도안 작업 의뢰</h3>
                      </div>
                      <p className="text-sm text-yellow-700 mb-3">
                        전문 디자이너가 고객님의 요청에 따라 도안을 제작해드립니다.
                      </p>
                      <Textarea
                        placeholder="원하는 디자인에 대해 자세히 설명해주세요..."
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        className="mb-3"
                        rows={4}
                      />
                      <div className="text-xs text-yellow-600">
                        * 도안 작업비: 별도 견적 (복잡도에 따라 5,000원~20,000원)
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="editor" className="mt-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Puzzle className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="font-medium text-blue-800">굿즈에디터</h3>
                      </div>
                      <p className="text-sm text-blue-700 mb-4">
                        브라우저에서 바로 디자인을 만들어보세요! 간단한 조작으로 전문적인 굿즈를 제작할 수 있습니다.
                      </p>
                      <Link href="/editor">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          <Puzzle className="w-4 h-4 mr-2" />
                          굿즈에디터 시작하기
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedBase}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {calculateTotalPrice().toLocaleString()}원 주문하기
              </Button>
              <Button
                variant="outline"
                onClick={handleToggleFavorite}
                className="p-3"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </Button>
              <Button variant="outline" className="p-3">
                <Share2 className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sample File Guide */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Download className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <h3 className="font-bold text-lg text-gray-900">샘플파일 안내</h3>
                <p className="text-sm text-gray-600">
                  올바른 파일 제작을 위한 템플릿과 가이드를 확인하세요
                </p>
              </div>
            </div>
            <Button variant="outline" className="bg-white">
              <Download className="w-4 h-4 mr-2" />
              다운로드
            </Button>
          </div>
        </div>

        {/* Product Details & Reviews */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">상품 상세</TabsTrigger>
              <TabsTrigger value="reviews">상품 후기 ({mockReviews.length})</TabsTrigger>
              <TabsTrigger value="qna">상품 문의</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <div className="space-y-8">
                {/* Product Detail Images */}
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-6">상품 상세 정보</h3>
                  <div className="space-y-6">
                    <img
                      src="/api/placeholder/800/600"
                      alt="상품 상세 이미지"
                      className="w-full rounded-lg"
                    />
                    <div className="prose max-w-none">
                      <h4 className="text-lg font-semibold mb-3">제품 특징</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• 고품질 아크릴 소재 사용으로 선명한 인쇄 품질</li>
                        <li>• 다양한 사이즈 옵션으로 원하는 크기 제작 가능</li>
                        <li>• 튼튼한 받침으로 안정적인 전시 효과</li>
                        <li>• 개인 맞춤형 디자인 제작 서비스</li>
                      </ul>
                      
                      <h4 className="text-lg font-semibold mb-3 mt-6">주의사항</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• 해상도 300dpi 이상의 고해상도 이미지를 사용해주세요</li>
                        <li>• 색상은 모니터 환경에 따라 실제와 다를 수 있습니다</li>
                        <li>• 제작 완료 후 교환/환불이 어려우니 신중히 주문해주세요</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">상품 후기</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {generateStars(Math.round(mockProduct.rating))}
                        </div>
                        <span className="text-lg font-semibold">{mockProduct.rating}</span>
                      </div>
                      <span className="text-gray-500">({mockProduct.reviewCount}개 리뷰)</span>
                    </div>
                  </div>
                  
                  {/* Reviews List */}
                  <div className="space-y-6">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0 space-y-3">
                        <div className="space-y-1 text-sm text-gray-800">
                          <div className="flex items-center gap-1 text-yellow-500 text-sm">
                            {generateStars(review.rating)}
                          </div>
                          <h4 className="font-medium">{review.title}</h4>
                          <p className="text-gray-700">{review.content}</p>
                          <div className="text-xs text-gray-500">
                            by {review.userName} ・ {review.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                        {review.images && review.images.length > 0 && (
                          <div className="flex gap-2">
                            {review.images.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`리뷰 이미지 ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="qna" className="mt-8">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6">상품 문의</h3>
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 mb-4">아직 문의가 없습니다.</p>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    문의하기
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Product Overview Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t({ ko: "상품목록 한눈에 보기", en: "Product Overview at a Glance", ja: "商品一覧一目で見る", zh: "产品列表一目了然" })}
            </h2>
            <p className="text-gray-600">
              {t({ ko: "다양한 맞춤형 굿즈를 확인하고 원하는 상품을 찾아보세요", en: "Explore various custom goods and find what you're looking for", ja: "様々なカスタムグッズを確認し、お探しの商品を見つけてください", zh: "查看各种定制商品，找到您想要的产品" })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Acrylic Keyrings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🧷</span>
                <h3 className="text-lg font-bold text-gray-900">
                  {t({ ko: "아크릴 키링", en: "Acrylic Keyrings", ja: "アクリルキーリング", zh: "亚克力钥匙扣" })}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { ko: "투명 키링", en: "Clear Keyring", category: "keyring", subcategory: "clear" },
                  { ko: "하프미러 키링", en: "Half Mirror Keyring", category: "keyring", subcategory: "halfmirror" },
                  { ko: "글리터 키링", en: "Glitter Keyring", category: "keyring", subcategory: "glitter" },
                  { ko: "유색/투명컬러/아스텔 키링", en: "Colored/Transparent/Pastel Keyring", category: "keyring", subcategory: "colored" },
                  { ko: "자개 키링", en: "Mother of Pearl Keyring", category: "keyring", subcategory: "pearl" },
                  { ko: "거울 키링", en: "Mirror Keyring", category: "keyring", subcategory: "mirror" },
                  { ko: "홀로그램 키링", en: "Hologram Keyring", category: "keyring", subcategory: "hologram" },
                  { ko: "하프미러5T 키링", en: "Half Mirror 5T Keyring", category: "keyring", subcategory: "halfmirror5t" },
                  { ko: "투명5T 키링", en: "Clear 5T Keyring", category: "keyring", subcategory: "clear5t" },
                  { ko: "뮤트컬러 키링", en: "Mute Color Keyring", category: "keyring", subcategory: "mute" },
                  { ko: "야광 키링", en: "Glow-in-the-Dark Keyring", category: "keyring", subcategory: "glow" },
                  { ko: "회전 스핀 돌려돌려 키링", en: "Rotating Spin Keyring", category: "keyring", subcategory: "spin" },
                  { ko: "랜티큘러 키링", en: "Lenticular Keyring", category: "keyring", subcategory: "lenticular" },
                  { ko: "파스텔 아스텔 4T 키링", en: "Pastel 4T Keyring", category: "keyring", subcategory: "pastel4t" }
                ].map((item, index) => (
                  <Link key={index} href={`/category/${item.category}?sub=${item.subcategory}`}>
                    <div className="text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors cursor-pointer">
                      • {language === 'ko' ? item.ko : item.en}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Corot */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🧷</span>
                <h3 className="text-lg font-bold text-gray-900">
                  {t({ ko: "코롯토", en: "Corot", ja: "コロット", zh: "科罗托" })}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { ko: "자립형 코롯토 (8T/9T)", en: "Self-standing Corot (8T/9T)", category: "korotto", subcategory: "selfstanding" },
                  { ko: "뒤도바 코롯토 (10T)", en: "Reverse Corot (10T)", category: "korotto", subcategory: "reverse" },
                  { ko: "아프로바 코롯토 (10T)", en: "Approve Corot (10T)", category: "korotto", subcategory: "approve" }
                ].map((item, index) => (
                  <Link key={index} href={`/category/${item.category}?sub=${item.subcategory}`}>
                    <div className="text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors cursor-pointer">
                      • {language === 'ko' ? item.ko : item.en}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Smart Tok */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📱</span>
                <h3 className="text-lg font-bold text-gray-900">
                  {t({ ko: "스마트톡", en: "Smart Tok", ja: "スマートトーク", zh: "智能支架" })}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { ko: "투명 스마트톡", en: "Clear Smart Tok", category: "smarttok", subcategory: "clear" },
                  { ko: "거울 스마트톡", en: "Mirror Smart Tok", category: "smarttok", subcategory: "mirror" },
                  { ko: "홀로그램 스마트톡", en: "Hologram Smart Tok", category: "smarttok", subcategory: "hologram" },
                  { ko: "하프미러5T 스마트톡", en: "Half Mirror 5T Smart Tok", category: "smarttok", subcategory: "halfmirror5t" },
                  { ko: "뮤트컬러 스마트톡", en: "Mute Color Smart Tok", category: "smarttok", subcategory: "mute" },
                  { ko: "야광 스마트톡", en: "Glow-in-the-Dark Smart Tok", category: "smarttok", subcategory: "glow" },
                  { ko: "회전 스마트톡", en: "Rotating Smart Tok", category: "smarttok", subcategory: "rotating" }
                ].map((item, index) => (
                  <Link key={index} href={`/category/${item.category}?sub=${item.subcategory}`}>
                    <div className="text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors cursor-pointer">
                      • {language === 'ko' ? item.ko : item.en}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Stands */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎯</span>
                <h3 className="text-lg font-bold text-gray-900">
                  {t({ ko: "스탠드", en: "Stands", ja: "スタンド", zh: "支架" })}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { ko: "일반 스탠드 (35×50)", en: "Regular Stand (35×50)", category: "stand", subcategory: "regular" },
                  { ko: "라미 스탠드 (70×140)", en: "Lami Stand (70×140)", category: "stand", subcategory: "lami" },
                  { ko: "대형 스탠드 (100×200)", en: "Large Stand (100×200)", category: "stand", subcategory: "large" },
                  { ko: "투명 스탠드", en: "Clear Stand", category: "stand", subcategory: "clear" },
                  { ko: "컬러 스탠드", en: "Color Stand", category: "stand", subcategory: "color" }
                ].map((item, index) => (
                  <Link key={index} href={`/category/${item.category}?sub=${item.subcategory}`}>
                    <div className="text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors cursor-pointer">
                      • {language === 'ko' ? item.ko : item.en}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Holders */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🖼️</span>
                <h3 className="text-lg font-bold text-gray-900">
                  {t({ ko: "홀더", en: "Holders", ja: "ホルダー", zh: "支架" })}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { ko: "포카홀더", en: "Photo Card Holder", category: "holder", subcategory: "photocard" },
                  { ko: "카드홀더", en: "Card Holder", category: "holder", subcategory: "card" },
                  { ko: "명함홀더", en: "Business Card Holder", category: "holder", subcategory: "business" },
                  { ko: "메모홀더", en: "Memo Holder", category: "holder", subcategory: "memo" }
                ].map((item, index) => (
                  <Link key={index} href={`/category/${item.category}?sub=${item.subcategory}`}>
                    <div className="text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors cursor-pointer">
                      • {language === 'ko' ? item.ko : item.en}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Miscellaneous */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎨</span>
                <h3 className="text-lg font-bold text-gray-900">
                  {t({ ko: "기타 굿즈", en: "Other Goods", ja: "その他グッズ", zh: "其他商品" })}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { ko: "셰이커", en: "Shaker", category: "shaker", subcategory: "all" },
                  { ko: "카라비너", en: "Carabiner", category: "carabiner", subcategory: "all" },
                  { ko: "거울", en: "Mirror", category: "mirror", subcategory: "all" },
                  { ko: "자석", en: "Magnet", category: "magnet", subcategory: "all" },
                  { ko: "문구류", en: "Stationery", category: "stationery", subcategory: "all" },
                  { ko: "컷팅스티커", en: "Cutting Sticker", category: "cutting", subcategory: "all" }
                ].map((item, index) => (
                  <Link key={index} href={`/category/${item.category}?sub=${item.subcategory}`}>
                    <div className="text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors cursor-pointer">
                      • {language === 'ko' ? item.ko : item.en}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/categories">
              <Button variant="outline" size="lg" className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
                <Eye className="w-4 h-4 mr-2" />
                {t({ ko: "전체 카테고리 보기", en: "View All Categories", ja: "全カテゴリを見る", zh: "查看所有分类" })}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Fixed Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-4 z-50">
        {/* Inquiry Button */}
        <div className="relative">
          <Button
            variant="outline"
            size="lg"
            className="bg-white hover:bg-gray-50 text-gray-700 shadow-lg border border-gray-200 rounded-full px-4 sm:px-6 py-3 flex items-center space-x-2 transition-all hover:shadow-xl"
          >
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            <div className="text-left">
              <div className="font-medium text-xs sm:text-sm">문의하기</div>
              <div className="text-xs text-gray-500 hidden sm:block">
                평일 9시~6시
              </div>
            </div>
          </Button>
          
          {/* Speech bubble */}
          <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            평일 9시~6시 (점심 12~1시)
            <div className="absolute top-full right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
          </div>
        </div>

        {/* Editor Button */}
        <Link href="/editor">
          <Button
            size="lg"
            className="bg-black hover:bg-gray-800 text-white shadow-lg rounded-full px-4 sm:px-6 py-3 flex items-center space-x-2 transition-all hover:shadow-xl"
          >
            <Puzzle className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-xs sm:text-sm">
              🧩 굿즈에디터
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}