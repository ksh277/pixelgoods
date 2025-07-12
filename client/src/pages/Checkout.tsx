import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ShoppingCart, CreditCard, User, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface CartItem {
  id: number;
  name: string;
  nameKo: string;
  price: number;
  quantity: number;
  image: string;
  options?: string;
}

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  detailAddress: string;
  postalCode: string;
  memo: string;
}

export default function Checkout() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Get cart items from localStorage or state management
  const [cartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    detailAddress: '',
    postalCode: '',
    memo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + shipping;

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.address) {
      alert('필수 항목을 모두 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save order data to localStorage
    const orderData = {
      id: Date.now(),
      items: cartItems,
      customer: formData,
      amounts: { subtotal, shipping, total },
      date: new Date().toISOString(),
      status: 'confirmed'
    };

    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    localStorage.removeItem('cart'); // Clear cart after successful order

    setIsSubmitting(false);
    setLocation('/order-complete');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t({ ko: "장바구니가 비어있습니다", en: "Your cart is empty" })}
            </h2>
            <p className="text-gray-600 mb-6">
              {t({ ko: "상품을 추가해주세요", en: "Please add some products" })}
            </p>
            <Button onClick={() => setLocation('/products')}>
              {t({ ko: "쇼핑 계속하기", en: "Continue Shopping" })}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/cart')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t({ ko: "장바구니로 돌아가기", en: "Back to Cart" })}
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            {t({ ko: "주문서 작성", en: "Checkout" })}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {t({ ko: "주문자 정보", en: "Customer Information" })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      {t({ ko: "이름", en: "Name" })} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={t({ ko: "이름을 입력해주세요", en: "Enter your name" })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      {t({ ko: "이메일", en: "Email" })}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={t({ ko: "이메일을 입력해주세요", en: "Enter your email" })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">
                    {t({ ko: "연락처", en: "Phone" })} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder={t({ ko: "연락처를 입력해주세요", en: "Enter your phone number" })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {t({ ko: "배송 정보", en: "Shipping Information" })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="postalCode">
                    {t({ ko: "우편번호", en: "Postal Code" })}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder={t({ ko: "우편번호", en: "Postal Code" })}
                      className="flex-1"
                    />
                    <Button variant="outline" type="button">
                      {t({ ko: "주소 찾기", en: "Find Address" })}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">
                    {t({ ko: "주소", en: "Address" })} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder={t({ ko: "주소를 입력해주세요", en: "Enter your address" })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="detailAddress">
                    {t({ ko: "상세 주소", en: "Detail Address" })}
                  </Label>
                  <Input
                    id="detailAddress"
                    value={formData.detailAddress}
                    onChange={(e) => handleInputChange('detailAddress', e.target.value)}
                    placeholder={t({ ko: "상세 주소를 입력해주세요", en: "Enter detail address" })}
                  />
                </div>
                <div>
                  <Label htmlFor="memo">
                    {t({ ko: "배송 메모", en: "Delivery Memo" })}
                  </Label>
                  <Input
                    id="memo"
                    value={formData.memo}
                    onChange={(e) => handleInputChange('memo', e.target.value)}
                    placeholder={t({ ko: "배송 시 요청사항을 입력해주세요", en: "Enter delivery instructions" })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  {t({ ko: "주문 요약", en: "Order Summary" })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.nameKo}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.nameKo}</h3>
                        {item.options && (
                          <p className="text-sm text-gray-600">{item.options}</p>
                        )}
                        <p className="text-sm text-gray-600">
                          {t({ ko: "수량", en: "Qty" })}: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ₩{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t({ ko: "상품 금액", en: "Subtotal" })}</span>
                    <span>₩{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t({ ko: "배송비", en: "Shipping" })}</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">{t({ ko: "무료", en: "Free" })}</span>
                      ) : (
                        `₩${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t({ ko: "총 결제 금액", en: "Total" })}</span>
                    <span>₩{total.toLocaleString()}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? t({ ko: "처리 중...", en: "Processing..." })
                      : t({ ko: "주문 완료하기", en: "Complete Order" })
                    }
                  </Button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  {t({ 
                    ko: "주문 완료 시 개인정보 수집 및 이용에 동의하는 것으로 간주됩니다.", 
                    en: "By completing your order, you agree to our privacy policy and terms of service." 
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}