# Charika Tours and Travels CMS - Content Management System

## Overview
This project implements a simple yet powerful Content Management System (CMS) for the Charika Tours and Travels website. The system allows you to manage all website content through an admin panel with persistent file-based storage.

## Project Structure

### Core Components

1. **Main Page (`src/app/page.js`)** - Divided into sections:
   - Hero Slides
   - Featured Packages  
   - Gallery
   - Testimonials
   - Statistics
   - Social Media
   - Why Choose Us
   - Contact Form

2. **Config File (`site-config.json`)** - Contains all content data structure
   - JSON format for easy editing
   - Automatically updated when changes are made in admin panel
   - Persistent across sessions and deployments

3. **Admin Panel (`src/app/admin/page.jsx`)** - Section-wise content editing:
   - Content Overview
   - Hero Section Management
   - Package Management
   - Statistics
   - Testimonials
   - Gallery
   - Why Choose Us Features
   - Contact Information
   - Social Media Links
   - Company Information

4. **Content Context (`src/context/ContentContext.js`)** - Data management layer:
   - Loads content from `site-config.json` on startup
   - Provides functions for CRUD operations
   - Auto-saves changes to config file
   - Fallback to localStorage for backup

### API Endpoints

- **`/api/config`** - Content configuration management
  - `GET` - Load current site configuration
  - `POST` - Save updated site configuration

- **`/api/upload`** - File upload with organized folders
  - Supports section-specific folders: `hero/`, `gallery/`, `testimonials/`, `packages/`
  - Automatic timestamp prefixing to avoid conflicts
  - Returns public URL for uploaded files

## Image Organization

Images are automatically organized in folders:
```
public/
├── hero/           # Hero section background images
├── gallery/        # Gallery images
├── testimonials/   # Testimonial profile pictures
├── packages/       # Package cover images
└── logo/          # Brand logos
```

## Admin Panel Features

### Content Management
- **Real-time editing** - Changes are visible immediately
- **Section visibility control** - Show/hide entire sections
- **Drag & drop reordering** - For hero slides and other items
- **Rich content editing** - Text, images, and structured data

### Package Management
- Add/Edit/Delete travel packages
- Set featured packages
- Upload multiple images per package
- Detailed itinerary management
- Pricing and booking information

### Hero Slides
- Multiple hero slides with custom backgrounds
- Gradient overlays
- Visibility and ordering controls
- Image upload and management

### Testimonials & Gallery
- Add customer testimonials with photos
- Gallery image management
- Drag & drop upload interface

## How It Works

1. **Content Loading**: On app startup, `ContentContext.js` loads content from `site-config.json`
2. **Admin Editing**: Admin panel provides forms to edit any section content
3. **Auto-save**: Changes are automatically saved to `site-config.json` with 1-second debouncing
4. **Persistence**: All changes persist across page refreshes, server restarts, and deployments
5. **Fallback**: localStorage backup ensures data isn't lost if file operations fail

## File Persistence

Unlike traditional localStorage-based systems, this CMS uses file-based persistence:

- ✅ **Permanent changes** - Survives server restarts
- ✅ **Cross-device sync** - Same content on all devices  
- ✅ **Deployment persistence** - Content maintained across deployments
- ✅ **Backup friendly** - Content stored in version-controllable JSON file
- ✅ **Easy migration** - Simple file copy for content transfer

## Usage

1. **Development**: `npm run dev`
2. **Access Admin**: Visit `/admin` 
3. **Edit Content**: Click on any section tab to edit content
4. **Upload Images**: Use the upload buttons to add images to organized folders
5. **Publish**: Changes are automatically saved and visible on the main site

## Benefits

- **Simple to manage** - Intuitive admin interface
- **Organized structure** - Section-wise content management
- **Persistent data** - No data loss on refresh/restart
- **Scalable** - Easy to add new sections or content types
- **Developer friendly** - Clean separation of content and code

## Technical Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Storage**: File-based JSON configuration
- **Image Upload**: Custom API with folder organization
- **State Management**: React Context with persistent storage
