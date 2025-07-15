document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Comparison table column hover effect
    const table = document.getElementById('comparison-table');
    if (table) {
        const highlightCells = table.querySelectorAll('.highlight-col');

        const addHoverClass = () => {
            highlightCells.forEach(cell => cell.classList.add('highlight-col-hover'));
        };

        const removeHoverClass = () => {
            highlightCells.forEach(cell => cell.classList.remove('highlight-col-hover'));
        };

        highlightCells.forEach(cell => {
            cell.addEventListener('mouseenter', addHoverClass);
            cell.addEventListener('mouseleave', removeHoverClass);
        });
    }
});
