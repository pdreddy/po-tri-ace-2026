// Client-side checks for the 3-player registration form.
// Netlify Forms does the server side; this stops obvious mistakes before they are sent.
(function () {
    'use strict';

    var form = document.querySelector('form[name="triace-registration"]');
    if (!form) return;

    var PHONE_PATTERN = /^\+?[0-9 ()-]{7,20}$/;

    function setError(name, message) {
        var field = form.elements[name];
        var slot = form.querySelector('[data-error-for="' + name + '"]');
        if (field) field.setAttribute('aria-invalid', message ? 'true' : 'false');
        if (slot) slot.textContent = message || '';
    }

    function clean(value) {
        return value.trim().replace(/\s+/g, ' ').toLowerCase();
    }

    function validate() {
        var ok = true;
        var names = [];

        ['captain_email'].forEach(function (name) {
            var el = form.elements[name];
            var valid = el.value.trim() !== '' && el.checkValidity();
            setError(name, valid ? '' : 'Enter a valid email address.');
            ok = ok && valid;
        });

        [1, 2, 3].forEach(function (n) {
            var nameEl = form.elements['player' + n + '_name'];
            var phoneEl = form.elements['player' + n + '_phone'];

            var nameValue = nameEl.value.trim();
            if (!nameValue) {
                setError(nameEl.name, 'Player ' + n + ' needs a name.');
                ok = false;
            } else if (names.indexOf(clean(nameValue)) !== -1) {
                setError(nameEl.name, 'Each player needs a different name.');
                ok = false;
            } else {
                setError(nameEl.name, '');
                names.push(clean(nameValue));
            }

            var phoneValue = phoneEl.value.trim();
            var phoneOk = PHONE_PATTERN.test(phoneValue);
            setError(phoneEl.name, phoneOk ? '' : 'Enter a mobile number (digits, spaces, + and - only).');
            ok = ok && phoneOk;
        });

        var agree = form.elements['agree_rules'];
        setError('agree_rules', agree.checked ? '' : 'Please confirm you agree to the rules.');
        ok = ok && agree.checked;

        return ok;
    }

    form.addEventListener('submit', function (event) {
        if (!validate()) {
            event.preventDefault();
            var firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) firstInvalid.focus();
        }
    });

    // Clear an error as soon as the user edits that field.
    form.addEventListener('input', function (event) {
        var name = event.target.name;
        if (form.querySelector('[data-error-for="' + name + '"]')) setError(name, '');
    });
})();
