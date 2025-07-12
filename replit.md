# AllThatPrinting E-commerce Platform

## Overview

AllThatPrinting is a full-stack Korean-style e-commerce web application for custom printing services. The platform allows users to create personalized merchandise including acrylic keychains, stickers, t-shirts, phone cases, and other custom printed items. Built with React, TypeScript, and modern web technologies, it provides a comprehensive solution for both customers and administrators.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS for styling with shadcn/ui components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Theme System**: Custom theme provider with light/dark mode support

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple
- **File Storage**: Planned for user uploads and product images

### Key Design Decisions
- **Monorepo Structure**: Shared schema and types between client and server
- **TypeScript-first**: Full type safety across the stack
- **Component-based UI**: Modular, reusable components following shadcn/ui patterns
- **Korean-first Design**: Primary language is Korean with English toggle support
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Key Components

### Frontend Components
- **Header**: Navigation with language toggle, dark mode, search, and user actions
- **Hero Section**: Landing page with promotional banners and CTAs
- **Product Grid**: Responsive product display with filtering and sorting
- **Product Customization**: Real-time preview for user designs
- **Shopping Cart**: Full cart management with quantity updates
- **User Authentication**: Login/register forms with social login placeholders
- **Community Features**: User-generated content sharing and interaction

### Backend Services
- **Product Management**: CRUD operations for products and categories
- **User Management**: Authentication, profiles, and preferences
- **Order Processing**: Cart to checkout flow with order tracking
- **Review System**: Product reviews and ratings
- **Community System**: User posts, comments, and likes
- **File Upload**: Support for custom images and designs

## Data Flow

### User Journey
1. **Discovery**: Browse products by category or featured items
2. **Customization**: Upload images, add text, select options
3. **Purchase**: Add to cart, checkout with shipping details
4. **Community**: Share designs, review products, engage with others
5. **Account**: Track orders, save designs, manage preferences

### Data Management
- **Client State**: Local UI state, form data, user preferences
- **Server State**: Products, orders, user data cached with TanStack Query
- **Database**: PostgreSQL with Drizzle ORM for type-safe queries
- **File Storage**: User uploads and product images (to be implemented)

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React Query, React Hook Form
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Styling**: Tailwind CSS with custom Korean-focused design system
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with Zod validation

### Development Tools
- **Build**: Vite with TypeScript support
- **Database**: Drizzle Kit for migrations and schema management
- **Development**: TSX for running TypeScript in development
- **Linting**: ESBuild for production builds

### Planned Integrations
- **Payment**: KakaoPay, Naver Pay, and credit card processing
- **Authentication**: Google and Kakao social login
- **File Storage**: Cloud storage for user uploads
- **Analytics**: User behavior tracking
- **Email**: Order confirmations and notifications

## Deployment Strategy

### Development Setup
- **Environment**: NODE_ENV-based configuration
- **Database**: DATABASE_URL environment variable for connection
- **Hot Reload**: Vite development server with HMR
- **Type Checking**: Continuous TypeScript checking

### Production Build
- **Frontend**: Vite build with static asset optimization
- **Backend**: ESBuild bundling for Node.js deployment
- **Database**: Drizzle migrations for schema updates
- **Static Assets**: Optimized images and fonts

### Deployment Considerations
- **Environment Variables**: Secure configuration management
- **Database**: Production PostgreSQL with connection pooling
- **CDN**: Static asset delivery for images and fonts
- **SSL**: HTTPS enforcement for security
- **Monitoring**: Error tracking and performance monitoring

### Architecture Benefits
- **Type Safety**: Full-stack TypeScript prevents runtime errors
- **Developer Experience**: Fast development with Vite and hot reload
- **Scalability**: Modular component architecture supports growth
- **Internationalization**: Built-in Korean/English language support
- **Performance**: Optimized builds and lazy loading for fast page loads

## Recent Changes

