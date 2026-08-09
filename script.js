document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTop = document.querySelector(".back-to-top");
    const yearElement = document.querySelector("#current-year");
    const sections = document.querySelectorAll("section[id]");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const updateHeader = () => {
        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navMenu) {
                navMenu.classList.remove("open");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    document.addEventListener("click", (event) => {
        if (!navMenu || !menuToggle) return;

        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });

    const updateActiveNav = () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 180;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    };

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });

    if (backToTop) {
        const updateBackToTop = () => {
            if (window.scrollY > 600) {
                backToTop.style.opacity = "1";
                backToTop.style.visibility = "visible";
                backToTop.style.pointerEvents = "auto";
            } else {
                backToTop.style.opacity = "0";
                backToTop.style.visibility = "hidden";
                backToTop.style.pointerEvents = "none";
            }
        };

        backToTop.style.transition = "opacity 0.3s ease, visibility 0.3s ease";
        updateBackToTop();

        window.addEventListener("scroll", updateBackToTop, { passive: true });

        backToTop.addEventListener("click", (event) => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-grid, .skill-card, .pipeline-step, .project-card, .dsa-card, .education-card, .profile-card, .contact-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
            element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
            observer.observe(element);
        });
    }

    const terminalText = document.querySelector(".terminal-output");

    if (terminalText) {
        const text = "Building practical ML systems...";
        let index = 0;

        terminalText.textContent = "";

        const typeText = () => {
            if (index < text.length) {
                terminalText.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 45);
            }
        };

        setTimeout(typeText, 500);
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });
});