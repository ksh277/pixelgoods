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