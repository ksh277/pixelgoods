import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Gift, Star, Trophy, Clock, Users, ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "wouter";
import { BelugaMascot } from "@/components/BelugaMascot";

export default function Events() {
  const { language, t } = useLanguage();

  const ongoingEvents = [
    {
      id: 1,
      title: { ko: "신규 회원 가입 이벤트", en: "New Member Registration Event" },
      description: { ko: "회원 가입 시 3,000원 할인 쿠폰 + 무료 배송권 제공", en: "3,000 KRW discount coupon + free shipping for new members" },
      endDate: "2024-12-31",
      image: "/api/placeholder/400/200",
      badge: { ko: "진행중", en: "Ongoing" },
      badgeColor: "bg-green-500",
      participants: 1243
    },
    {
      id: 2,
      title: { ko: "크리스마스 특별 할인", en: "Christmas Special Discount" },
      description: { ko: "전 상품 20% 할인 + 특별 패키지 증정", en: "20% off all products + special package gift" },
      endDate: "2024-12-25",
      image: "/api/placeholder/400/200",
      badge: { ko: "HOT", en: "HOT" },
      badgeColor: "bg-red-500",
      participants: 2156
    },
    {
      id: 3,
      title: { ko: "리뷰 작성 이벤트", en: "Review Writing Event" },
      description: { ko: "후기 작성 시 포인트 적립 + 베스트 리뷰 선정 시 10,000원 상품권", en: "Points for reviews + 10,000 KRW gift card for best reviews" },
      endDate: "2024-12-20",
      image: "/api/placeholder/400/200",
      badge: { ko: "이벤트", en: "Event" },
      badgeColor: "bg-blue-500",
      participants: 856
    }
  ];

  const upcomingEvents = [
    {
      id: 4,
      title: { ko: "신년 맞이 특가 이벤트", en: "New Year Special Event" },
      description: { ko: "2025년 새해를 맞이하여 특가 혜택 대방출", en: "Special benefits for New Year 2025" },
      startDate: "2025-01-01",
      image: "/api/placeholder/400/200",
      badge: { ko: "예정", en: "Upcoming" },
      badgeColor: "bg-gray-500"
    },
    {
      id: 5,
      title: { ko: "발렌타인 데이 커플 이벤트", en: "Valentine's Day Couple Event" },
      description: { ko: "커플 굿즈 제작 시 특별 할인 혜택", en: "Special discount for couple goods" },
      startDate: "2025-02-01",
      image: "/api/placeholder/400/200",
      badge: { ko: "예정", en: "Upcoming" },
      badgeColor: "bg-gray-500"
    }
  ];

  const completedEvents = [
    {
      id: 6,
      title: { ko: "추석 연휴 특별 이벤트", en: "Chuseok Holiday Special Event" },
      description: { ko: "추석 기념 전통 디자인 템플릿 무료 제공", en: "Free traditional design templates for Chuseok" },
      completedDate: "2024-09-30",
      participants: 3421,
      winners: 50
    },
    {
      id: 7,
      title: { ko: "여름 휴가 포토 콘테스트", en: "Summer Vacation Photo Contest" },
      description: { ko: "여름 휴가 사진으로 제작한 굿즈 콘테스트", en: "Contest for goods made with summer vacation photos" },
      completedDate: "2024-08-31",
      participants: 2134,
      winners: 20
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
            <span className="text-gray-900 font-medium">이벤트</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t({ ko: "이벤트", en: "Events" })}
              </h1>
              <p className="text-gray-600">
                {t({ 
                  ko: "다양한 혜택과 재미있는 이벤트에 참여하세요", 
                  en: "Join various benefits and exciting events" 
                })}
              </p>
            </div>
            <div className="hidden md:block">
              <BelugaMascot variant="event" />
            </div>
          </div>
        </div>

        {/* Ongoing Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Gift className="w-6 h-6 mr-2 text-red-500" />
            {t({ ko: "진행중인 이벤트", en: "Ongoing Events" })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingEvents.map((event) => (
              <Card key={event.id} className="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={t(event.title)}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`${event.badgeColor} text-white px-3 py-1 text-sm`}>
                      {t(event.badge)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {event.endDate}까지
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {t(event.title)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {t(event.description)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {event.participants.toLocaleString()}명 참여
                    </div>
                    <Button size="sm">
                      {t({ ko: "참여하기", en: "Join" })}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-500" />
            {t({ ko: "예정된 이벤트", en: "Upcoming Events" })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={t(event.title)}
                    className="w-full h-48 object-cover opacity-75"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`${event.badgeColor} text-white px-3 py-1 text-sm`}>
                      {t(event.badge)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {event.startDate}부터
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {t(event.title)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {t(event.description)}
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    {t({ ko: "알림 설정", en: "Set Notification" })}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Events */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
            {t({ ko: "종료된 이벤트", en: "Completed Events" })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedEvents.map((event) => (
              <Card key={event.id} className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {t(event.title)}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {t(event.description)}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {event.completedDate} 종료
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {event.participants.toLocaleString()}명 참여
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {event.winners}명 당첨
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {t({ ko: "종료", en: "Completed" })}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    {t({ ko: "결과 보기", en: "View Results" })}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}