document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
        tag.classList.add('animate-in');
    });
    
    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each timeline item
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add hover effect to section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('mouseenter', () => {
            const icon = header.querySelector('i');
            if (icon) {
                icon.classList.add('fa-beat');
                setTimeout(() => {
                    icon.classList.remove('fa-beat');
                }, 1000);
            }
        });
    });
    
    // Add current year to footer copyright
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('footer p');
    if (copyrightElement) {
        copyrightElement.textContent = copyrightElement.textContent.replace('2024', currentYear);
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.5s ease forwards;
            opacity: 0;
        }
        
        @keyframes skillTagAnimation {
            0% {
                transform: scale(0.8);
                opacity: 0;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .skill-tag {
            opacity: 0;
            animation: skillTagAnimation 0.4s ease forwards;
        }
    `;
    document.head.appendChild(style);
    
    // Add navigation menu for mobile
    const createMobileNav = () => {
        const sections = document.querySelectorAll('.section');
        const navContainer = document.createElement('div');
        navContainer.className = 'mobile-nav';
        
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        const navList = document.createElement('ul');
        navList.className = 'nav-list';
        
        sections.forEach(section => {
            const sectionId = section.id;
            const sectionTitle = section.querySelector('.section-header h2').textContent;
            
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${sectionId}`;
            link.textContent = sectionTitle.replace(/^\s*\S+\s+/, ''); // Remove icon text
            
            listItem.appendChild(link);
            navList.appendChild(listItem);
        });
        
        navContainer.appendChild(navToggle);
        navContainer.appendChild(navList);
        
        document.body.appendChild(navContainer);
        
        // Toggle mobile nav
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('show');
            navToggle.classList.toggle('active');
        });
        
        // Close nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!navContainer.contains(e.target) && navList.classList.contains('show')) {
                navList.classList.remove('show');
                navToggle.classList.remove('active');
            }
        });
        
        // Close nav when clicking a link
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('show');
                navToggle.classList.remove('active');
            });
        });
    };
    
    // Only create mobile nav for smaller screens
    if (window.innerWidth <= 768) {
        createMobileNav();
    }
    
    // Add dark mode toggle
    const createDarkModeToggle = () => {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'dark-mode-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        toggleBtn.title = 'Toggle Dark Mode';
        
        document.body.appendChild(toggleBtn);
        
        // Check for saved preference
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Apply dark mode if saved
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            // Save preference
            localStorage.setItem('darkMode', isDark);
            
            // Update icon
            toggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    };
    
    createDarkModeToggle();
    
    // Add CSS for dark mode and mobile nav
    // Update the dark mode styles in the additionalStyles
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        .dark-mode-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: var(--transition);
        }
        
        .dark-mode-toggle:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .dark-mode {
            background-color: #121212;
            color: #f5f5f5;
        }
        
        .dark-mode .container {
            background-color: #1e1e1e;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }
        
        .dark-mode .section {
            background-color: #1e1e1e;
        }
        
        .dark-mode .section-content {
            color: #f5f5f5;
        }
        
        .dark-mode .timeline-content,
        .dark-mode .project-card,
        .dark-mode .education-item,
        .dark-mode .certification-list li,
        .dark-mode #additional li,
        .dark-mode .language-item {
            background-color: #2d2d2d;
            color: #f5f5f5;
        }
        
        .dark-mode .skill-tag {
            background-color: #2d2d2d;
            color: #f5f5f5;
        }
        
        .dark-mode .skill-tag:hover {
            background-color: var(--secondary-color);
        }
        
        .dark-mode .timeline-dot {
            border-color: #1e1e1e;
        }
        
        .dark-mode .level-text,
        .dark-mode .institution,
        .dark-mode .period {
            color: #bdbdbd;
        }
        
        .dark-mode .nav-list {
            background-color: #1e1e1e;
        }
        
        .dark-mode .nav-list a {
            color: #f5f5f5;
        }
        
        .dark-mode .nav-list a:hover {
            background-color: #2d2d2d;
        }
        
        .dark-mode .profile-image {
            border-color: #2d2d2d;
        }
        
        /* Mobile nav styles remain the same */
        .mobile-nav {
            display: none;
        }
        
        @media (max-width: 768px) {
            .mobile-nav {
                display: none;
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 100;
            }
            
            .nav-toggle {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--primary-color);
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                transition: var(--transition);
            }
            
            .nav-toggle.active {
                background-color: var(--accent-color);
            }
            
            .nav-list {
                position: absolute;
                bottom: 60px;
                left: 0;
                background-color: white;
                border-radius: var(--border-radius);
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                padding: 10px 0;
                width: 200px;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
                opacity: 0;
                visibility: hidden;
                list-style-type: none;
            }
            
            .nav-list.show {
                max-height: 400px;
                opacity: 1;
                visibility: visible;
            }
            
            .nav-list li {
                padding: 0;
            }
            
            .nav-list a {
                display: block;
                padding: 10px 20px;
                color: var(--text-color);
                text-decoration: none;
                transition: var(--transition);
            }
            
            .nav-list a:hover {
                background-color: var(--light-color);
            }
        }
    `;
    document.head.appendChild(additionalStyles);
    
    // Add print functionality
    const printButton = document.querySelector('.print-button button');
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Add scroll to top button
    const createScrollTopButton = () => {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.title = 'Scroll to Top';
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createScrollTopButton();
    
    // Add styles for scroll to top button
    const scrollTopStyles = document.createElement('style');
    scrollTopStyles.textContent = `
        .scroll-top {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: var(--transition);
            opacity: 0;
            visibility: hidden;
        }
        
        .scroll-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-top:hover {
            transform: translateY(-3px);
            background-color: var(--secondary-color);
        }
        
        @media print {
            .scroll-top,
            .dark-mode-toggle,
            .mobile-nav {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(scrollTopStyles);
});