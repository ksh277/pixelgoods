import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const heroSlides = [
  {
    id: 1,
    title: { ko: "나만의 특별한 디자인을 만들어보세요", en: "Create Your Own Special Design" },
    subtitle: { ko: "고품질 아크릴 키링부터 맞춤 스티커까지", en: "From high-quality acrylic keychains to custom stickers" },
    image: "/api/placeholder/800/600",
    ctaText: { ko: "디자인 시작하기", en: "Start Designing" },
    bgColor: "from-blue-400 to-purple-600"
  },
  {
    id: 2,
    title: { ko: "최고의 프린팅 기술로 제작합니다", en: "Made with the Best Printing Technology" },
    subtitle: { ko: "내구성과 선명함을 동시에 만족하는 제품", en: "Products that satisfy both durability and clarity" },
    image: "/api/placeholder/800/600",
    ctaText: { ko: "제품 보기", en: "View Products" },
    bgColor: "from-green-400 to-blue-500"
  },
  {
    id: 3,
    title: { ko: "빠른 배송, 확실한 품질보장", en: "Fast Delivery, Quality Guaranteed" },
    subtitle: { ko: "3일 이내 제작완료, 무료배송 서비스", en: "Completed within 3 days, free shipping service" },
    image: "/api/placeholder/800/600",
    ctaText: { ko: "주문하기", en: "Order Now" },
    bgColor: "from-pink-400 to-red-500"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-[50vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgColor}`}
        >
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative h-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-white z-10"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex items-center gap-2 mb-4"
                  >
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                    <span className="text-sm font-medium text-yellow-300 text-korean">
                      {t({ ko: "올댓프린팅 특별 서비스", en: "AllThatPrinting Special Service" })}
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-korean text-tight leading-tight"
                  >
                    {t(heroSlides[currentSlide].title)}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-lg md:text-xl mb-6 text-white/90 text-korean leading-relaxed"
                  >
                    {t(heroSlides[currentSlide].subtitle)}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl text-base hover-scale text-korean shadow-lg border-0"
                      style={{ color: '#1a1a1a' }}
                    >
                      <span className="text-gray-900 font-bold">
                        {t(heroSlides[currentSlide].ctaText)}
                      </span>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white border-2 text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-6 rounded-xl text-base text-korean shadow-lg bg-transparent"
                      style={{ color: 'white', borderColor: 'white' }}
                    >
                      <Play className="h-4 w-4 mr-2 text-white" />
                      <span className="text-white font-semibold">
                        {t({ ko: "작업 과정 보기", en: "Watch Process" })}
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="relative"
                >
                  <motion.img
                    src={heroSlides[currentSlide].image}
                    alt="Hero"
                    className="w-full h-60 md:h-72 object-cover rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-16 right-16 hidden lg:block"
      >
        <div className="w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-24 left-16 hidden lg:block"
      >
        <div className="w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm" />
      </motion.div>
    </section>
  );
}