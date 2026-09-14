document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('klibs-settings-form');
    const button = document.getElementById('klibs-save-button');

    if (!form || !button || typeof klibsAdmin === 'undefined') {
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        button.disabled = true;

        const formData = new FormData(form);
        formData.append('action', 'klibs_save_settings');
        formData.append('nonce', klibsAdmin.nonce);

        fetch(klibsAdmin.ajaxUrl, {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                if (!result.success) {
                    throw new Error(
                        result.data && result.data.message
                            ? result.data.message
                            : 'Unable to save library settings.'
                    );
                }

                window.alert(result.data.message);
            })
            .catch(function (error) {
                window.alert(error.message || 'Unable to save library settings.');
            })
            .finally(function () {
                button.disabled = false;
            });
    });
});
