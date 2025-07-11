import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, MessageCircle, Clock, User, Search, Filter, ChevronRight, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "wouter";
import { useState } from "react";

export default function CommunityQuestion() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const questions = [
    {
      id: 1,
      title: "아크릴 키링 제작 시 최소 해상도는 어떻게 되나요?",
      description: "아크릴 키링을 제작하려는데 이미지 해상도가 얼마나 되어야 깨끗하게 나오는지 궁금합니다. 현재 가지고 있는 이미지가 72dpi인데 괜찮을까요?",
      category: "제작문의",
      status: "답변완료",
      author: "초보제작자**",
      authorLevel: "NEW",
      createdAt: "2024-12-10 14:30",
      views: 156,
      comments: 3,
      tags: ["아크릴키링", "해상도", "제작"],
      urgent: false,
      solved: true,
      adminAnswer: true
    },
    {
      id: 2,
      title: "파일 업로드가 안 되는데 어떻게 해야 하나요?",
      description: "올댓에디터에서 파일 업로드를 시도하는데 계속 실패한다고 나옵니다. 파일 크기는 3MB 정도이고 PNG 파일입니다. 해결 방법을 알려주세요.",
      category: "기술문의",
      status: "답변대기",
      author: "디자인러버**",
      authorLevel: "VIP",
      createdAt: "2024-12-10 12:15",
      views: 89,
      comments: 1,
      tags: ["파일업로드", "올댓에디터", "기술문의"],
      urgent: true,
      solved: false,
      adminAnswer: false
    },
    {
      id: 3,
      title: "주문한 상품의 배송 일정이 궁금합니다",
      description: "12월 8일에 주문한 아크릴 스탠드가 아직 배송 준비중이라고 나와있는데, 언제쯤 발송될까요? 크리스마스 선물용이라 급해서 문의드립니다.",
      category: "주문/배송",
      status: "답변완료",
      author: "선물준비**",
      authorLevel: "GOLD",
      createdAt: "2024-12-10 10:45",
      views: 234,
      comments: 2,
      tags: ["주문", "배송", "아크릴스탠드"],
      urgent: true,
      solved: true,
      adminAnswer: true
    },
    {
      id: 4,
      title: "색상이 모니터와 다르게 나올 수 있나요?",
      description: "모니터에서 보는 색상과 실제 인쇄된 색상이 다를 수 있다고 들었는데, 어느 정도 차이가 날까요? 색상 매칭을 위한 팁이 있다면 알려주세요.",
      category: "제작문의",
      status: "답변완료",
      author: "컬러매니아**",
      authorLevel: "PRO",
      createdAt: "2024-12-09 16:20",
      views: 312,
      comments: 5,
      tags: ["색상", "인쇄", "모니터"],
      urgent: false,
      solved: true,
      adminAnswer: true
    },
    {
      id: 5,
      title: "대량 주문 시 할인 혜택이 있나요?",
      description: "학교 동아리에서 단체 키링을 제작하려고 합니다. 100개 이상 주문 시 할인 혜택이 있는지 궁금합니다. 견적서도 받을 수 있나요?",
      category: "주문/배송",
      status: "답변대기",
      author: "동아리회장**",
      authorLevel: "GOLD",
      createdAt: "2024-12-09 14:30",
      views: 178,
      comments: 0,
      tags: ["대량주문", "할인", "견적"],
      urgent: false,
      solved: false,
      adminAnswer: false
    },
    {
      id: 6,
      title: "환불 정책에 대해 문의드립니다",
      description: "주문 후 디자인을 수정하고 싶은데 이미 제작에 들어갔다고 하네요. 환불이나 수정이 가능한지 문의드립니다. 급하게 처리해주세요.",
      category: "환불/교환",
      status: "답변완료",
      author: "급한고객**",
      authorLevel: "VIP",
      createdAt: "2024-12-09 11:15",
      views: 267,
      comments: 4,
      tags: ["환불", "수정", "제작"],
      urgent: true,
      solved: true,
      adminAnswer: true
    }
  ];

  const categories = [
    { id: "all", name: "전체", count: 156 },
    { id: "production", name: "제작문의", count: 45 },
    { id: "technical", name: "기술문의", count: 32 },
    { id: "order", name: "주문/배송", count: 38 },
    { id: "refund", name: "환불/교환", count: 23 },
    { id: "general", name: "일반문의", count: 18 }
  ];

  const statuses = [
    { id: "all", name: "전체", count: 156 },
    { id: "waiting", name: "답변대기", count: 23 },
    { id: "answered", name: "답변완료", count: 133 }
  ];

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === "all" || question.category.includes(filterCategory);
    const matchesStatus = filterStatus === "all" || 
                          (filterStatus === "waiting" && question.status === "답변대기") ||
                          (filterStatus === "answered" && question.status === "답변완료");
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/community" className="hover:text-gray-700">커뮤니티</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">궁금햄물어바</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t({ ko: "궁금햄물어바", en: "Q&A" })}
              </h1>
              <p className="text-gray-600">
                {t({ 
                  ko: "궁금한 점이 있으시면 언제든지 물어보세요", 
                  en: "Ask us anything you're curious about" 
                })}
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              {t({ ko: "질문하기", en: "Ask Question" })}
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder={t({ ko: "질문 제목, 내용 검색...", en: "Search questions, content..." })}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.name} ({status.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge
                key={category.id}
                variant={filterCategory === category.id ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-50"
                onClick={() => setFilterCategory(category.id)}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <HelpCircle className="w-6 h-6 mr-2 text-blue-500" />
            {t({ ko: "자주 묻는 질문", en: "Frequently Asked Questions" })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: "최소 주문 수량이 있나요?", a: "최소 주문 수량은 1개부터 가능합니다." },
              { q: "제작 기간은 얼마나 걸리나요?", a: "일반적으로 3-5일 정도 소요됩니다." },
              { q: "배송비는 얼마인가요?", a: "3만원 이상 주문시 무료배송입니다." },
              { q: "파일 형식은 어떤 걸 지원하나요?", a: "AI, PSD, PNG, JPG 등을 지원합니다." }
            ].map((faq, index) => (
              <Card key={index} className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">{faq.q}</h3>
                  <p className="text-blue-800 text-sm">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t({ ko: "전체 질문", en: "All Questions" })} ({filteredQuestions.length})
          </h2>
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <Card key={question.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge
                          variant={question.status === "답변완료" ? "default" : "secondary"}
                          className={question.status === "답변완료" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                        >
                          {question.status === "답변완료" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {question.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {question.category}
                        </Badge>
                        {question.urgent && (
                          <Badge className="bg-red-100 text-red-800 text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            긴급
                          </Badge>
                        )}
                        {question.adminAnswer && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            관리자 답변
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                        {question.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {question.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {question.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{question.author}</span>
                            <Badge variant="outline" className="text-xs">
                              {question.authorLevel}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{question.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{question.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <HelpCircle className="w-4 h-4" />
                            <span>{question.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}