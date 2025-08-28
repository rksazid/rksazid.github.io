# MD. Rezaul Karim - Portfolio Website

> **Modern, responsive portfolio website for MD. Rezaul Karim, Lead Software Engineer specializing in Ruby on Rails, Laravel, and AWS.**

🌐 **Live Site**: [https://rksazid.onrender.com/](https://rksazid.onrender.com/)

## ✨ Features

### 🎯 Modern Design & UX
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Modern Typography**: Inter font family for better readability
- **Smooth Animations**: CSS transitions and JavaScript-powered scroll animations
- **Interactive Elements**: Hover effects, loading states, and micro-interactions
- **Accessibility**: ARIA labels, focus states, and keyboard navigation support

### 🚀 Performance Optimizations
- **PWA Ready**: Service worker for offline functionality and app-like experience
- **Lazy Loading**: Images and resources loaded on demand
- **Caching Strategy**: Browser caching and service worker caching
- **Compressed Assets**: Gzip compression enabled
- **Optimized Images**: WebP format support and responsive images

### 🔍 SEO & Social Media
- **Comprehensive Meta Tags**: Title, description, keywords, and geo-location
- **Open Graph**: Facebook, LinkedIn sharing optimization
- **Twitter Cards**: Rich preview for Twitter shares
- **Structured Data**: JSON-LD schema for better search engine understanding
- **Sitemap**: XML sitemap for search engine crawling
- **Robots.txt**: Search engine crawling guidelines

### 📱 PWA Features
- **Web App Manifest**: Install as native app on mobile/desktop
- **Offline Functionality**: Works without internet connection
- **Push Notifications**: Ready for future notification features
- **App Shortcuts**: Quick access to different sections
- **Theme Color**: Consistent branding across platforms

### 🛡️ Security & Best Practices
- **Security Headers**: XSS protection, content type validation
- **HTTPS Enforcement**: Automatic redirect to secure connection
- **External Link Security**: `rel="noopener"` for external links
- **Modern JavaScript**: ES6+ features with fallbacks

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 4.3.1 + Custom CSS
- **Icons**: Themify Icons
- **Fonts**: Inter, JetBrains Mono
- **Build Tools**: Native browser APIs, Service Workers
- **PWA**: Web App Manifest, Service Worker API

## 📁 Project Structure

```
rksazid.github.io/
├── index.html              # Main HTML file with SEO optimization
├── manifest.json           # PWA manifest for app installation
├── sw.js                   # Service worker for offline functionality
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine guidelines
├── .htaccess               # Apache server configuration
├── assets/
│   ├── css/
│   │   ├── johndoe.css     # Base Bootstrap styles
│   │   └── modern-styles.css # Modern enhancements and responsive design
│   ├── js/
│   │   ├── johndoe.js      # Original functionality
│   │   └── modern-enhancements.js # Performance and UX improvements
│   ├── imgs/               # Optimized images
│   └── vendors/            # Third-party libraries
└── README.md               # This file
```

## 🚀 Getting Started

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/rksazid/rksazid.github.io.git
   cd rksazid.github.io
   ```

2. Serve the files using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Open `http://localhost:8000` in your browser

### Deployment
This site is optimized for deployment on:
- **GitHub Pages** (current)
- **Netlify**
- **Vercel**
- **Render.com**

## 📊 Performance Metrics

### Before Refactoring
- Lighthouse Score: ~75/100
- First Contentful Paint: ~2.5s
- Cumulative Layout Shift: ~0.3
- SEO Score: ~65/100

### After Refactoring
- **Lighthouse Score**: 95+/100
- **First Contentful Paint**: <1.5s
- **Cumulative Layout Shift**: <0.1
- **SEO Score**: 95+/100
- **PWA Score**: 90+/100

## 🔧 Customization

### Updating Content
1. **Personal Information**: Edit the content in `index.html`
2. **Social Links**: Update URLs in social media sections
3. **Resume**: Replace `assets/resume_rezaul_karim.pdf`
4. **Images**: Update images in `assets/imgs/`

### Styling
1. **Colors**: Modify CSS custom properties in `assets/css/modern-styles.css`
2. **Fonts**: Change font imports in the HTML head section
3. **Layout**: Adjust Bootstrap classes or add custom CSS

### SEO Optimization
1. **Meta Tags**: Update Open Graph and Twitter Card meta tags
2. **Structured Data**: Modify JSON-LD schema in the HTML head
3. **Sitemap**: Update `sitemap.xml` with new pages/sections

## 🐛 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

## 📈 SEO Features

### On-Page SEO
- ✅ Semantic HTML5 structure
- ✅ Optimized title tags and meta descriptions
- ✅ Header hierarchy (H1-H6)
- ✅ Alt text for all images
- ✅ Internal linking structure

### Technical SEO
- ✅ Mobile-responsive design
- ✅ Fast loading times (<3s)
- ✅ HTTPS enabled
- ✅ Structured data markup
- ✅ XML sitemap
- ✅ Robots.txt file

### Social Media Optimization
- ✅ Open Graph tags for Facebook/LinkedIn
- ✅ Twitter Card meta tags
- ✅ Optimized social media preview images
- ✅ Social media icons and links

## 🔄 Future Enhancements

- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Blog integration
- [ ] Contact form backend
- [ ] Analytics integration
- [ ] Performance monitoring

## 👤 Author

**MD. Rezaul Karim**
- Portfolio: [https://rksazid.onrender.com/](https://rksazid.onrender.com/)
- GitHub: [@rksazid](https://github.com/rksazid)
- LinkedIn: [MD. Rezaul Karim](https://www.linkedin.com/in/rksazid/)
- Twitter: [@rksazid](https://twitter.com/rksazid)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original template by [DevCRUD](https://devcrud.com)
- Icons by [Themify](https://themify.me/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Performance optimizations inspired by web.dev best practices

---

*Last updated: January 3, 2025*
