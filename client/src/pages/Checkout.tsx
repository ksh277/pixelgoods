import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, MapPin, User, Phone, Mail, ShoppingBag } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  nameKo: string;
  price: number;
  quantity: number;
  image: string;
  options: {
    size?: string;
    color?: string;
    [key: string]: any;
  };
}

interface OrderForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  addressDetail: string;
  zipCode: string;
  requests: string;
  paymentMethod: string;
}

export default function Checkout() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OrderForm>({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    addressDetail: "",
    zipCode: "",
    requests: "",
    paymentMethod: "card"
  });

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  const handleInputChange = (field: keyof OrderForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order data
    const orderData = {
      id: Date.now().toString(),
      items: cartItems,
      customer: formData,
      total: total,
      orderDate: new Date().toISOString(),
      status: "confirmed"
    };

    // Save order to localStorage
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Clear cart
    localStorage.removeItem('cart');

    // Redirect to order complete page
    setLocation('/order-complete');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t({ ko: "주문할 상품이 없습니다", en: "No items to checkout" })}
            </h2>
            <p className="text-gray-600 mb-8">
              {t({ ko: "장바구니에 상품을 담고 주문해주세요", en: "Please add items to your cart first" })}
            </p>
            <Button onClick={() => setLocation('/cart')} className="px-8 py-3">
              {t({ ko: "장바구니로 가기", en: "Go to Cart" })}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t({ ko: "주문서 작성", en: "Checkout" })}
          </h1>
          <p className="text-gray-600 mt-2">
            {t({ ko: "배송 정보와 결제 방법을 입력해주세요", en: "Please enter your shipping information and payment method" })}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {t({ ko: "주문자 정보", en: "Customer Information" })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      {t({ ko: "이름", en: "Name" })} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      placeholder={t({ ko: "이름을 입력하세요", en: "Enter your name" })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      {t({ ko: "이메일", en: "Email" })} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      placeholder={t({ ko: "이메일을 입력하세요", en: "Enter your email" })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">
                    {t({ ko: "전화번호", en: "Phone Number" })} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    placeholder={t({ ko: "010-1234-5678", en: "010-1234-5678" })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {t({ ko: "배송지 정보", en: "Shipping Address" })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="zipCode">
                      {t({ ko: "우편번호", en: "Zip Code" })} <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        required
                        placeholder={t({ ko: "12345", en: "12345" })}
                      />
                      <Button type="button" variant="outline">
                        {t({ ko: "검색", en: "Search" })}
                      </Button>
                    </div>
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
                    required
                    placeholder={t({ ko: "주소를 입력하세요", en: "Enter your address" })}
                  />
                </div>
                <div>
                  <Label htmlFor="addressDetail">
                    {t({ ko: "상세주소", en: "Detailed Address" })}
                  </Label>
                  <Input
                    id="addressDetail"
                    value={formData.addressDetail}
                    onChange={(e) => handleInputChange('addressDetail', e.target.value)}
                    placeholder={t({ ko: "상세주소를 입력하세요", en: "Enter detailed address" })}
                  />
                </div>
                <div>
                  <Label htmlFor="requests">
                    {t({ ko: "배송 요청사항", en: "Delivery Requests" })}
                  </Label>
                  <Textarea
                    id="requests"
                    value={formData.requests}
                    onChange={(e) => handleInputChange('requests', e.target.value)}
                    placeholder={t({ ko: "배송 시 요청사항을 입력하세요", en: "Enter delivery requests" })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  {t({ ko: "결제 방법", en: "Payment Method" })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <CreditCard className="h-4 w-4 mr-2" />
                      {t({ ko: "신용카드", en: "Credit Card" })}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kakao" id="kakao" />
                    <Label htmlFor="kakao" className="flex items-center cursor-pointer">
                      <div className="w-4 h-4 bg-yellow-400 rounded mr-2 flex items-center justify-center text-xs font-bold text-black">
                        K
                      </div>
                      {t({ ko: "카카오페이", en: "KakaoPay" })}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="naver" id="naver" />
                    <Label htmlFor="naver" className="flex items-center cursor-pointer">
                      <div className="w-4 h-4 bg-green-500 rounded mr-2 flex items-center justify-center text-xs font-bold text-white">
                        N
                      </div>
                      {t({ ko: "네이버페이", en: "NaverPay" })}
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>
                  {t({ ko: "주문 요약", en: "Order Summary" })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.nameKo}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.nameKo}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {Object.entries(item.options).map(([key, value]) => (
                            <Badge key={key} variant="secondary" className="text-xs">
                              {value}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-gray-600">
                          ₩{item.price.toLocaleString()} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">
                          ₩{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t({ ko: "상품 금액", en: "Subtotal" })}
                    </span>
                    <span className="font-semibold">₩{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t({ ko: "배송비", en: "Shipping" })}
                    </span>
                    <span className="font-semibold">
                      {shippingFee === 0 ? (
                        <span className="text-green-600">
                          {t({ ko: "무료", en: "Free" })}
                        </span>
                      ) : (
                        `₩${shippingFee.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t({ ko: "총 결제 금액", en: "Total" })}</span>
                    <span className="text-blue-600">₩{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-3 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t({ ko: "주문 처리 중...", en: "Processing Order..." })}
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      {t({ ko: "주문 완료", en: "Complete Order" })}
                    </>
                  )}
                </Button>

                {/* Security Notice */}
                <div className="text-xs text-gray-500 text-center">
                  {t({ 
                    ko: "주문 정보는 안전하게 암호화되어 전송됩니다", 
                    en: "Your order information is securely encrypted" 
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}