### 2025-01-11: Complete Korean-Style Homepage Implementation
- **Hero Section**: Reduced height to 50% (h-[50vh] with min-h-[500px]) while maintaining visual appeal and mobile responsiveness
- **9-Section Layout**: Implemented comprehensive Korean e-commerce homepage structure:
  1. 🔥 인기상품 (Popular Items) - 4-column product grid
  2. 🧡 따끈따끈한 신상품 (Fresh New Arrivals) - Latest products
  3. 🤗 창작자들의 소중한 리뷰 (Creator Reviews) - Customer testimonials with star ratings
  4. 🔥 굿즈 자랑 커뮤니티 (Community Showcase) - User-generated content gallery
  5. ✨ 자재별 추천 (Material-Based Recommendations) - Products by material type
  6. ❤️ 인기급상승 아이템 (Trending Now) - Rapidly rising items
  7. 🎯 올댓추천 (Staff Picks) - Curated recommendations
  8. 🏷️ 브랜드 굿즈 안내 (Brand Custom Goods) - B2B service banners
  9. 🎁 고객 맞춤 혜택 배너 (Personalized Benefits) - Member benefits and events

### New Components Created
- **SectionHeader**: Reusable component with emoji, Korean/English titles, and "See More" links
- **ProductGrid**: 4-column responsive grid with staggered animations
- **Enhanced Product Cards**: Korean design patterns with LIKE counts, ₩ pricing, hover effects

### Korean Design Implementation
- **Typography**: Applied Korean web aesthetics with tight letter spacing (text-korean class)
- **Color Scheme**: White background with proper Korean e-commerce visual patterns
- **Responsive Design**: Mobile-first approach with proper breakpoints (sm:, md:, lg:)
- **Animations**: Framer Motion scroll-triggered animations for each section
- **Navigation**: "See More" links routing to respective product category pages

### Technical Architecture
- **Layout**: Max-width 1200px centered container with proper spacing
- **Grid System**: 4-column product grids as per Korean e-commerce standards
- **Language Toggle**: Complete Korean/English internationalization
- **Performance**: Lazy loading, staggered animations, and optimized rendering

## Recent Changes

### 2025-01-11: Complete Mobile-First Korean E-commerce Layout
- **Universal Mobile-First Design**: All homepage product sections now use 2-column mobile layout (grid-cols-2)
- **Responsive Grid System**: 2-column mobile → 3-column tablet → 4-column desktop progression
- **Korean E-commerce Card Pattern**: Applied to all sections (Popular Products, Creator Reviews, Community Showcase, Material Recommendations, Instagram Feed)
- **Consistent Design Elements**:
  - HOT/인기 badges in top-left corner with section-specific colors
  - Heart icons in top-right corner for favoriting
  - Clean white cards with subtle shadows and rounded corners
  - Korean typography with proper sizing (14px bold titles, 13px prices)
  - "won" format pricing display
  - Review counts in lighter gray
- **Section-Specific Enhancements**:
  - Creator Reviews: Blue HOT badges, star ratings, review counts
  - Community Showcase: Green 인기 badges, interaction stats overlay
  - Material Recommendations: Badge color coding (HIT/NEW/SALE), material tags
  - Instagram Feed: Hover interaction stats, clean grid layout
- **Mobile CSS Optimization**: Added Korean e-commerce specific mobile styling classes
- **Performance**: Lazy loading images, optimized touch targets, smooth hover transitions

### 2025-01-11: Comprehensive Product Detail Page Implementation
- **AllThatPrinting-Style Layout**: Complete 2-column structure with image carousel and product options
- **Interactive Image Gallery**: Thumbnail navigation with main image switching and hover effects
- **Button-Style Product Options**: Korean e-commerce pattern with visual option selection
  - ✅ 스탠드 사이즈: Multiple size options with pricing (일반 35x50, 라미 70x140, 대형 100x200)
  - ✅ 받침 선택: Base options (투명, 인쇄, 라미 3T/5T) with price differentials
  - ✅ 수량 선택: Quantity-based pricing with bulk discounts and design limitations
  - ✅ 포장 방식: Packaging options (기본 포장, OPP 동봉)
