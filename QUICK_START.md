# Quick Start Guide - Charika Tours and Travels Admin Panel

## 🚀 Getting Started in 3 Steps

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Access the Admin Panel
Open your browser and go to:
```
http://localhost:2208/admin/login
```

### 3. Login with Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

## 📊 What You Can Manage

### ✅ All Content is Managed Through JSON
All your website content is stored in `site-config.json` and can be edited through the admin panel:

| Section | What You Can Do | Image Folder |
|---------|----------------|--------------|
| **Hero Slides** | Add/edit carousel slides | `/public/hero/` |
| **Packages** | Manage travel packages | `/public/packages/` |
| **Gallery** | Upload destination images | `/public/gallery/` |
| **Testimonials** | Add customer reviews | `/public/testimonials/` |
| **Stats** | Update company statistics | N/A |
| **Social Media** | Update social links | N/A |
| **Settings** | Company info, features | N/A |

## 🖼️ How Image Upload Works

1. **Click "Upload" button** in any section
2. **Select an image** from your computer
3. **Image is automatically**:
   - Saved to the appropriate folder in `/public/`
   - Added to `site-config.json` with the correct path
   - Displayed on your website immediately

### Example:
When you upload a hero image:
- File saved to: `/public/hero/1234567890_myimage.jpg`
- Path in JSON: `/hero/1234567890_myimage.jpg`
- Visible at: `http://localhost:2208/hero/1234567890_myimage.jpg`

## 📁 Project Structure

```
dreamholidays/
├── site-config.json          ← All website content (JSON)
├── public/
│   ├── hero/                 ← Hero slide images
│   ├── packages/             ← Package images
│   ├── gallery/              ← Gallery images
│   └── testimonials/         ← Customer photos
└── src/
    └── app/
        └── admin/            ← Admin panel pages
```

## 🔄 How It Works

```
Admin Panel → Edit Content → Save → Updates site-config.json → Live Site Updates
```

1. You edit content in the admin panel
2. Click "Save"
3. Changes are written to `site-config.json`
4. Your live website reads from `site-config.json`
5. Changes appear immediately!

## 🎯 Common Tasks

### Add a New Travel Package
1. Go to `/admin/packages`
2. Click "+ Add New Package"
3. Fill in details (name, price, location, etc.)
4. Upload package image
5. Click "Save Package"

### Add a Hero Slide
1. Go to `/admin/hero`
2. Click "+ Add New Slide"
3. Enter title, subtitle, description
4. Upload background image
5. Choose gradient color
6. Click "Save Slide"

### Update Company Info
1. Go to `/admin/settings`
2. Edit company details
3. Click "Save All Settings"

### Add Gallery Images
1. Go to `/admin/gallery`
2. Click "+ Add Image"
3. Select image file
4. Image uploads automatically
5. Add description/alt text

## 🔒 Security

### Default Login
- Username: `admin`
- Password: `admin123`

### ⚠️ Before Production
1. Change the password in `/src/auth.js`
2. Set up environment variables (see `env.example`)
3. Generate a secure `AUTH_SECRET`

## 📝 Key Files

| File | Purpose |
|------|---------|
| `site-config.json` | All website content |
| `src/auth.js` | Authentication config |
| `src/middleware.js` | Admin route protection |
| `src/app/api/config/route.js` | Read/write config |
| `src/app/api/upload/route.js` | Handle image uploads |

## 🎨 Admin Panel Features

✅ **Secure Login** - Protected admin routes  
✅ **CRUD Operations** - Create, Read, Update, Delete  
✅ **Image Upload** - Automatic folder organization  
✅ **Live Preview** - See changes immediately  
✅ **JSON-based** - Easy to backup and version control  
✅ **No Database** - Simple file-based storage  
✅ **Responsive UI** - Works on all devices  

## 🆘 Troubleshooting

### Can't Login?
- Check username: `admin`
- Check password: `admin123`
- Clear browser cookies

### Images Not Showing?
- Verify image path starts with `/`
- Check file exists in `/public/` folder
- Refresh browser cache

### Changes Not Saving?
- Check browser console for errors
- Verify `site-config.json` permissions
- Restart dev server

## 📚 More Information

- **Full Admin Guide**: See `ADMIN_GUIDE.md`
- **Main README**: See `README.md`
- **CMS Documentation**: See `CMS_DOCUMENTATION.md`

## 🎉 You're Ready!

Your admin panel is fully functional. Start managing your Charika Tours and Travels website content with ease!

**Admin URL**: http://localhost:2208/admin/login  
**Live Site**: http://localhost:2208

---

**Need Help?** Check the documentation files or inspect browser console for errors.
