fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("site-name").textContent = data.siteName;
    document.getElementById("tagline").textContent = data.tagline;
    document.getElementById("current-role").textContent = data.currentRole;

    // Navbar
    const navbar = document.getElementById("navbar");
    data.navbar.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.href}">${item.label}</a>`;
      navbar.appendChild(li);
    });

    // Headings
    Object.entries(data.headings).forEach(([id, text]) => {
      const headingEl = document.getElementById(`${id}-heading`);
      if (headingEl) headingEl.textContent = text;
    });

    function applyRandomSkillColors() {
      const skills = document.querySelectorAll('.skills-grid li');
      const isDarkMode = document.body.classList.contains('dark-mode');
      const rawColors = getComputedStyle(document.body)
        .getPropertyValue(isDarkMode ? '--tag-colors-dark' : '--tag-colors-light')
        .split(',');

      skills.forEach(tag => {
        const color = rawColors[Math.floor(Math.random() * rawColors.length)].trim();
        tag.style.backgroundColor = color;
        tag.style.color = getContrastYIQ(color);
      });

      function getContrastYIQ(color) {
        const rgb = getRGB(color);
        const yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
        return yiq >= 128 ? '#1f2937' : '#ffffff';
      }

      function getRGB(color) {
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.fillStyle = color;
        const computed = ctx.fillStyle;
        const hex = computed.startsWith('#') ? computed : '#000000';
        const bigint = parseInt(hex.slice(1), 16);
        return {
          r: (bigint >> 16) & 255,
          g: (bigint >> 8) & 255,
          b: bigint & 255
        };
      }
    }

    // About
    document.getElementById("about-text").textContent = data.about;

    // Experience
    const expList = document.getElementById("experience-list");
    data.experience.forEach(exp => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        ${exp.logo ? `<img src="${exp.logo}" alt="${exp.company} logo" class="exp-logo">` : ""}
        <h4>${exp.role} – ${exp.company}</h4>
        <p><strong>${exp.duration}</strong></p>
        <p>${exp.description}</p>
      `;
      expList.appendChild(div);
    });

    // Projects
    const projList = document.getElementById("project-list");
    if (projList && data.projects) {
      data.projects.forEach(proj => {
        const div = document.createElement("div");
        div.className = "card project-card";
        div.innerHTML = `
          <h4>${proj.name}</h4>
          <p>${proj.description}</p>
          <a href="${proj.link}" target="_blank" class="project-button">View Project</a>
        `;
        projList.appendChild(div);
      });
    }

    // Skills
    const skillsList = document.getElementById("skills-list");
    data.skills.forEach(skill => {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsList.appendChild(li);
    });

    applyRandomSkillColors(); // Call after skills are added

    // Blogs
    const blogSection = document.getElementById("blog-list");
    data.blogs.forEach(article => {
      const div = document.createElement("div");
      div.className = "blog-card";
      div.innerHTML = `
        <h4>${article.title}</h4>
        <a href="${article.link}" target="_blank">Read Article</a>
      `;
      blogSection.appendChild(div);
    });

    // Contact
    const contactList = document.getElementById("contact-list");
    Object.entries(data.contact).forEach(([key, value]) => {
      if (key.endsWith("Label")) return;

      const labelKey = key + "Label";
      const label = data.contact[labelKey] || key;

      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h4>${label}</h4>
        <a href="${key === 'email' ? `mailto:${value}` : value}" target="_blank">${value}</a>
      `;
      contactList.appendChild(div);
    });

    // Footer
    document.getElementById("footer-text").textContent = data.footer;

    // THEME TOGGLE
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const emojiSpan = themeToggle.querySelector('.emoji');

    function setTheme(theme) {
      if (theme === 'dark') {
        body.classList.add('dark-mode');
        emojiSpan.textContent = '💡';
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-mode');
        emojiSpan.textContent = '🌙';
        localStorage.setItem('theme', 'light');
      }

      // Reapply color to tech stack after theme changes
      setTimeout(applyRandomSkillColors, 100);
    }

    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme || data.defaultTheme || 'light');

    themeToggle.addEventListener('click', () => {
      const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
      setTheme(newTheme);
    });
  })
  .catch((err) => console.error("Error loading JSON:", err));

   
window.rainbow = (() => {
  let intervalId = null;

  return () => {
    const tags = document.querySelectorAll('.skills-grid li');

    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      console.log("%c🌈 Rainbow mode deactivated!", "font-size: 14px; color: gray;");
      return;
    }

    console.log("%c🌈 Rainbow mode activated!", "font-size: 14px; color: hotpink;");

    intervalId = setInterval(() => {
      tags.forEach((tag, i) => {
        const hue = Math.floor(Math.random() * 360);
        tag.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
        tag.style.color = '#111827';
      });
    }, 250); // 0.25 seconds
  };
})();

console.log(
  "%cLooking for Vulnerabilities? Check out the code at: https://github.com/Aryan-401/PortfolioWebsite",
  "color: #3b82f6; font-weight: bold; font-size: 14px;"
);
console.log(
  "%cTry typing 'rainbow()' in here!",
  "color: #14b8a6; font-size: 14px;"
);

// Scroll Progress Indicator
function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = scrollPercent + '%';
}

// Back to Top Button
function updateBackToTopButton() {
  const backToTopButton = document.getElementById('back-to-top');
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
}

// Smooth Scroll Animation Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section-fade-in').forEach(section => {
    observer.observe(section);
  });
}

// Event Listeners
window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateBackToTopButton();
});

document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: ${type === 'success' ? '#10b981' : '#3b82f6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    font-size: 0.9rem;
  `;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Hide notification after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}


// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
  // Press 'T' to go to top
  if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showNotification('Scrolled to top! 🔝', 'info');
  }
  
  // Press 'R' for rainbow mode
  if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
    e.preventDefault();
    if (window.rainbow) {
      window.rainbow();
    }
  }
  
  // Press '?' to show help
  if (e.key === '?' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
    e.preventDefault();
    toggleHelpDialog();
  }
  
  // Press 'Escape' to close help
  if (e.key === 'Escape') {
    closeHelpDialog();
  }
});

function isInputFocused() {
  const activeElement = document.activeElement;
  return activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');
}

// Help Dialog Functions
function toggleHelpDialog() {
  const helpDialog = document.getElementById('help-dialog');
  if (helpDialog.style.display === 'none') {
    showHelpDialog();
  } else {
    closeHelpDialog();
  }
}

function showHelpDialog() {
  const helpDialog = document.getElementById('help-dialog');
  helpDialog.style.display = 'flex';
  setTimeout(() => helpDialog.classList.add('visible'), 10);
}

function closeHelpDialog() {
  const helpDialog = document.getElementById('help-dialog');
  helpDialog.classList.remove('visible');
  setTimeout(() => helpDialog.style.display = 'none', 300);
}

// Help dialog event listeners
document.getElementById('help-close').addEventListener('click', closeHelpDialog);
document.getElementById('help-dialog').addEventListener('click', function(e) {
  if (e.target === this) {
    closeHelpDialog();
  }
});