// PWA wiring shared by every page: service worker registration and an "Install app" button.
(function () {
    'use strict';

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('sw.js').catch(function (err) {
                console.warn('Service worker registration failed:', err);
            });
        });
    }

    var deferredPrompt = null;
    var installBtn = document.getElementById('installBtn');

    window.addEventListener('beforeinstallprompt', function (event) {
        event.preventDefault();
        deferredPrompt = event;
        if (installBtn) installBtn.hidden = false;
    });

    if (installBtn) {
        installBtn.addEventListener('click', function () {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            deferredPrompt.userChoice.finally(function () {
                deferredPrompt = null;
                installBtn.hidden = true;
            });
        });
    }

    window.addEventListener('appinstalled', function () {
        if (installBtn) installBtn.hidden = true;
    });
})();
