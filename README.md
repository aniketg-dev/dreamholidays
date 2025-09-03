# Dream Holidays - Travel Website

A modern, responsive travel website built with Next.js 15, featuring dynamic content management, beautiful UI components, and an admin panel for easy content updates.

## ✨ Features

### 🏠 **Enhanced Landing Page**
- **Hero Section**: Stunning carousel with animated backgrounds and embedded search
- **Featured Packages**: Beautifully designed package cards with hover effects
- **Statistics Section**: Company achievements and metrics
- **Testimonials**: Customer reviews and social proof
- **Newsletter Signup**: Email capture with modern styling
- **Why Choose Us**: Feature highlights with icons

### 🔍 **Search & Discovery**
- **Smart Search**: Destination search with traveler and date filters
- **Advanced Filters**: Price range, duration, rating, and category filters
- **Search Results**: Grid/list view toggle with sorting options
- **Dynamic Results**: Real-time filtering and search suggestions

### 📦 **Package Management**
- **Package Details**: Comprehensive package information pages
- **Image Gallery**: Multiple images with thumbnail navigation
- **Itinerary Display**: Day-by-day trip breakdown
- **Booking Form**: Modal booking form with validation
- **Pricing**: Clear pricing with discounts and inclusions

### 🛠️ **Admin Dashboard**
- **Package Management**: Add, edit, delete travel packages
- **Content Management**: Update site text, hero sections, company info
- **Media Management**: Upload and manage images
- **Analytics Dashboard**: Booking statistics and metrics
- **Real-time Updates**: Changes reflect immediately on the website

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: CSS keyframes and transitions
- **Interactive Elements**: Hover effects, loading states, modals
- **Accessibility**: Focus states, proper ARIA labels, keyboard navigation
- **Dark/Light Theme**: System preference detection

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dreamholidays.git
   cd dreamholidays
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production
```bash
npm run build
npm start
```

## 📂 **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── packages/[id]/     # Dynamic package pages
│   ├── search/            # Search results page
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Homepage
├── components/            # Reusable UI components
│   ├── EnhancedHero.jsx   # Hero section with carousel
│   ├── FeaturedPackages.jsx # Package grid display
│   ├── Header.jsx         # Navigation header
│   ├── EnhancedSearchDropdown.jsx # Search component
│   ├── Stats.jsx          # Statistics section
│   ├── Testimonials.jsx   # Customer reviews
│   └── NewsletterCTA.jsx  # Email signup
└── context/               # React Context for state
    └── ContentContext.js  # Content management state
```

## 🎯 **Key Pages**

### **Homepage** (`/`)
- Enhanced hero with animated backgrounds
- Search functionality with filters
- Featured packages showcase
- Company statistics and testimonials
- Newsletter signup and footer

### **Package Details** (`/packages/[id]`)
- Image gallery with thumbnail navigation
- Complete package information and pricing
- Day-by-day itinerary
- Booking modal with form validation
- Inclusions and exclusions list

### **Search Results** (`/search`)
- Advanced filtering sidebar
- Grid/list view toggle
- Sort by price, rating, duration
- Real-time filter application
- Pagination and loading states

### **Admin Dashboard** (`/admin`)
- Package CRUD operations
- Content management forms
- Media upload interface
- Analytics and metrics display
- Real-time preview capabilities

## 🔧 **Available Scripts**

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎨 **Customization**

### **Content Management**
All content is managed through the admin panel and stored in React Context with localStorage persistence:

- **Hero Section**: Title, subtitle, background images
- **Company Info**: Name, contact details, social links
- **Packages**: Full CRUD operations with images and details
- **Site Content**: Footer, navigation, static text

### **Styling**
Built with Tailwind CSS and custom animations:

- **Colors**: Blue and purple gradient theme
- **Typography**: Inter font family
- **Animations**: Fade-in, slide, hover effects
- **Responsive**: Mobile-first breakpoints

### **Adding New Features**

1. **New Components**: Add to `src/components/`
2. **New Pages**: Add to `src/app/` using App Router
3. **State Management**: Extend `ContentContext.js`
4. **Styling**: Use Tailwind classes or extend `globals.css`

## 🔒 **Admin Access**

The admin panel is accessible at `/admin` route. In a production environment, you would add:

- Authentication system
- Role-based access control
- Secure API endpoints
- Database integration

## 📱 **Mobile Responsiveness**

The website is fully responsive with:
- Mobile-first design approach
- Touch-friendly interactions
- Optimized images and performance
- Adaptive layouts for all screen sizes

## 🌟 **Future Enhancements**

- **Backend Integration**: Connect to a real database (MongoDB, PostgreSQL)
- **Payment Gateway**: Stripe/PayPal integration for bookings
- **User Authentication**: Customer accounts and booking history
- **Email System**: Automated booking confirmations
- **SEO Optimization**: Meta tags, sitemap, structured data
- **Performance**: Image optimization, lazy loading, caching

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Support**

For support or questions:
- Email: info@dreamholidays.com
- Phone: +1 (555) 123-4567
- GitHub Issues: [Create an issue](https://github.com/your-username/dreamholidays/issues)

---

**Dream Holidays** - Making your travel dreams come true! ✈️🌍
