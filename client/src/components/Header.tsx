import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Moon, Sun, Menu, X, Heart, User } from "lucide-react";
import { useThemeContext } from "./ThemeProvider";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";

export function Header() {
  const [location] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCartPreview, setShowCartPreview] = useState(false);
  const { theme, toggleTheme } = useThemeContext();
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { href: "/", label: { ko: "홈", en: "Home" } },
    { href: "/products", label: { ko: "제품", en: "Products" } },
    { href: "/community", label: { ko: "커뮤니티", en: "Community" } },
    { href: "/login", label: { ko: "로그인", en: "Login" } },
  ];

  const cartItems = [
    { id: 1, name: "아크릴 키링", price: 15000, quantity: 1, image: "/api/placeholder/60/60" },
    { id: 2, name: "커스텀 스티커", price: 8000, quantity: 2, image: "/api/placeholder/60/60" },
    { id: 3, name: "포토 머그컵", price: 25000, quantity: 1, image: "/api/placeholder/60/60" },
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const isActiveRoute = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-primary text-primary-foreground py-3 px-4 text-center relative">
        <div className="flex items-center justify-center gap-2">
          <span className="text-yellow-300">🔥</span>
          <span className="font-semibold text-korean text-tight">
            {t({
              ko: "모든 커스텀 프린팅 서비스 20% 할인 이벤트 진행 중!",
              en: "20% OFF All Custom Printing Services!"
            })}
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-background border-b sticky top-0 z-50 shadow-sm backdrop-blur-md bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-foreground text-korean">
                ALL<span className="text-primary">THAT</span>PRINTING
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary text-korean text-tight ${
                    isActiveRoute(item.href)
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {t(item.label)}
                </Link>
              ))}
              <Link href="/register">
                <Button className="btn-primary hover-scale">
                  {t({ ko: "회원가입", en: "Sign Up" })}
                </Button>
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder={t({ ko: "제품 검색...", en: "Search products..." })}
                  className="w-64 pl-10 text-korean"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Language Toggle */}
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex font-semibold"
                onClick={toggleLanguage}
              >
                {language === 'ko' ? 'EN' : 'KR'}
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9"
                title={t({ ko: "다크 모드 토글", en: "Toggle dark mode" })}
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>

              {/* Favorites */}
              <Link href="/favorites">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs">
                    5
                  </Badge>
                </Button>
              </Link>

              {/* Cart with Preview */}
              <div className="relative cart-container">
                <Link href="/cart">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative"
                    onMouseEnter={() => setShowCartPreview(true)}
                    onMouseLeave={() => setShowCartPreview(false)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent">
                      {cartItems.length}
                    </Badge>
                  </Button>
                </Link>
                
                {/* Cart Preview */}
                {showCartPreview && (
                  <div className="absolute right-0 top-12 w-80 cart-preview z-50">
                    <Card className="shadow-lg border-2">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-korean">
                            {t({ ko: "장바구니", en: "Cart" })}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {cartItems.length} {t({ ko: "개 상품", en: "items" })}
                          </span>
                        </div>
                        
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-korean truncate">
                                  {item.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  ₩{item.price.toLocaleString()} × {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-korean">
                              {t({ ko: "총 금액", en: "Total" })}
                            </span>
                            <span className="font-bold text-primary">
                              ₩{totalPrice.toLocaleString()}
                            </span>
                          </div>
                          <Button className="w-full btn-primary">
                            {t({ ko: "주문하기", en: "Checkout" })}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <User className="h-4 w-4" />
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-6 mt-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-base font-medium transition-colors hover:text-primary text-korean ${
                          isActiveRoute(item.href)
                            ? "text-primary font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {t(item.label)}
                      </Link>
                    ))}
                    <div className="space-y-4 pt-4 border-t">
                      <Link href="/register">
                        <Button className="btn-primary w-full">
                          {t({ ko: "회원가입", en: "Sign Up" })}
                        </Button>
                      </Link>
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="outline" 
                          onClick={toggleLanguage}
                          className="flex-1 mr-2"
                        >
                          {language === 'ko' ? 'English' : '한국어'}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={toggleTheme}
                          className="flex-shrink-0"
                        >
                          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
