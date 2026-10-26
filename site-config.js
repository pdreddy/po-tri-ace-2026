// Site configuration. Edit this file to connect the site to a backend; no other code needs to change.
window.TRIACE_CONFIG = {
    season: {
        number: 2,
        year: 2026,
        name: 'TriAce 2026'
    },
    registration: {
        // URL that receives registrations as JSON (POST). Leave empty to download each
        // registration as a .json file instead, so nothing is lost before a backend exists.
        endpoint: '',
        // Extra headers for the endpoint, e.g. { "Authorization": "Bearer ..." }. Keep secrets out of public code.
        headers: {},
        successUrl: 'register-success.html'
    }
};
