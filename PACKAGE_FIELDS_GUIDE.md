# Package Fields Guide

## Where to Fill Package Details

All package information is stored in `site-config.json` under the `packages` array. You can edit it in two ways:

### ✅ Option 1: Admin Panel (Recommended for most fields)
Go to **http://localhost:2208/admin/packages** → Click "Edit" on any package

### ✅ Option 2: Direct JSON Edit (For itinerary)
Edit `site-config.json` directly for complex fields like itinerary

---

## 📋 Package Fields Reference

### Basic Information (Admin Panel ✅)
```json
{
  "id": 1,                          // Unique ID
  "name": "Santorini Paradise",     // Package name
  "location": "Santorini, Greece",  // Destination
  "category": "Luxury",             // Luxury/Adventure/Budget/Family/Romantic
  "status": "active"                // active/inactive
}
```

### Pricing (Admin Panel ✅)
```json
{
  "price": 1299,                    // Current price in ₹
  "originalPrice": 1599,            // Original price (for discount display)
  "duration": "7 Days / 6 Nights"   // Trip duration
}
```

### Ratings & Capacity (Admin Panel ✅)
```json
{
  "rating": 4.9,                    // Star rating (1-5)
  "reviews": 124,                   // Number of reviews
  "maxPeople": 8                    // Maximum group size
}
```

### Images (Admin Panel ✅)
```json
{
  "image": "/gallery/image1.jpeg",  // Main thumbnail image
  "images": [                        // Gallery images (shown on details page)
    "/gallery/image1.jpeg",
    "/gallery/image2.jpg",
    "/gallery/image3.jpg"
  ]
}
```

**How to add images:**
1. Click "Upload" button in admin panel
2. Select image file
3. Image automatically saves to `/public/packages/` folder
4. Path is added to the field

### Description (Admin Panel ✅)
```json
{
  "description": "Experience the breathtaking beauty of Santorini..."
}
```
**Shown on:** Package card, details page header

### Highlights (Admin Panel ✅)
```json
{
  "highlights": [
    "Luxury oceanview accommodation",
    "Private sunset cruise",
    "Wine tasting at local vineyards",
    "Guided tour of Oia village",
    "Traditional Greek cooking class",
    "Airport transfers included"
  ]
}
```
**Shown on:** Details page "Package Highlights" section

**How to edit in admin:**
- One highlight per line
- Press Enter for new highlight
- Empty lines are ignored

### What's Included (Admin Panel ✅)
```json
{
  "included": [
    "Accommodation",
    "Meals",
    "Transportation",
    "Tours",
    "Activities"
  ]
}
```
**Shown on:** Details page sidebar with ✓ checkmarks

**How to edit in admin:**
- One item per line
- Press Enter for new item

### Not Included (Admin Panel ✅)
```json
{
  "notIncluded": [
    "International flights",
    "Travel insurance",
    "Personal expenses"
  ]
}
```
**Shown on:** Details page sidebar with ✗ marks

**How to edit in admin:**
- One item per line
- Press Enter for new item

### Day-by-Day Itinerary (JSON Edit Only ⚠️)
```json
{
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & Welcome",
      "description": "Airport pickup, hotel check-in, welcome dinner"
    },
    {
      "day": 2,
      "title": "Oia Exploration",
      "description": "Guided tour of Oia, sunset viewing, local shopping"
    },
    {
      "day": 3,
      "title": "Wine & Culture",
      "description": "Vineyard tours, wine tasting, cultural experiences"
    }
  ]
}
```
**Shown on:** Details page "Day by Day Itinerary" section

**How to edit:**
1. Open `site-config.json`
2. Find your package
3. Edit the `itinerary` array
4. Each day needs: `day` (number), `title`, `description`

### Featured Flag (Admin Panel ✅)
```json
{
  "featured": true  // Shows "Featured" badge on package card
}
```

---

## 🎯 Complete Package Example

```json
{
  "id": 1,
  "name": "Santorini Paradise",
  "location": "Santorini, Greece",
  "price": 1299,
  "originalPrice": 1599,
  "duration": "7 Days / 6 Nights",
  "rating": 4.9,
  "reviews": 124,
  "maxPeople": 8,
  "image": "/gallery/image1.jpeg",
  "images": [
    "/gallery/image1.jpeg",
    "/gallery/image2.jpg",
    "/gallery/image3.jpg"
  ],
  "description": "Experience the breathtaking beauty of Santorini with its iconic white buildings, blue domes, and stunning sunsets over the Aegean Sea.",
  "highlights": [
    "Luxury oceanview accommodation",
    "Private sunset cruise",
    "Wine tasting at local vineyards",
    "Guided tour of Oia village",
    "Traditional Greek cooking class",
    "Airport transfers included"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & Welcome",
      "description": "Airport pickup, hotel check-in, welcome dinner"
    },
    {
      "day": 2,
      "title": "Oia Exploration",
      "description": "Guided tour of Oia, sunset viewing, local shopping"
    }
  ],
  "included": [
    "Accommodation",
    "Meals",
    "Transportation",
    "Tours",
    "Activities"
  ],
  "notIncluded": [
    "International flights",
    "Travel insurance",
    "Personal expenses"
  ],
  "featured": true,
  "category": "Luxury",
  "status": "active"
}
```

---

## 📍 Where Each Field Appears

### Package Card (Homepage/Packages List)
- `image` - Main image
- `name` - Package title
- `location` - Location with 📍 icon
- `description` - Short description
- `price` - Current price
- `duration` - Trip duration badge
- `rating` - Star rating
- `maxPeople` - Max capacity
- `featured` - "Featured" badge

### Package Details Page

**Header Section:**
- `name` - Page title
- `id` - Package ID badge
- `rating` + `reviews` - Star rating with review count
- `location` - Location with 📍 icon
- `maxPeople` - Max capacity
- `description` - Full description

**Image Gallery:**
- `images[]` - All images in carousel

**Highlights Section:**
- `highlights[]` - Bulleted list with ✓ icons

**Itinerary Section:**
- `itinerary[]` - Day-by-day breakdown

**Sidebar:**
- `price` - Current price in ₹
- `originalPrice` - Crossed-out price
- Savings calculation
- `included[]` - What's included (✓)
- `notIncluded[]` - Not included (✗)

---

## 🔧 How to Edit

### Using Admin Panel:
1. Go to `http://localhost:2208/admin/packages`
2. Click "Edit" on the package
3. Fill in the form fields
4. Click "Save Package"

### Using JSON File:
1. Open `site-config.json`
2. Find the `packages` array
3. Edit the package object
4. Save the file
5. Refresh your browser

---

## 💡 Tips

1. **Images**: Always upload through admin panel for correct paths
2. **Highlights**: Keep them short and benefit-focused
3. **Itinerary**: Be specific about activities for each day
4. **Pricing**: Use realistic Indian Rupee amounts
5. **Description**: Write engaging, SEO-friendly content
6. **Included/Not Included**: Be clear to avoid customer confusion

---

**Need Help?** Check `ADMIN_GUIDE.md` for more details on using the admin panel.
