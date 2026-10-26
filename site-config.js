// Site configuration. Edit this file to connect the site to a backend; no other code needs to change.
window.TRIACE_CONFIG = {
    season: {
        number: 2,
        year: 2026,
        name: 'TriAce 2026'
    },
    // Same Firebase project as the scoring, standings and teams pages.
    firebase: {
        apiKey: "AIzaSyDbO0eP52i4t3V94bEiDcl7WoKbSrrM9VA",
        authDomain: "koc2-20fb8.firebaseapp.com",
        databaseURL: "https://koc2-20fb8-default-rtdb.firebaseio.com",
        projectId: "koc2-20fb8",
        storageBucket: "koc2-20fb8.firebasestorage.app",
        messagingSenderId: "317734341461",
        appId: "1:317734341461:web:1bcad5a1792fac0e46bddc"
    },
    registration: {
        // Delivery order: Firebase (if `firebasePath` is set), then `endpoint`, then a JSON file download.
        // Firebase path in the Realtime Database that stores registrations.
        firebasePath: 'registrations',
        // Optional HTTP endpoint that receives registrations as JSON (POST), for a non-Firebase backend.
        endpoint: '',
        // Extra headers for the endpoint, e.g. { "Authorization": "Bearer ..." }. Keep secrets out of public code.
        headers: {},
        successUrl: 'register-success.html'
    }
};
