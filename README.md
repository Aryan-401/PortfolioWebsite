# Portfolio Website

A modern, responsive portfolio website showcasing professional experience, projects, and skills. Built with clean HTML, CSS, and JavaScript with dynamic content loading.

## 🌟 Features

- **Responsive Design**: Optimized for all device sizes
- **Dynamic Content**: Content loaded from JSON configuration
- **Modern UI**: Clean, professional design with smooth animations
- **Easy Customization**: Simply edit `data.json` to update content
- **Blog Integration**: Links to external blog articles
- **Contact Section**: Multiple ways to get in touch
- **Performance Optimized**: Fast loading with minimal dependencies

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Fonts**: Google Fonts (Inter)
- **Build Tool**: Prepros 6
- **Hosting**: GitHub Pages compatible
- **Data**: JSON-based content management

## 🚀 Quick Start

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML/CSS/JavaScript

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aryan-401/PortfolioWebsite.git
   cd PortfolioWebsite
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser, or
   - Use a local server for better development experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using Live Server (VS Code extension)
   # Right-click index.html → "Open with Live Server"
   ```

3. **Access the website**
   - Open http://localhost:8000 in your browser

## 📁 Project Structure

```
PortfolioWebsite/
├── index.html          # Main HTML file
├── style.css           # Stylesheet with responsive design
├── script.js           # JavaScript for dynamic content
├── data.json          # Content configuration
├── prepros-6.config   # Build tool configuration
└── README.md          # This file
```

## ⚙️ Customization

### Updating Content

All content is managed through the `data.json` file. Edit this file to customize:

- **Personal Information**: Name, tagline, current role
- **About Section**: Bio and description
- **Experience**: Work history and roles
- **Projects**: Portfolio projects with links
- **Skills**: Technology stack and expertise
- **Blog Articles**: Links to blog posts
- **Contact Information**: Email, GitHub, LinkedIn

### Example `data.json` structure:
```json
{
  "siteName": "Your Name",
  "tagline": "Your Tagline",
  "currentRole": "Your Current Position",
  "about": "Your bio text...",
  "experience": [
    {
      "role": "Position Title",
      "company": "Company Name",
      "duration": "Date Range",
      "description": "Role description..."
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Project description...",
      "link": "https://github.com/username/repo"
    }
  ]
}
```

### Styling Customization

Edit `style.css` to modify:
- Color scheme and themes
- Typography and fonts
- Layout and spacing
- Responsive breakpoints
- Animations and transitions

## 🌐 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/PortfolioWebsite`

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: (none needed)
3. Set publish directory: `/`
4. Deploy automatically on git push

### Vercel
1. Import your GitHub repository
2. No build configuration needed
3. Deploy with zero configuration

## 🔧 Development

### Using Prepros
If you have Prepros 6 installed:
1. Open the project in Prepros
2. The configuration is already set in `prepros-6.config`
3. Prepros will handle live reload and optimization

### Browser Developer Tools
- Use F12 to open developer tools
- Test responsive design with device emulation
- Debug JavaScript in the console
- Inspect CSS styles and make live edits

## 📋 Features Overview

### Sections Included:
- **Hero**: Introduction with name and current role
- **About**: Professional summary and bio
- **Experience**: Work history with descriptions
- **Projects**: Portfolio showcase with links
- **Skills**: Technology stack and expertise
- **Blog**: Links to external articles
- **Contact**: Multiple contact methods

### Technical Features:
- Smooth scrolling navigation
- Responsive grid layouts
- Card-based design components
- External JSON data loading
- Cross-browser compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Aryan Garg**
- Email: aryan.raj.garg@gmail.com
- GitHub: [@Aryan-401](https://github.com/Aryan-401)
- LinkedIn: [aryan401](https://linkedin.com/in/aryan401)
- Blog: [aryan401.hashnode.dev](https://aryan401.hashnode.dev)

---

Built with ❤️ using modern web technologies. Feel free to use this template for your own portfolio!