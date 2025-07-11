import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Moon, Sun, Menu, User, Heart, ChevronDown, Globe } from "lucide-react";
import { useThemeContext } from "./ThemeProvider";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useThemeContext();
  const { language, setSpecificLanguage, t } = useLanguage();

  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const categoryNavItems = [
    { id: 'reviews', label: { ko: "사용후기 💕", en: "Reviews 💕", ja: "レビュー 💕", zh: "使用心得 💕" }, href: "/reviews" },
    { id: 'collections', label: { ko: "모음전 🏷️", en: "Collections 🏷️", ja: "コレクション 🏷️", zh: "合集 🏷️" }, href: "/collections" },
    { id: 'resources', label: { ko: "자료실", en: "Resources", ja: "資料室", zh: "资料室" }, href: "/resources" },
    { id: 'events', label: { ko: "이벤트", en: "Events", ja: "イベント", zh: "活动" }, href: "/events" },
    { id: 'support', label: { ko: "문의게시판", en: "Support", ja: "お問い合わせ", zh: "咨询版" }, href: "/support" },
    { id: 'payment', label: { ko: "추가결제", en: "Payment", ja: "追加支払い", zh: "追加付款" }, href: "/payment" },
    { id: 'benefits', label: { ko: "회원등급혜택", en: "Member Benefits", ja: "会員特典", zh: "会员福利" }, href: "/benefits" }
  ];

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-end text-sm">
          <div className="flex items-center space-x-4">
            <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
              {t({ ko: "프린팅", en: "Printing", ja: "印刷", zh: "印刷" })}
            </Link>
            <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
              {t({ ko: "커뮤니티", en: "Community", ja: "コミュニティ", zh: "社区" })}
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
              {t({ ko: "로그인", en: "Login", ja: "ログイン", zh: "登录" })}
            </Link>
            <Link href="/register" className="text-muted-foreground hover:text-foreground transition-colors">
              {t({ ko: "회원가입", en: "Sign Up", ja: "会員登録", zh: "注册" })}
            </Link>
            
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSpecificLanguage(lang.code as any)}
                    className={language === lang.code ? "bg-muted" : ""}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold text-foreground">
                ALL THAT PRINTING
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t({ ko: "검색...", en: "Search...", ja: "検索...", zh: "搜索..." })}
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              {/* Profile */}
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Favorites */}
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <Heart className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                  3
                </Badge>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={t({ ko: "검색...", en: "Search...", ja: "検索...", zh: "搜索..." })}
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Mobile Top Actions */}
                  <div className="flex flex-col space-y-2 pb-4 border-b">
                    <Link href="/products" className="flex items-center py-2 px-3 text-foreground hover:bg-muted rounded-md transition-colors">
                      {t({ ko: "프린팅", en: "Printing", ja: "印刷", zh: "印刷" })}
                    </Link>
                    <Link href="/community" className="flex items-center py-2 px-3 text-foreground hover:bg-muted rounded-md transition-colors">
                      {t({ ko: "커뮤니티", en: "Community", ja: "コミュニティ", zh: "社区" })}
                    </Link>
                    <Link href="/login" className="flex items-center py-2 px-3 text-foreground hover:bg-muted rounded-md transition-colors">
                      {t({ ko: "로그인", en: "Login", ja: "ログイン", zh: "登录" })}
                    </Link>
                    <Link href="/register" className="flex items-center py-2 px-3 text-foreground hover:bg-muted rounded-md transition-colors">
                      {t({ ko: "회원가입", en: "Sign Up", ja: "会員登録", zh: "注册" })}
                    </Link>
                  </div>

                  {/* Mobile Category Links */}
                  <div className="flex flex-col space-y-2">
                    {categoryNavItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="flex items-center py-2 px-3 text-foreground hover:bg-muted rounded-md transition-colors"
                      >
                        {t(item.label)}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Category Navigation Bar */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="hidden md:flex items-center space-x-8 py-3 overflow-x-auto">
              {categoryNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-foreground ${
                    location === item.href
                      ? 'text-foreground border-b-2 border-orange-500 pb-2'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(item.label)}
                </Link>
              ))}
            </div>
            
            {/* Mobile Category Scroll */}
            <div className="md:hidden flex items-center space-x-6 py-3 overflow-x-auto">
              {categoryNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`whitespace-nowrap text-sm font-medium transition-colors ${
                    location === item.href
                      ? 'text-foreground border-b-2 border-orange-500 pb-2'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(item.label)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}