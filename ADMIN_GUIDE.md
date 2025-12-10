# Charika Tours and Travels - Admin Panel Guide

## 🔐 Accessing the Admin Panel

### Login Credentials
- **URL**: `http://localhost:2208/admin/login`
- **Username**: `admin`
- **Password**: `admin123`

> ⚠️ **Important**: Change these credentials in production by modifying `/src/auth.js`

## 📋 Features

The admin panel provides a complete content management system (CMS) for your Charika Tours and Travels website. All changes are saved to `site-config.json` and appear immediately on the live site.

### 1. **Hero Slides Management** (`/admin/hero`)
- Add, edit, or delete homepage carousel slides
- Upload images to `/public/hero/` folder
- Configure title, subtitle, description, and gradient overlay
- Toggle visibility for each slide
- Reorder slides

### 2. **Packages Management** (`/admin/packages`)
- Create and manage travel packages
- Upload package images to `/public/packages/` folder
- Set pricing, duration, and capacity
- Add highlights, itinerary, and inclusions
- Mark packages as "Featured"
- Categorize packages (Luxury, Adventure, Budget, etc.)

### 3. **Gallery Management** (`/admin/gallery`)
- Upload destination images to `/public/gallery/` folder
- Add alt text for SEO
- Delete images
- Toggle gallery section visibility

### 4. **Testimonials Management** (`/admin/testimonials`)
- Add customer reviews
- Upload customer photos to `/public/testimonials/` folder
- Set ratings (1-5 stars)
- Edit or delete testimonials
- Toggle testimonials section visibility

### 5. **Statistics Management** (`/admin/stats`)
- Update company statistics:
  - Happy Customers
  - Destinations Served
  - Years of Experience
  - Tours Completed
- Toggle stats section visibility

### 6. **Social Media Management** (`/admin/social`)
- Update social media links (Facebook, Instagram, Twitter, YouTube)
- Configure section title and subtitle
- Toggle social media section visibility

### 7. **General Settings** (`/admin/settings`)
- **Company Information**:
  - Company name, email, phone numbers
  - Business address
- **Why Choose Us Section**:
  - Edit features and descriptions
  - Toggle section visibility
- **Contact Section**:
  - Configure contact form title and subtitle
  - Toggle contact form visibility

## 📁 File Structure

```
dreamholidays/
├── site-config.json          # Main configuration file (all content stored here)
├── public/
│   ├── hero/                 # Hero slide images
│   ├── packages/             # Package images
│   ├── gallery/              # Gallery images
│   ├── testimonials/         # Customer photos
│   └── logo/                 # Company logo
├── src/
│   ├── app/
│   │   ├── admin/           # Admin panel pages
│   │   │   ├── login/       # Login page
│   │   │   ├── hero/        # Hero management
│   │   │   ├── packages/    # Packages management
│   │   │   ├── gallery/     # Gallery management
│   │   │   ├── testimonials/ # Testimonials management
│   │   │   ├── stats/       # Stats management
│   │   │   ├── social/      # Social media management
│   │   │   └── settings/    # General settings
│   │   └── api/
│   │       ├── config/      # API for reading/writing site-config.json
│   │       └── upload/      # API for image uploads
│   ├── auth.js              # Authentication configuration
│   └── middleware.js        # Route protection
```

## 🖼️ Image Upload System

### How It Works
1. When you upload an image through the admin panel, it's automatically saved to the appropriate folder in `/public/`
2. The filename includes a timestamp to prevent conflicts
3. The image path is automatically saved to `site-config.json`
4. Images are immediately available on the live site

### Supported Folders
- `/public/hero/` - Hero slide backgrounds
- `/public/packages/` - Package images
- `/public/gallery/` - Destination gallery
- `/public/testimonials/` - Customer photos

### Image Guidelines
- **Format**: JPG, PNG, WebP recommended
- **Hero Images**: 1920x1080px or larger (landscape)
- **Package Images**: 800x600px or larger
- **Gallery Images**: 800x600px or larger
- **Testimonial Photos**: 400x400px (square, profile photos)

## 🔧 Configuration

### site-config.json Structure
All website content is stored in a single JSON file with the following sections:

```json
{
  "heroSlides": [...],      // Homepage carousel
  "company": {...},         // Company information
  "stats": {...},           // Statistics
  "testimonials": {...},    // Customer reviews
  "gallery": {...},         // Image gallery
  "whyChoose": {...},       // Why choose us features
  "contact": {...},         // Contact form settings
  "social": {...},          // Social media links
  "packages": [...]         // Travel packages
}
```

## 🚀 Getting Started

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Access the admin panel**:
   - Open `http://localhost:3000/admin/login`
   - Login with default credentials

3. **Make changes**:
   - Navigate to any section
   - Edit content or upload images
   - Click "Save" to apply changes

4. **View changes**:
   - Click "View Site →" in the admin navigation
   - Changes appear immediately

## 🔒 Security Notes

### Production Deployment
Before deploying to production:

1. **Change Admin Password**:
   - Edit `/src/auth.js`
   - Update the credentials in the `authorize` function
   - Use a strong password

2. **Set Environment Variables**:
   - Copy `env.example` to `.env.local`
   - Generate a secure `AUTH_SECRET`:
     ```bash
     openssl rand -base64 32
     ```
   - Update `NEXTAUTH_URL` to your production domain

3. **Secure the Config File**:
   - Consider moving `site-config.json` to a database in production
   - Add rate limiting to API routes
   - Implement proper user management

## 📝 Tips & Best Practices

1. **Regular Backups**: Backup `site-config.json` regularly
2. **Image Optimization**: Compress images before uploading for better performance
3. **SEO**: Always add descriptive alt text to images
4. **Testing**: Preview changes on the live site before announcing updates
5. **Content**: Keep descriptions concise and engaging

## 🐛 Troubleshooting

### Images Not Showing
- Check that the image path starts with `/` (e.g., `/hero/image.jpg`)
- Verify the image exists in the `/public/` folder
- Clear browser cache and refresh

### Changes Not Saving
- Check browser console for errors
- Verify `site-config.json` has write permissions
- Ensure the API routes are working (`/api/config`)

### Login Issues
- Verify credentials (username: `admin`, password: `admin123`)
- Check that NextAuth is properly configured
- Clear browser cookies and try again

## 📞 Support

For issues or questions:
- Check the main `README.md` file
- Review the documentation files in the project root
- Inspect browser console for error messages

---

**Version**: 1.0.0  
**Last Updated**: December 2024
