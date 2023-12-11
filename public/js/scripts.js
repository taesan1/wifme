// scripts.js

// Navbar shrink function
const navbarShrink = () => {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
        return;
    }
    if (window.scrollY === 0) {
        navbarCollapsible.classList.remove('navbar-shrink');
    } else {
        navbarCollapsible.classList.add('navbar-shrink');
    }
};

// Shrink the navbar when page is loaded
window.addEventListener('load', navbarShrink);

// Shrink the navbar when page is scrolled
document.addEventListener('scroll', navbarShrink);

// Collapse responsive navbar when toggler is visible
const navbarToggler = document.body.querySelector('.navbar-toggler');
const responsiveNavItems = Array.from(document.querySelectorAll('#navbarResponsive .nav-link'));
responsiveNavItems.forEach(responsiveNavItem => {
    responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
            navbarToggler.click();
        }
    });
});