- **3-Tab File Upload System**: 
  - PDF 업로드: Drag & drop functionality with file validation
  - 도안 작업 의뢰: Custom design request form with pricing
  - 올댓에디터: Direct link to editor with call-to-action
- **Fixed Floating Buttons**: Bottom-right positioning with Korean design
  - 문의하기: Inquiry button with business hours tooltip
  - 올댓에디터: Editor access with mascot styling
- **Advanced Features**:
  - Real-time price calculation based on selected options
  - Breadcrumb navigation with proper routing
  - Sample file download section
  - 3-tab content system (상품 상세, 상품 후기, 상품 문의)
  - Customer review system with ratings and images
  - Product Q&A placeholder system
- **Mobile Responsiveness**: Accordion-style option collapsing for mobile devices
- **Component Architecture**: Reusable structure for different product types
- **UI Components Added**: Accordion, Dialog components for enhanced interactivity

### 2025-01-11: Advanced Web Editor Implementation
- **Comprehensive Goods Editor**: Built full-featured web editor for custom goods customization
- **Product Selection System**: Interactive product type selector with 8 different goods categories
- **Professional Canvas Editor**: Desktop-optimized editing interface with left sidebar controls
- **Advanced Customization Features**:
  - Image upload and manipulation (drag, resize, rotate)
  - Size control (width × height in mm)
  - Ring position and size settings
  - White area adjustment with slider
  - Double-sided editing capability
  - Background removal functionality
- **Korean Design Patterns**: Clean gray background, professional icons, Korean/English/Japanese/Chinese support
- **Responsive Design**: Desktop-first with mobile-optimized views
- **Complete UI Components**: Added Radix UI Slider, Dialog, Select components
- **Navigation Integration**: Added "굿즈 에디터" to main navigation and mobile menu
- **Editor Features**:
  - Product types: 키링, 스탠드, 코롯토, 포카홀더, 스마트톡, 뱃지, 자석/문구류, 카라비너
  - Canvas tools: Upload, move, resize, delete, save, PDF export
  - Professional toolbar with ring positioning and size controls
  - Help system with production guidelines
  - Fixed editor button on all pages

### 2025-01-11: Community Navigation & Missing Pages Implementation
- **Complete Community Tab System**: Fixed all 404 errors in community navigation
- **New Page Components**: Created 4 new fully-functional pages:
  - `/resources` (자료실): Design templates, production guides, tutorials, fonts with download functionality
  - `/events` (이벤트): Ongoing, upcoming, and completed events with participation tracking
  - `/community/share` (도안공유): Design sharing platform with search, filter, and download features
  - `/community/question` (궁금햄물어바): Q&A system with FAQ, category filtering, and status tracking
- **Enhanced Navigation**: Updated Community page tabs to use proper Link components for routing
- **Clickable Product Cards**: Added routing functionality to product cards (→ `/product/[id]`)
- **Review Detail System**: Created comprehensive review detail page with related products and reviews
- **Clickable Review Cards**: Both community showcase and recent posts cards navigate to review details
- **Korean E-commerce Features**: Each page includes proper Korean UX patterns:
  - Search and filter functionality
  - Category badges and status indicators
  - Participation counts and engagement metrics
  - Professional Korean typography and layout
  - Responsive mobile-first design

### 2025-01-12: Mobile Editor Optimization & Scroll Fix
- **Mobile-First Responsive Editor**: Complete mobile optimization with professional mobile UX
  - Collapsible toolbar with "Editor Tools" toggle button
  - Mobile-optimized canvas sizing (350px max-width on mobile, 600px on desktop)
  - Responsive header with compact mobile button layout
  - Touch-optimized CSS for mobile interaction (`touch-action`, `-webkit-overflow-scrolling`)
