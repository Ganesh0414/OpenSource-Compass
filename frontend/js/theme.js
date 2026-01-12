document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Check LocalStorage on load and apply theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true); // Helper function to set icon
    }

    // 2. Event Delegation for the Theme Button
    // This works even if the button is injected dynamically by components.js
    document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#themeToggle');
        if (toggleBtn) {
            // Toggle the class
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            // Update the icon
            updateThemeIcon(isDark);

            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
    });

    // 3. Scroll to Top Logic
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            scrollTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

// Helper function to update the icon safely
function updateThemeIcon(isDark) {
    // We try to find the icon. It might be inside the injected navbar.
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}