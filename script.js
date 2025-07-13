fetch("data.json")
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
      

    // Projects (Optional: if you want to re-add projects section)
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

    // Contact (as cards)
    const contactList = document.getElementById("contact-list");
    Object.entries(data.contact).forEach(([key, value]) => {
    if (key.endsWith("Label")) return; // skip label keys

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

    // --- MODIFIED THEME TOGGLE LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const emojiSpan = themeToggle.querySelector('.emoji');

    // Function to set the theme
    function setTheme(theme) {
      if (theme === 'dark') {
        body.classList.add('dark-mode');
        emojiSpan.textContent = '💡'; // Lightbulb for dark mode
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-mode');
        emojiSpan.textContent = '🌙'; // Moon for light mode
        localStorage.setItem('theme', 'light');
      }
    }

    // Check for saved theme preference or use default from data.json, else 'light'
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Use the defaultTheme from data.json if available, otherwise 'light'
      setTheme(data.defaultTheme || 'light');
    }

    // Event listener for the theme toggle button
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    });
    // --- END MODIFIED THEME TOGGLE LOGIC ---

  })
  .catch((err) => console.error("Error loading JSON:", err));