- **Enhanced Image Upload System**: Improved file handling with robust error management
  - Blob URL implementation for immediate image preview
  - File type validation (image files only)
  - File size validation (10MB limit)
  - Error state handling with fallback UI for failed image loads
  - Automatic input reset after upload
- **Scroll Position Fix**: Added `useEffect` hook to automatically scroll to top on `/editor` page load
  - Fixes mobile navigation issue where previous page scroll position was retained
  - Ensures "제품 선택 화면" (Product Selection Screen) is always visible first
  - Improves mobile user experience when accessing editor from page bottom
- **Responsive Design Improvements**: 
  - Fixed horizontal overflow issues with `overflow-x: hidden` and `max-width: 100vw`
  - Mobile-specific CSS classes for touch interactions
  - Responsive bottom toolbar with essential controls only on mobile
  - Professional mobile-first layout with proper viewport handling

### 2025-01-12: Advanced Canvas Editor & Global Navigation System
- **Professional DraggableImage Component**: Complete interactive image manipulation system
  - Drag and drop functionality with touch support for mobile devices
  - Corner and side resize handles with aspect ratio maintenance toggle
  - Rotation and flip controls with real-time visual feedback
  - Manual size input controls in both desktop sidebar and mobile toolbar
  - Canvas bounds checking to prevent images from moving outside design area
  - Enhanced touch interaction CSS for mobile optimization
- **Global Community Navigation System**: Implemented sticky navigation across all community pages
  - Created shared Layout component with community navigation bar
  - Sticky positioning at top of screen (z-index 50) with proper mobile responsiveness
  - Active state highlighting with blue underline borders and background colors
  - Route detection for all community pages including shortcuts (/doan, /event, /resources)
  - Removed duplicate navigation from individual pages for cleaner architecture
  - Mobile-responsive horizontal scrolling navigation with proper touch targets
- **Enhanced Route Management**: Added support for shortcut URLs and improved navigation logic
  - `/doan` → `/community/design-share` (도안공유)
  - `/event` → `/community/events` (이벤트)
  - `/resources` → `/community/resources` (자료실)
  - `/community/qna` → `/community/question` (궁금햄물어바)
  - Proper active state detection for all navigation variants
- **Layout Architecture**: Centralized layout management with conditional community navigation
  - Layout component wraps all routes with showCommunityNav prop
  - Clean separation of concerns between global header/footer and community navigation
  - Consistent user experience across all community-related pages

### 2025-01-12: Global Floating Action Button (FAB) Implementation
- **Global FAB System**: Implemented global floating action buttons accessible from all pages
- **Updated Button Text**: Changed "문의하기" to "문의" for more concise design
- **Dual-Position Layout**: 
  - Bottom-right: "문의" (Inquiry) button with MessageCircle icon
  - Bottom-left: "올댓에디터" (AllThat Editor) button with Puzzle icon
- **Enhanced UX Features**:
  - Smooth slide-in animations on page load (fab-slide-in-right, fab-slide-in-left)
  - Hover effects with scale transformation (hover:scale-105)
  - Shadow effects and visual feedback
  - Multi-language support (Korean/English/Japanese/Chinese)
- **Mobile Responsiveness**: Touch-optimized button sizes and spacing
- **Z-index Management**: Proper layering (z-50) to stay above scrollable content
- **Integration**: Moved from page-specific to global Layout component for consistent availability

### 2025-01-12: Community Q&A Board Implementation - "궁금햄물어봐"
- **Complete Q&A Board UI**: Built comprehensive community Q&A board with Korean design patterns
- **Top Banner Design**: Character illustration with speech bubble "이거 어떻게 하지? 물어봐야겠다~" and CTA button
- **Motivational Message**: Blue banner with "더이상 혼자 고민하지 마세요. 너무 어려우면, 언제든지 물어보세요!"
- **3-Tab Navigation System**: 
  - 전체 (All) with post count display
  - 도안러구인 (Design Requests) for freelancer connections
  - 굿즈지식인 (Goods Knowledge) for expert Q&A
