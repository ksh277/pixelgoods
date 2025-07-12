import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, MapPin, CreditCard, Home, User, Calendar, Clock } from "lucide-react";

interface OrderData {
  id: string;
  items: any[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    addressDetail: string;
    zipCode: string;
    paymentMethod: string;
  };
  total: number;
  orderDate: string;
  status: string;
}

export default function OrderComplete() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Load order data from localStorage
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      try {
        const parsedOrder = JSON.parse(lastOrder);
        setOrderData(parsedOrder);
      } catch (error) {
        console.error('Error loading order data:', error);
      }
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'card':
        return t({ ko: "신용카드", en: "Credit Card" });
      case 'kakao':
        return t({ ko: "카카오페이", en: "KakaoPay" });
      case 'naver':
        return t({ ko: "네이버페이", en: "NaverPay" });
      default:
        return method;
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t({ ko: "주문 정보를 찾을 수 없습니다", en: "Order information not found" })}
            </h2>
            <Link href="/">
              <Button className="px-8 py-3">
                {t({ ko: "홈으로 이동", en: "Go to Home" })}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t({ ko: "주문이 완료되었습니다!", en: "Order Complete!" })}
          </h1>
          <p className="text-gray-600 text-lg">
            {t({ ko: "주문해주셔서 감사합니다", en: "Thank you for your order" })}
          </p>
        </div>

        <div className="space-y-6">
          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                {t({ ko: "주문 정보", en: "Order Information" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">
                        {t({ ko: "주문번호", en: "Order Number" })}
                      </p>
                      <p className="font-semibold">#{orderData.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">
                        {t({ ko: "주문일시", en: "Order Date" })}
                      </p>
                      <p className="font-semibold">{formatDate(orderData.orderDate)}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">
                        {t({ ko: "결제 방법", en: "Payment Method" })}
                      </p>
                      <p className="font-semibold">{getPaymentMethodName(orderData.customer.paymentMethod)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {t({ ko: "결제 상태", en: "Payment Status" })}
                      </p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {t({ ko: "결제완료", en: "Paid" })}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t({ ko: "주문 상품", en: "Order Items" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.nameKo}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.nameKo}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {Object.entries(item.options).map(([key, value]) => (
                          <Badge key={key} variant="secondary" className="text-xs">
                            {value}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        ₩{item.price.toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₩{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  {t({ ko: "총 결제 금액", en: "Total Amount" })}
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  ₩{orderData.total.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {t({ ko: "배송 정보", en: "Delivery Information" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t({ ko: "받는 분", en: "Recipient" })}
                  </p>
                  <p className="font-semibold">{orderData.customer.name}</p>
                  <p className="text-gray-600">{orderData.customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t({ ko: "배송 주소", en: "Delivery Address" })}
                  </p>
                  <p className="font-semibold">
                    ({orderData.customer.zipCode}) {orderData.customer.address}
                  </p>
                  {orderData.customer.addressDetail && (
                    <p className="text-gray-600">{orderData.customer.addressDetail}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t({ ko: "다음 단계", en: "Next Steps" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {t({ ko: "주문 확인", en: "Order Confirmation" })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t({ ko: "이메일로 주문 확인서가 발송됩니다", en: "Order confirmation will be sent to your email" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-400">2</span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {t({ ko: "제작 시작", en: "Production Start" })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t({ ko: "1-2일 내에 제작이 시작됩니다", en: "Production will begin within 1-2 days" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-400">3</span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {t({ ko: "배송 완료", en: "Delivery Complete" })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t({ ko: "3-5일 내에 배송이 완료됩니다", en: "Delivery will be completed within 3-5 days" })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                {t({ ko: "메인으로", en: "Go to Main" })}
              </Button>
            </Link>
            <Link href="/mypage">
              <Button className="w-full sm:w-auto">
                <User className="w-4 h-4 mr-2" />
                {t({ ko: "마이페이지로", en: "Go to My Page" })}
              </Button>
            </Link>
          </div>

          {/* Customer Service */}
          <Card className="bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-blue-900 mb-2">
                  {t({ ko: "문의사항이 있으신가요?", en: "Have any questions?" })}
                </h3>
                <p className="text-blue-800 text-sm mb-4">
                  {t({ 
                    ko: "주문 관련 문의는 고객센터로 연락해주세요", 
                    en: "Please contact customer service for order-related inquiries" 
                  })}
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-600">📞</span>
                    <span className="text-blue-800">1588-1234</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-600">⏰</span>
                    <span className="text-blue-800">
                      {t({ ko: "평일 09:00-18:00", en: "Weekdays 09:00-18:00" })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}