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
  Palette, 
  Upload,
  Download,
  RotateCcw
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
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { Product, ProductReview } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [customText, setCustomText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["/api/products", id],
    queryFn: () => api.getProduct(parseInt(id!)),
    enabled: !!id,
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["/api/products", id, "reviews"],
    queryFn: () => api.getProductReviews(parseInt(id!)),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    toast({
      title: "장바구니에 추가됨",
      description: `${product?.nameKo}이(가) 장바구니에 추가되었습니다.`,
    });
  };

  const handleToggleFavorite = () => {
    toast({
      title: "찜 목록에 추가됨",
      description: `${product?.nameKo}이(가) 찜 목록에 추가되었습니다.`,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatPrice = (price: string) => {
    return `₩${parseInt(price).toLocaleString()}`;
  };

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

  const averageRating = reviews?.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (productLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            제품을 찾을 수 없습니다
          </h2>
          <Link href="/products">
            <Button className="btn-primary">
              제품 목록으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.nameKo}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={`${product.nameKo} ${i + 1}`}
                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.nameKo}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {product.descriptionKo}
              </p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {generateStars(Math.round(averageRating))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({reviews?.length || 0} 리뷰)
                  </span>
                </div>
                {product.isFeatured && (
                  <Badge className="bg-accent text-accent-foreground">
                    인기 상품
                  </Badge>
                )}
              </div>
              
              <div className="text-3xl font-bold text-foreground mb-6">
                {formatPrice(product.basePrice)}
              </div>
            </div>

            {/* Customization Options */}
            {product.customizationOptions && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    커스터마이징 옵션
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(product.customizationOptions as any).sizes && (
                    <div>
                      <Label>사이즈</Label>
                      <Select onValueChange={(value) => setSelectedOptions(prev => ({ ...prev, size: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="사이즈를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {(product.customizationOptions as any).sizes.map((size: string) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {(product.customizationOptions as any).colors && (
                    <div>
                      <Label>색상</Label>
                      <Select onValueChange={(value) => setSelectedOptions(prev => ({ ...prev, color: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="색상을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {(product.customizationOptions as any).colors.map((color: string) => (
                            <SelectItem key={color} value={color}>
                              {color}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div>
                    <Label>커스텀 텍스트</Label>
                    <Input
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="원하는 텍스트를 입력하세요"
                    />
                  </div>
                  
                  <div>
                    <Label>이미지 업로드</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        {uploadedImage ? (
                          <img
                            src={uploadedImage}
                            alt="업로드된 이미지"
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              이미지를 업로드하세요
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label>수량</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  className="flex-1 btn-primary"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  장바구니 담기
                </Button>
                <Button
                  variant="outline"
                  onClick={handleToggleFavorite}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">상품 설명</TabsTrigger>
              <TabsTrigger value="reviews">리뷰 ({reviews?.length || 0})</TabsTrigger>
              <TabsTrigger value="qna">Q&A</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-4">제품 상세 정보</h3>
                    <p className="text-muted-foreground mb-4">
                      {product.descriptionKo}
                    </p>
                    
                    <h4 className="font-semibold mb-2">제품 특징</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>고품질 소재 사용</li>
                      <li>개인 맞춤형 디자인 가능</li>
                      <li>친환경 프린팅 방식</li>
                      <li>내구성이 뛰어남</li>
                    </ul>
                    
                    <h4 className="font-semibold mb-2 mt-4">제작 시간</h4>
                    <p className="text-muted-foreground">
                      주문 후 2-3일 내 제작 완료 (주말 및 공휴일 제외)
                    </p>
                    
                    <h4 className="font-semibold mb-2 mt-4">배송 정보</h4>
                    <p className="text-muted-foreground">
                      전국 배송 가능, 3만원 이상 주문 시 무료 배송
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Review Stats */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground mb-2">
                          {averageRating.toFixed(1)}
                        </div>
                        <div className="flex justify-center mb-2">
                          {generateStars(Math.round(averageRating))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {reviews?.length || 0}개 리뷰
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = reviews?.filter(r => r.rating === rating).length || 0;
                          const percentage = reviews?.length ? (count / reviews.length) * 100 : 0;
                          
                          return (
                            <div key={rating} className="flex items-center gap-2 mb-1">
                              <span className="text-sm w-3">{rating}</span>
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-400 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-8">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviewsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                          <CardContent className="p-6">
                            <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                            <div className="h-16 bg-muted rounded"></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : reviews?.length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">
                          아직 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요!
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    reviews?.map((review: ProductReview) => (
                      <Card key={review.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {generateStars(review.rating)}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                              </span>
                            </div>
                          </div>
                          <p className="text-foreground">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                {/* Write Review */}
                <Card>
                  <CardHeader>
                    <CardTitle>리뷰 작성하기</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>평점</Label>
                      <div className="flex items-center gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                            className="p-1"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                rating <= newReview.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label>리뷰 내용</Label>
                      <Textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                        placeholder="제품에 대한 후기를 작성해주세요"
                        rows={4}
                      />
                    </div>
                    
                    <Button className="btn-primary">
                      리뷰 등록하기
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="qna" className="mt-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">
                    궁금한 점이 있으시면 언제든지 문의해주세요!
                  </p>
                  <Button className="btn-primary">
                    문의하기
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