- **Advanced Post Management**:
  - Real-time filtering by category and search query
  - Multiple sorting options (최신순, 인기순, 댓글순, 조회순)
  - Status badges (답변대기, 올댓지식인 답변, NEW markers)
  - Hashtag system for better categorization
- **Rich Post Display**:
  - Category badges with color coding (blue for 굿즈지식인, green for 도안러구인)
  - Visual NEW markers (🔴 N) for recent posts
  - 2-line content preview with line clamping
  - User avatars, engagement stats (likes, views, comments)
  - Expert answer highlighting system
- **Mobile-First Responsive Design**:
  - Swipeable tab navigation on mobile devices
  - Responsive controls layout (vertical on mobile, horizontal on desktop)
  - Mobile-optimized post cards with flexible layouts
  - Touch-friendly interface elements
- **Interactive Features**:
  - Search functionality with placeholder text
  - Dropdown sorting controls
  - Write button for new posts
  - Smooth animations with staggered loading
  - Empty state messaging for no results
- **Navigation Integration**: Updated community navigation to route to `/community/qna`

### 2025-01-12: Product Detail Page Enhancement - Product Overview Section
- **Comprehensive Product Overview Section**: Added "상품목록 한눈에 보기" (Product Overview at a Glance) to product detail pages
- **6 Product Categories**: Organized into responsive grid layout with emoji icons and Korean/English/Japanese/Chinese translations
  - 🧷 아크릴 키링: 14 subcategories (투명, 하프미러, 글리터, 유색, 자개, 거울, 홀로그램, 하프미러5T, 투명5T, 뮤트컬러, 야광, 회전 스핀, 랜티큘러, 파스텔 아스텔 4T)
  - 🧷 코롯토: 3 subcategories (자립형 8T/9T, 뒤도바 10T, 아프로바 10T)
  - 📱 스마트톡: 7 subcategories (투명, 거울, 홀로그램, 하프미러5T, 뮤트컬러, 야광, 회전)
  - 🎯 스탠드: 5 subcategories (일반 35×50, 라미 70×140, 대형 100×200, 투명, 컬러)
  - 🖼️ 홀더: 4 subcategories (포카홀더, 카드홀더, 명함홀더, 메모홀더)
  - 🎨 기타 굿즈: 6 subcategories (셰이커, 카라비너, 거울, 자석, 문구류, 컷팅스티커)
- **Interactive Navigation**: Each product subcategory links to respective category pages with query parameters
- **Mobile-Responsive Design**: 1-column mobile, 2-column tablet, 3-column desktop grid with hover effects
- **Call-to-Action**: "전체 카테고리 보기" button for comprehensive category exploration
- **Strategic Placement**: Positioned between product tabs and floating buttons for optimal user engagement
- **UX Enhancement**: Designed to increase product discovery and improve conversion rates

### 2025-01-12: Rewards & Membership Benefits Page Implementation
- **Comprehensive Rewards System**: Created `/rewards` page with complete membership tier benefits system
- **Hero Section**: Gradient background with compelling call-to-action and benefits overview
- **Top Banner**: Two-column layout with descriptive text and money/coins illustration icon
- **3-Coupon Reward System**: Horizontal card layout featuring:
  - 회원가입 축하: ₩2,000 (30일 유효)
  - 첫 구매 감사: ₩1,000 (60일 유효)  
  - 생일 축하: ₩1,000 (30일 유효)
- **4-Tier Membership System**: Responsive grid layout with interactive hover effects
  - BASIC: Under ₩3M annually, 1% points, free shipping over ₩50K
  - SPECIAL: Over ₩3M annually, 1%+2% points, free shipping over ₩30K
  - VIP: Over ₩6M annually, 1%+4% points, free shipping + brochure
  - VVIP: Over ₩10M annually, 1%+6% points, free shipping + sample kit
