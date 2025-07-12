import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, Home, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface OrderData {
  id: number;
  items: Array<{
    id: number;
    name: string;
    nameKo: string;
    price: number;
    quantity: number;
    image: string;
    options?: string;
  }>;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    detailAddress: string;
    postalCode: string;
    memo: string;
  };
  amounts: {
    subtotal: number;
    shipping: number;
    total: number;
  };
  date: string;
  status: string;
}

export default function OrderComplete() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem('lastOrder');
      if (savedOrder) {
        setOrderData(JSON.parse(savedOrder));
      }
    } catch (error) {
      console.error('Failed to load order data:', error);
    }
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t({ ko: "주문 정보를 찾을 수 없습니다", en: "Order information not found" })}
            </h2>
            <p className="text-gray-600 mb-6">
              {t({ ko: "주문 내역을 확인해주세요", en: "Please check your order history" })}
            </p>
            <Button onClick={() => setLocation('/')}>
              {t({ ko: "홈으로 돌아가기", en: "Back to Home" })}
            </Button>
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t({ ko: "주문이 완료되었습니다", en: "Order Completed Successfully" })} 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {t({ ko: "주문번호", en: "Order Number" })}: #{orderData.id}
          </p>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {t({ ko: "주문 확인됨", en: "Order Confirmed" })}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  {t({ ko: "주문 상품", en: "Order Items" })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
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
                    <span>₩{orderData.amounts.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t({ ko: "배송비", en: "Shipping" })}</span>
                    <span>
                      {orderData.amounts.shipping === 0 ? (
                        <span className="text-green-600">{t({ ko: "무료", en: "Free" })}</span>
                      ) : (
                        `₩${orderData.amounts.shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t({ ko: "총 결제 금액", en: "Total" })}</span>
                    <span>₩{orderData.amounts.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer & Shipping Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="h-5 w-5 mr-2" />
                  {t({ ko: "배송 정보", en: "Shipping Information" })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Package className="h-4 w-4 mr-2" />
                    {t({ ko: "받는 분", en: "Recipient" })}
                  </div>
                  <p className="font-medium">{orderData.customer.name}</p>
                </div>

                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Phone className="h-4 w-4 mr-2" />
                    {t({ ko: "연락처", en: "Phone" })}
                  </div>
                  <p className="font-medium">{orderData.customer.phone}</p>
                </div>

                {orderData.customer.email && (
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Mail className="h-4 w-4 mr-2" />
                      {t({ ko: "이메일", en: "Email" })}
                    </div>
                    <p className="font-medium">{orderData.customer.email}</p>
                  </div>
                )}

                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Home className="h-4 w-4 mr-2" />
                    {t({ ko: "배송 주소", en: "Shipping Address" })}
                  </div>
                  <p className="font-medium">
                    {orderData.customer.postalCode && `(${orderData.customer.postalCode}) `}
                    {orderData.customer.address}
                    {orderData.customer.detailAddress && ` ${orderData.customer.detailAddress}`}
                  </p>
                </div>

                {orderData.customer.memo && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      {t({ ko: "배송 메모", en: "Delivery Memo" })}
                    </div>
                    <p className="font-medium text-sm bg-gray-50 p-2 rounded">
                      {orderData.customer.memo}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {t({ ko: "다음 단계", en: "Next Steps" })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {t({ ko: "주문 확인", en: "Order Confirmation" })}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t({ ko: "주문이 확인되었습니다", en: "Your order has been confirmed" })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {t({ ko: "제작 시작", en: "Production Started" })}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t({ ko: "1-2일 내에 제작을 시작합니다", en: "Production will begin within 1-2 days" })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {t({ ko: "배송 준비", en: "Shipping Preparation" })}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t({ ko: "제작 완료 후 배송 준비를 시작합니다", en: "Shipping preparation begins after production" })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {t({ ko: "배송 완료", en: "Delivery Complete" })}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t({ ko: "3-5일 내에 배송됩니다", en: "Delivery within 3-5 days" })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            onClick={() => setLocation('/')}
            variant="outline"
            className="flex-1"
          >
            {t({ ko: "홈으로 돌아가기", en: "Back to Home" })}
          </Button>
          <Button
            onClick={() => setLocation('/products')}
            className="flex-1"
          >
            {t({ ko: "계속 쇼핑하기", en: "Continue Shopping" })}
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">
            {t({ ko: "궁금한 점이 있으신가요?", en: "Have any questions?" })}
          </h3>
          <p className="text-sm text-gray-600">
            {t({ 
              ko: "주문 관련 문의사항이 있으시면 언제든지 고객센터로 연락해주세요.", 
              en: "Feel free to contact our customer service for any order-related inquiries." 
            })}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation('/inquiry')}
            >
              {t({ ko: "문의하기", en: "Contact Us" })}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('tel:1588-0000')}
            >
              {t({ ko: "전화 문의: 1588-0000", en: "Call: 1588-0000" })}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}