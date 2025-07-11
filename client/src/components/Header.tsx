import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Moon, Sun, Menu, User, Heart, ChevronDown } from "lucide-react";
import { useThemeContext } from "./ThemeProvider";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const categoryTabs = [
  {
    id: 'acrylic',
    name: { ko: "아크릴굿즈", en: "Acrylic Goods" },
    subItems: [
      { ko: "아크릴키링", en: "Acrylic Keychain" },
      { ko: "코롯토", en: "Corot" },
      { ko: "스마트톡", en: "Smart Tok" },
      { ko: "스탠드/디오라마", en: "Stand/Diorama" },
      { ko: "포카홀더/포토액자", en: "Photo Holder/Frame" },
      { ko: "아크릴쉐이커", en: "Acrylic Shaker" },
      { ko: "아크릴가라비너", en: "Acrylic Carabiner" },
      { ko: "거울", en: "Mirror" },
      { ko: "자석/뱃지/코스터", en: "Magnet/Badge/Coaster" },
      { ko: "문구류(집게, 볼펜 등)", en: "Stationery (Clips, Pens)" },
      { ko: "아크릴 재단", en: "Acrylic Cutting" }
    ]
  },
  {
    id: 'wood',
    name: { ko: "우드굿즈", en: "Wood Goods" },
    subItems: [
      { ko: "우드키링", en: "Wood Keychain" },
      { ko: "우드마그넷", en: "Wood Magnet" },
      { ko: "우드스탠드", en: "Wood Stand" }
    ]
  },
  {
    id: 'lanyard',
    name: { ko: "렌야드굿즈", en: "Lanyard Goods" },
    subItems: [
      { ko: "렌야드1", en: "Lanyard 1" },
      { ko: "렌야드2", en: "Lanyard 2" }
    ]
  },
  {
    id: 'packaging',
    name: { ko: "포장/부자재", en: "Packaging/Materials" },
    subItems: [
      { ko: "스와치", en: "Swatch" },
      { ko: "부자재", en: "Materials" },
      { ko: "포장재", en: "Packaging" }
    ]
  }
];

export function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>('');
  const { theme, toggleTheme } = useThemeContext();
  const { language, toggleLanguage, t } = useLanguage();

  const handleTabHover = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTabLeave = () => {
    setActiveTab('');
  };

  const handleSubMenuEnter = () => {
    // Keep the submenu open when hovering over it
  };

  const handleSubMenuLeave = () => {
    setActiveTab('');
  };

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              {t({ ko: "홈", en: "Home" })}
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              {t({ ko: "ABOUT 올댓프린팅", en: "About AllThatPrinting" })}
            </Link>
            <Link href="/community" className="text-muted-foreground hover:text-foreground">
              {t({ ko: "서포터즈", en: "Supporters" })}
            </Link>
            <Link href="/reviews" className="text-muted-foreground hover:text-foreground">
              {t({ ko: "후기", en: "Reviews" })}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-muted-foreground hover:text-foreground">
              {t({ ko: "로그인", en: "Login" })}
            </Link>
            <Link href="/register" className="text-muted-foreground hover:text-foreground">
              {t({ ko: "회원가입", en: "Sign Up" })}
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
              className="text-muted-foreground hover:text-foreground"
            >
              {language === 'ko' ? 'EN' : 'KR'}
            </Button>
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
                ALLTHATPRINTING
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              {categoryTabs.map((tab) => (
                <div
                  key={tab.id}
                  className="relative"
                  onMouseEnter={() => handleTabHover(tab.id)}
                  onMouseLeave={handleTabLeave}
                >
                  <Link
                    href={`/products?category=${tab.id}`}
                    className={`text-lg font-medium transition-colors py-4 border-b-2 block ${
                      activeTab === tab.id
                        ? 'border-black text-foreground'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t(tab.name)}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder={t({ ko: "검색", en: "Search" })}
                  className="w-48 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* User actions */}
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
                
                <Link href="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                
                <Link href="/favorites">
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs">
                      5
                    </Badge>
                  </Button>
                </Link>
                
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs">
                      3
                    </Badge>
                  </Button>
                </Link>
              </div>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-6 mt-8">
                    {/* Mobile search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder={t({ ko: "검색", en: "Search" })}
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    {/* Mobile category tabs */}
                    <div className="space-y-4">
                      {categoryTabs.map((tab) => (
                        <div key={tab.id} className="space-y-2">
                          <button
                            onClick={() => setActiveTab(activeTab === tab.id ? '' : tab.id)}
                            className="flex items-center justify-between w-full text-left text-lg font-medium"
                          >
                            {t(tab.name)}
                            <ChevronDown className={`h-4 w-4 transition-transform ${
                              activeTab === tab.id ? 'rotate-180' : ''
                            }`} />
                          </button>
                          {activeTab === tab.id && (
                            <div className="pl-4 space-y-1">
                              {tab.subItems.map((item, index) => (
                                <Link
                                  key={index}
                                  href={`/products?category=${tab.id}&item=${index}`}
                                  className="block text-sm text-muted-foreground hover:text-foreground py-1"
                                >
                                  {t(item)}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Mobile actions */}
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <Button variant="outline" onClick={toggleLanguage}>
                          {language === 'ko' ? 'English' : '한국어'}
                        </Button>
                        <Button variant="outline" size="icon" onClick={toggleTheme}>
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

        {/* Sub-menu dropdown */}
        {activeTab && (
          <div 
            className="absolute left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-40 hidden lg:block"
            onMouseEnter={handleSubMenuEnter}
            onMouseLeave={handleSubMenuLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-wrap justify-center items-center gap-1">
                {categoryTabs.find(tab => tab.id === activeTab)?.subItems.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Link
                      href={`/products?category=${activeTab}&item=${index}`}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                    >
                      {t(item)}
                    </Link>
                    {index < (categoryTabs.find(tab => tab.id === activeTab)?.subItems.length || 0) - 1 && (
                      <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}