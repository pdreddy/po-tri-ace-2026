// Team registration: validates the three-player form, then sends it as JSON to a configurable endpoint.
// The form knows nothing about the hosting or backend. See site-config.js and README.md ("Team registration").
(function () {
    'use strict';

    var form = document.getElementById('registrationForm');
    if (!form) return;

    var config = (window.TRIACE_CONFIG && window.TRIACE_CONFIG.registration) || {};
    var season = (window.TRIACE_CONFIG && window.TRIACE_CONFIG.season) || {};
    var PHONE_PATTERN = /^\+?[0-9 ()-]{7,20}$/;
    var submitBtn = form.querySelector('button[type=submit]');
    var statusEl = document.getElementById('formStatus');

    function setError(name, message) {
        var field = form.elements[name];
        var slot = form.querySelector('[data-error-for="' + name + '"]');
        if (field) field.setAttribute('aria-invalid', message ? 'true' : 'false');
        if (slot) slot.textContent = message || '';
    }

    function normalise(value) {
        return value.trim().replace(/\s+/g, ' ').toLowerCase();
    }

    function validate() {
        var ok = true;
        var names = [];

        var email = form.elements.captain_email;
        var emailOk = email.value.trim() !== '' && email.checkValidity();
        setError('captain_email', emailOk ? '' : 'Enter a valid email address.');
        ok = ok && emailOk;

        [1, 2, 3].forEach(function (n) {
            var nameEl = form.elements['player' + n + '_name'];
            var phoneEl = form.elements['player' + n + '_phone'];
            var nameValue = nameEl.value.trim();

            if (!nameValue) {
                setError(nameEl.name, 'Player ' + n + ' needs a name.');
                ok = false;
            } else if (names.indexOf(normalise(nameValue)) !== -1) {
                setError(nameEl.name, 'Each player needs a different name.');
                ok = false;
            } else {
                setError(nameEl.name, '');
                names.push(normalise(nameValue));
            }

            var phoneOk = PHONE_PATTERN.test(phoneEl.value.trim());
            setError(phoneEl.name, phoneOk ? '' : 'Enter a mobile number (digits, spaces, + and - only).');
            ok = ok && phoneOk;
        });

        var agree = form.elements.agree_rules;
        setError('agree_rules', agree.checked ? '' : 'Please confirm you agree to the rules.');
        return ok && agree.checked;
    }

    // The payload is plain JSON with a version number, so any backend can read it.
    function buildPayload() {
        function value(name) { return form.elements[name].value.trim(); }
        return {
            schemaVersion: 1,
            season: season.number || null,
            seasonName: season.name || null,
            submittedAt: new Date().toISOString(),
            team: {
                name: value('team_name') || null,
                captainEmail: value('captain_email'),
                notes: value('notes') || null
            },
            players: [1, 2, 3].map(function (n) {
                return {
                    role: n === 1 ? 'captain' : 'player',
                    name: value('player' + n + '_name'),
                    phone: value('player' + n + '_phone')
                };
            }),
            agreedToRules: form.elements.agree_rules.checked
        };
    }

    function setBusy(busy) {
        submitBtn.disabled = busy;
        submitBtn.textContent = busy ? 'Sending…' : 'Register team';
    }

    function showStatus(message, isError) {
        if (!statusEl) return;
        statusEl.textContent = message;
        statusEl.classList.toggle('is-error', !!isError);
    }

    // Default delivery: POST JSON to the configured endpoint.
    // With no endpoint yet, the registration is downloaded as a file so the organisers still get it.
    function deliver(payload) {
        if (!config.endpoint) {
            var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = 'triace-registration-' + Date.now() + '.json';
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
            return Promise.resolve();
        }

        var headers = Object.assign({ 'Content-Type': 'application/json', 'Accept': 'application/json' }, config.headers || {});
        return fetch(config.endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        }).then(function (response) {
            if (!response.ok) throw new Error('Server responded with ' + response.status);
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Honeypot: real people never fill this hidden field. Pretend success for bots.
        if (form.elements.website.value) {
            window.location.href = config.successUrl || 'register-success.html';
            return;
        }

        if (!validate()) {
            var firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        setBusy(true);
        showStatus('', false);

        deliver(buildPayload())
            .then(function () {
                window.location.href = config.successUrl || 'register-success.html';
            })
            .catch(function (err) {
                setBusy(false);
                showStatus('Sorry, we could not send your registration (' + err.message + '). Please try again.', true);
            });
    });

    // Clear an error as soon as the user edits that field.
    form.addEventListener('input', function (event) {
        var name = event.target.name;
        if (form.querySelector('[data-error-for="' + name + '"]')) setError(name, '');
    });
})();
