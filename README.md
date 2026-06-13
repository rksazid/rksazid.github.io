# MD. Rezaul Karim - Portfolio Website

> **Modern, responsive portfolio website for MD. Rezaul Karim, Lead Software Engineer specializing in Ruby on Rails, Laravel, and AWS.**

🌐 **Live Site**: [https://rksazid.onrender.com/](https://rksazid.onrender.com/)

## ✨ Features

### 🎯 Modern Design & UX
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Distinctive Typography**: Bricolage Grotesque + IBM Plex Sans + JetBrains Mono
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

- **Frontend**: Hand-written HTML5, CSS3, vanilla JavaScript (ES6+) — no framework, no jQuery
- **Styling**: Custom CSS design system (CSS variables, Grid, Flexbox, `clamp()` fluid type)
- **Icons**: Inline SVG (no icon webfont dependency)
- **Fonts**: Bricolage Grotesque (display), IBM Plex Sans (body), JetBrains Mono (code/labels)
- **Contact form**: Formspree, with a graceful `mailto:` fallback
- **PWA**: Web App Manifest + Service Worker (network-first for pages, cache-first for assets)

## 📁 Project Structure

```
rksazid.github.io/
├── index.html              # Single-page portfolio (semantic, SEO + JSON-LD)
├── manifest.json           # PWA manifest for app installation
├── sw.js                   # Service worker (network-first HTML, cache-first assets)
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine guidelines
├── .htaccess               # Apache server configuration (onrender deploy)
├── assets/
│   ├── css/
│   │   └── styles.css      # Full design system + responsive styles
│   ├── js/
│   │   └── main.js         # Nav, scroll-reveal, project filter, contact form
│   ├── imgs/               # Images (avatar, etc.)
│   ├── resume_rezaul_karim.pdf
│   └── vendors/            # Legacy libraries (no longer referenced — safe to remove)
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
1. **Colors**: Edit the CSS custom properties in the `:root` block of `assets/css/styles.css`
2. **Fonts**: Change the Google Fonts `<link>` in the HTML head and the `--font-*` variables
3. **Layout**: Adjust the section markup in `index.html` and the component styles in `styles.css`

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

- [x] Contact form backend (Formspree)
- [ ] Multi-language support
- [ ] Blog integration
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

- Fonts by [Google Fonts](https://fonts.google.com/) — Bricolage Grotesque, IBM Plex Sans, JetBrains Mono
- Built from scratch (no template) with a custom CSS design system

---

*Last updated: June 13, 2026*
