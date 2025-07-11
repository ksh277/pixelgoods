import { ArrowRight, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-20 h-20 bg-primary/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent/10 rounded-full animate-pulse-delay"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-300/20 rounded-full animate-pulse-delay-2"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-blue-300/20 rounded-full animate-pulse-slow"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-primary mr-2" />
            <span className="text-sm font-medium text-muted-foreground bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full">
              새로운 커스텀 프린팅 경험
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            나만의 <span className="text-gradient">커스텀</span> 굿즈
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            아크릴 키링, 스티커, 머그컵까지 다양한 제품을 
            <br className="hidden sm:block" />
            원하는 디자인으로 제작하세요
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/products">
              <Button size="lg" className="btn-primary text-lg group">
                지금 커스터마이즈하기
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/community">
              <Button size="lg" variant="outline" className="btn-secondary text-lg group">
                <Palette className="mr-2 h-5 w-5" />
                템플릿 보기
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>무료 배송 (3만원 이상)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>고품질 프린팅</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>빠른 제작 (2-3일)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
