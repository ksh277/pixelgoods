import { useState } from "react";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  productId: number;
  name: string;
  nameKo: string;
  price: number;
  quantity: number;
  imageUrl: string;
  customization?: {
    size?: string;
    color?: string;
    text?: string;
  };
}

export default function Cart() {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      productId: 1,
      name: "Acrylic Keychain",
      nameKo: "아크릴 키링",
      price: 8900,
      quantity: 2,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      customization: {
        size: "Medium",
        color: "Clear",
        text: "My Custom Text"
      }
    },
    {
      id: 2,
      productId: 2,
      name: "Custom Phone Case",
      nameKo: "커스텀 폰케이스",
      price: 15900,
      quantity: 1,
      imageUrl: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400",
      customization: {
        size: "iPhone 14",
        color: "Clear"
      }
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "상품이 삭제되었습니다",
      description: "장바구니에서 상품이 제거되었습니다.",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 30000 ? 0 : 3000;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            장바구니가 비어있습니다
          </h2>
          <p className="text-muted-foreground mb-6">
            마음에 드는 상품을 장바구니에 담아보세요
          </p>
          <Link href="/products">
            <Button className="btn-primary">
              쇼핑 계속하기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            장바구니
          </h1>
          <p className="text-lg text-muted-foreground">
            주문하실 상품들을 확인하고 결제를 진행하세요
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>주문 상품 ({cartItems.length}개)</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCartItems([])}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    전체 삭제
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.imageUrl}
                      alt={item.nameKo}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {item.nameKo}
                      </h3>
                      
                      {item.customization && (
                        <div className="flex gap-2 mt-2">
                          {item.customization.size && (
                            <Badge variant="outline">{item.customization.size}</Badge>
                          )}
                          {item.customization.color && (
                            <Badge variant="outline">{item.customization.color}</Badge>
                          )}
                          {item.customization.text && (
                            <Badge variant="outline">"{item.customization.text}"</Badge>
                          )}
                        </div>
                      )}
                      
                      <p className="text-lg font-bold text-foreground mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min="1"
                      />
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive mt-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <Card>
              <CardHeader>
                <CardTitle>주문 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>상품 금액</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>배송비</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">무료</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                
                {shipping > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(30000 - subtotal)} 더 주문하시면 배송비가 무료입니다!
                  </p>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>총 결제 금액</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
                
                <Button className="w-full btn-primary" size="lg">
                  <span>주문하기</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="text-center">
                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      쇼핑 계속하기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Methods */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">결제 수단</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-yellow-400 rounded text-xs flex items-center justify-center text-black font-bold">
                      K
                    </div>
                    <span className="text-sm">카카오페이</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-green-500 rounded text-xs flex items-center justify-center text-white font-bold">
                      N
                    </div>
                    <span className="text-sm">네이버페이</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-gray-600 rounded text-xs flex items-center justify-center text-white">
                      💳
                    </div>
                    <span className="text-sm">신용카드</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
