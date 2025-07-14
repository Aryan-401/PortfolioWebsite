fetch("https://raw.githubusercontent.com/Aryan-401/PortfolioWebsite/refs/heads/main/data.json")
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
        div.className = "card";
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