# Hero Slides Management System

This document describes the new hero slides management system implemented for the Charika Tours and Travels website.

## Features

### 1. Dynamic Hero Carousel
- Multiple slides with individual content and background images
- Automatic slideshow with manual navigation
- Responsive design with touch/swipe support
- Individual slide visibility control

### 2. Admin Panel Management
- Add new hero slides with form validation
- Edit existing slides with live preview
- Delete slides with confirmation
- Toggle slide visibility (show/hide)
- Drag and drop reordering
- Image upload functionality

### 3. Content Management
- Title, subtitle, and description for each slide
- Background image upload or URL input
- Gradient overlay selection
- Order management
- Visibility controls

## Usage

### Access Admin Panel
1. Navigate to `/admin` in your browser
2. Click on the "Hero Section" tab
3. You'll see the Hero Slides Management interface

### Adding a New Slide
1. Click the "Add New Slide" button
2. Fill in the slide details:
   - **Title**: Main heading for the slide
   - **Subtitle**: Secondary heading or location
   - **Description**: Detailed text content
   - **Background Image**: Upload file or enter URL
   - **Gradient Overlay**: Choose from predefined gradients
   - **Visibility**: Toggle to show/hide on website
3. Click "Add Slide" to save

### Editing an Existing Slide
1. Click the edit (✏️) button on any slide card
2. Modify the slide content in the popup form
3. Click "Update Slide" to save changes

### Managing Slide Visibility
- Click the eye (👁️) or hidden (🙈) button to toggle visibility
- Hidden slides won't appear on the frontend but remain in admin

### Reordering Slides
- Drag and drop slide cards to reorder them
- The order determines the sequence in the carousel

### Deleting Slides
1. Click the delete (🗑️) button on any slide card
2. Confirm the deletion in the popup dialog

## File Structure

### Frontend Components
- `src/components/EnhancedHero.jsx` - Hero carousel component
- `src/app/admin/page.jsx` - Admin panel with hero management
- `src/context/ContentContext.js` - State management for content

### API Endpoints
- `src/app/api/upload/route.js` - Image upload handler

### Image Storage
- `public/hero/uploads/` - Directory for uploaded hero images
- `public/hero/` - Default hero images

## Technical Details

### Data Structure
Each hero slide contains:
```javascript
{
  id: Number,           // Unique identifier
  title: String,        // Main heading
  subtitle: String,     // Secondary heading
  description: String,  // Content description
  backgroundImage: String, // Image URL/path
  gradient: String,     // CSS gradient class
  visible: Boolean,     // Visibility flag
  order: Number        // Display order
}
```

### State Management
- Uses React Context for global state management
- Persists data to localStorage
- Provides hooks for CRUD operations

### Image Upload
- Supports common image formats (JPG, PNG, WebP)
- Automatic file naming with timestamps
- Server-side file validation
- Fallback to URL input

## Styling

### CSS Classes
- Custom styles in `src/app/admin/admin-styles.css`
- Responsive design with Tailwind CSS
- Smooth transitions and hover effects
- Drag and drop visual feedback

### Responsive Design
- Mobile-friendly interface
- Touch support for carousel navigation
- Adaptive layouts for different screen sizes

## Future Enhancements

### Planned Features
1. Advanced image editing (crop, filters)
2. Video background support
3. Animation options
4. A/B testing capabilities
5. Analytics integration
6. Bulk operations
7. Import/export functionality

### Performance Optimizations
1. Lazy loading for images
2. Image compression
3. CDN integration
4. Caching strategies

## Troubleshooting

### Common Issues
1. **Images not loading**: Check file paths and permissions
2. **Upload failures**: Verify server has write permissions
3. **Slides not showing**: Check visibility settings
4. **Order not saving**: Ensure drag and drop completed properly

### Browser Support
- Modern browsers with ES6+ support
- Tested on Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Considerations

### File Upload Security
- File type validation
- Size limits enforced
- Secure file naming
- Directory traversal protection

### Data Validation
- Input sanitization
- XSS prevention
- CSRF protection
- Access control

## Maintenance

### Regular Tasks
1. Monitor upload directory size
2. Clean up unused images
3. Backup slide configurations
4. Update dependencies
5. Review analytics data

### Backup Strategy
- Export slide data regularly
- Backup uploaded images
- Version control for code changes
- Database snapshots if applicable

## Support

For technical support or feature requests, please contact the development team or create an issue in the project repository.
