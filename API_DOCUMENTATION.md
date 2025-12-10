# API Documentation - Charika Tours and Travels CMS

## Config API (`/api/config`)

Complete CRUD operations for managing `site-config.json`.

### 📖 GET - Read Config
Retrieve the entire configuration file.

**Endpoint**: `GET /api/config`

**Response**:
```json
{
  "success": true,
  "data": {
    "heroSlides": [...],
    "packages": [...],
    "gallery": {...},
    ...
  }
}
```

**Example**:
```javascript
const response = await fetch('/api/config');
const { data } = await response.json();
console.log(data.heroSlides);
```

---

### ✏️ POST - Update Entire Config
Replace the entire configuration file.

**Endpoint**: `POST /api/config`

**Request Body**:
```json
{
  "data": {
    "heroSlides": [...],
    "packages": [...],
    ...
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Config file updated successfully",
  "data": {...}
}
```

**Example**:
```javascript
const response = await fetch('/api/config', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ data: newConfig })
});
```

---

### 🔄 PUT - Replace Config
Complete replacement of the configuration file (same as POST).

**Endpoint**: `PUT /api/config`

**Request Body**:
```json
{
  "data": {
    "heroSlides": [...],
    "packages": [...],
    ...
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Config file replaced successfully",
  "data": {...}
}
```

---

### 🔧 PATCH - Update Specific Section
Update only a specific section of the config (recommended for performance).

**Endpoint**: `PATCH /api/config`

**Request Body**:
```json
{
  "section": "heroSlides",
  "data": [
    {
      "id": 1,
      "title": "Updated Title",
      ...
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Section 'heroSlides' updated successfully",
  "data": {...}
}
```

**Example**:
```javascript
// Update only hero slides
const response = await fetch('/api/config', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    section: 'heroSlides',
    data: updatedSlides
  })
});
```

**Available Sections**:
- `heroSlides`
- `packages`
- `gallery`
- `testimonials`
- `stats`
- `social`
- `whyChoose`
- `contact`
- `company`

---

### 🗑️ DELETE - Remove Section
Delete a specific section from the config.

**Endpoint**: `DELETE /api/config`

**Request Body**:
```json
{
  "section": "heroSlides"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Section 'heroSlides' deleted successfully",
  "data": {...}
}
```

**Example**:
```javascript
const response = await fetch('/api/config', {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ section: 'heroSlides' })
});
```

---

## Upload API (`/api/upload`)

Handle image uploads to the public directory.

### 📤 POST - Upload Image

**Endpoint**: `POST /api/upload`

**Request**: FormData with:
- `image`: File object
- `folder`: Target folder name (optional, default: 'uploads')

**Response**:
```json
{
  "success": true,
  "url": "/hero/1733760000000_image.jpg",
  "path": "/hero/1733760000000_image.jpg",
  "filename": "1733760000000_image.jpg"
}
```

**Example**:
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('folder', 'hero');

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const { url } = await response.json();
console.log('Image uploaded to:', url);
```

**Supported Folders**:
- `hero` - Hero slide backgrounds
- `packages` - Package images
- `gallery` - Gallery images
- `testimonials` - Customer photos
- `uploads` - General uploads (default)

---

## Usage Examples

### Example 1: Add New Hero Slide
```javascript
// 1. Get current config
const res = await fetch('/api/config');
const { data: config } = await res.json();

// 2. Add new slide
const newSlide = {
  id: Math.max(...config.heroSlides.map(s => s.id)) + 1,
  title: "New Destination",
  subtitle: "Amazing Place",
  description: "Visit this amazing place",
  backgroundImage: "/hero/new-image.jpg",
  gradient: "from-black/80 to-blue-900/60",
  visible: true,
  order: config.heroSlides.length + 1
};

config.heroSlides.push(newSlide);

// 3. Update using PATCH (recommended)
await fetch('/api/config', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    section: 'heroSlides',
    data: config.heroSlides
  })
});
```

### Example 2: Upload Image and Update Slide
```javascript
// 1. Upload image
const formData = new FormData();
formData.append('image', file);
formData.append('folder', 'hero');

const uploadRes = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const { url: imageUrl } = await uploadRes.json();

// 2. Update slide with new image
const configRes = await fetch('/api/config');
const { data: config } = await configRes.json();

const updatedSlides = config.heroSlides.map(slide =>
  slide.id === slideId 
    ? { ...slide, backgroundImage: imageUrl }
    : slide
);

// 3. Save changes
await fetch('/api/config', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    section: 'heroSlides',
    data: updatedSlides
  })
});
```

### Example 3: Update Company Stats
```javascript
const newStats = {
  happyCustomers: 15000,
  destinationsServed: 200,
  yearsExperience: 20,
  toursCompleted: 8000,
  visible: true
};

await fetch('/api/config', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    section: 'stats',
    data: newStats
  })
});
```

---

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "status": 400/404/500
}
```

**Common Errors**:
- `400` - Bad Request (missing required fields)
- `404` - Not Found (config file or section doesn't exist)
- `500` - Server Error (file system error)

**Example Error Handling**:
```javascript
try {
  const response = await fetch('/api/config', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section: 'heroSlides', data: slides })
  });
  
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error);
  }
  
  console.log('Success:', result.message);
} catch (error) {
  console.error('Failed:', error.message);
  alert('Failed to save: ' + error.message);
}
```

---

## Best Practices

1. **Use PATCH for Section Updates**: More efficient than POST/PUT
   ```javascript
   // ✅ Good - Only updates one section
   fetch('/api/config', {
     method: 'PATCH',
     body: JSON.stringify({ section: 'heroSlides', data: slides })
   });
   
   // ❌ Avoid - Replaces entire config
   fetch('/api/config', {
     method: 'POST',
     body: JSON.stringify({ data: entireConfig })
   });
   ```

2. **Handle Errors Gracefully**: Always check for success
   ```javascript
   const result = await response.json();
   if (!result.success) {
     throw new Error(result.error);
   }
   ```

3. **Refresh After Updates**: Fetch latest data after saving
   ```javascript
   await fetch('/api/config', { method: 'PATCH', ... });
   const latest = await fetch('/api/config');
   ```

4. **Use Timestamps in Filenames**: Prevents caching issues
   - Upload API automatically adds timestamps
   - Example: `1733760000000_image.jpg`

---

## File Structure

```
site-config.json          # Main configuration file
├── heroSlides[]          # Homepage carousel
├── packages[]            # Travel packages
├── gallery{}             # Image gallery
├── testimonials{}        # Customer reviews
├── stats{}               # Company statistics
├── social{}              # Social media
├── whyChoose{}           # Features section
├── contact{}             # Contact form
└── company{}             # Company info
```

---

**Version**: 1.0.0  
**Last Updated**: December 2024