- **Visual Design Elements**: Tier-specific colors, icons (Star, Sparkles, Crown, Trophy), and hover animations
- **Multi-language Support**: Complete Korean/English/Japanese/Chinese localization
- **Mobile-Responsive**: 1-column mobile, 2-column tablet, 4-column desktop with optimized touch interactions
- **Call-to-Action**: Gradient CTA section with registration and login buttons
- **Navigation Integration**: Updated header "회원등급혜택" to link to `/rewards` page
- **Professional Layout**: Soft color scheme (blue, purple, gray) with Korean e-commerce aesthetics

### 2025-01-12: User Reviews Section Implementation
- **Homepage User Reviews Component**: Created comprehensive review section with smile emoji (😊) and Korean-style design
- **Review Cards Display**: 4 horizontal review cards with product thumbnails, HOT badges, and review counts
- **Interactive Elements**: Star ratings, truncated review text, masked reviewer nicknames, and formatted dates
- **Full Reviews Page**: Complete `/reviews/all` page with advanced filtering and sorting capabilities
- **Search & Filter System**: Real-time search, category filtering, and multiple sort options (latest, rating, etc.)
- **Mobile-First Design**: Responsive grid layout (2-col mobile → 3-col desktop) with touch-optimized interactions
- **Review Detail Navigation**: Clickable review cards routing to individual review detail pages
- **Multi-language Support**: Complete Korean/English/Japanese/Chinese localization throughout
- **Enhanced UX Features**: Hover effects, loading states, empty states, and breadcrumb navigation
- **Homepage Integration**: Seamlessly integrated User Reviews section between existing content sections

### 2025-01-12: Multi-Section User Content Showcase System
- **Comprehensive UGC Platform**: Built complete 4-section user-generated content showcase system with distinct purposes
- **Best Reviews Section**: Admin-curated reviews with 3-column grid, "BEST" ribbons, and carousel navigation
  - Large review images with star ratings and interaction stats
  - Masked usernames and formatted dates
  - Product badges and category tags
  - Hover effects and detailed view links
- **Review Rewards Section**: 3-tier reward system with visual incentives
  - Text Review: ₩1,000 points with message icon
  - Photo/Video Review: ₩3,000 points with camera icon
  - Best Review: ₩10,000 points with star icon and HOT badge
  - Comprehensive terms and conditions display
  - Statistics dashboard showing total reviews and points distributed
- **Community Showcase Section**: User-generated goods display with masonry layout
  - Search, filter, and sort functionality (latest/popular/views)
  - Category filters and tag system
  - Like/heart functionality with toast notifications
  - View mode toggle (grid/masonry)
  - Upload date and interaction statistics
- **All Reviews List Section**: Product-focused review aggregation
  - Horizontal scroll carousel with navigation controls
  - Product thumbnails with NEW/인기상품/HOT badges
  - Average ratings and review counts
  - Recent review previews with sparkle icons
  - Statistics showing total reviews, orders, and ratings
- **Unified Showcase Page**: `/showcase` route with sticky navigation and smooth scrolling
  - Section-based navigation with anchor links
  - Staggered animations and professional Korean/English/Japanese/Chinese localization
  - Responsive design with mobile-optimized layouts
  - Call-to-action footer with gradient design
- **Technical Features**: Modular component architecture, Progress and Tabs UI components, carousel controls, and comprehensive filtering systems

### 2025-01-12: Complete Beluga Character Replacement
- **Universal Character Update**: Replaced all mascot/character images throughout the application with new white Beluga character
- **BelugaMascot Component**: Updated to use new white Beluga character image (ChatGPT Image 2025년 7월 12일 오후 04_51_30_1752306698190.png)
- **Character Integration**: New Beluga character now appears in all 7 UI scenarios:
  - Inquiry floating button (bottom-right)
  - Empty cart state illustrations
  - Login/registration welcome screens
  - MyPage greeting character
  - Error/404 page mascot
  - Review section character
  - Design/editor section mascot
  - Event/loading screens
