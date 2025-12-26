// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const siteNav = document.getElementById('siteNav');
    
    if (menuBtn && siteNav) {
        menuBtn.addEventListener('click', function() {
            siteNav.classList.toggle('open');
        });
    }
});