- **Modular Architecture**: Built flexible character system for easy future pose variations
- **Consistent Branding**: All character references now use unified white Beluga design
- **Multi-language Support**: Character messages available in Korean/English/Japanese/Chinese
- **Responsive Design**: Character scales appropriately across mobile and desktop layouts
- **Global Accessibility**: Character appears consistently through floating buttons, empty states, and page illustrations

### 2025-01-12: Comprehensive Wishlist System Implementation
- **Complete Wishlist Page**: Created `/wishlist` route with authentication protection using ProtectedRoute component
- **Responsive Grid Layout**: Mobile-first design with 2-column mobile, 3-column tablet, 4-column desktop layout
- **Advanced Sorting System**: Multiple sort options (recent, oldest, price low/high, name) with dropdown selector
- **Interactive Features**: 
  - Add to cart functionality with toast notifications
  - Remove from wishlist with confirmation
  - Product card hover effects and transitions
  - Quantity-based cart management
- **Empty State Handling**: Beluga mascot character display for empty wishlist with call-to-action
- **Navigation Integration**: 
  - Added wishlist links to Header component user dropdown menu
  - Connected heart icon in header toolbar to wishlist page
  - Breadcrumb navigation with "Home" link
- **Loading State**: ProductCardSkeleton component for immediate visual feedback during data loading
- **Authentication Required**: Non-logged users automatically redirected to login page
- **Korean E-commerce Design**: Clean white cards, Korean typography, proper spacing, and mobile-optimized touch targets
- **Data Persistence**: LocalStorage-based wishlist management with sample data for demonstration
- **Multi-language Support**: Complete Korean/English/Japanese/Chinese localization

### 2025-01-12: Cart System Bug Fix - Product Detail to Cart Integration
- **Critical Bug Resolution**: Fixed cart add functionality where items weren't persisting to cart after successful toast notification
- **Root Cause**: `handleAddToCart` function in ProductDetail.tsx only showed toast notification without actually adding items to localStorage
- **Complete Implementation**: 
  - Added proper cart item object creation with all product options (size, base, packaging, uploaded files)
  - Integrated localStorage cart management with existing cart items check
  - Added quantity-based cart updates for duplicate items with same options
  - Implemented proper error handling with user-friendly error messages
  - Added cart update event dispatch to notify header and other components
- **Cart State Management**: 
  - Removed sample data initialization from Cart.tsx that was masking real cart functionality
  - Added real-time cart update listeners for immediate UI synchronization
  - Fixed empty cart state handling to properly display when no items exist
- **User Experience Improvements**:
  - Added proper validation for required options (size and base selection)
  - Set default packaging selection to "기본 포장" for better UX
  - Enhanced error messages to guide users on missing required selections
  - Toast notifications now accurately reflect actual cart operations
- **Technical Architecture**: Complete localStorage-based cart system with event-driven updates across components

### 2025-01-12: Inquiry Button Redesign - Character-Focused Unified Design
- **Character-Centered Layout**: Redesigned inquiry button with Beluga mascot as the main visual focus
- **Unified Button Design**: Single circular button containing both character and text in one cohesive element
- **Layout Structure**:
  - Beluga character positioned at top center as primary visual element
  - "문의" text label positioned directly below character within same button
  - Eliminated separate label/button structure for cleaner unified appearance
- **Enhanced Responsive Design**:
  - Button sizes: 20x20 (80px) on mobile, 24x24 (96px) on desktop
  - Character scales: 10x10 (40px) on mobile, 12x12 (48px) on desktop
  - Text remains readable at 12px across all screen sizes
- **Improved User Experience**:
  - Entire button area clickable for better touch targets
  - Character prominence draws immediate attention
  - Text provides clear functional context
  - Maintains blue gradient background and hover animations
- **Multi-language Support**: Korean "문의", English "Inquiry", Japanese "お問い合わせ", Chinese "咨询"
- **Accessibility**: Enhanced aria-label descriptions for screen reader compatibility