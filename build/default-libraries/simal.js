(function (window) {
    'use strict';

    let previousBodyOverflow = '';
    let previousOverscrollBehavior = '';

    const lockPageScroll = () => {

        previousBodyOverflow = document.body.style.overflow;
        previousOverscrollBehavior =
            document.documentElement.style.overscrollBehavior;

        document.documentElement.style.overscrollBehavior = 'none';
        document.body.style.overflow = 'hidden';

    };

    const unlockPageScroll = () => {

        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overscrollBehavior =
            previousOverscrollBehavior;

    };

    const Simal = {

        _active: null,

        fire(options = {}) {

            // Allow simple usage:
            // simal.fire('Hello world')
            if (typeof options === 'string') {
                options = {
                    text: options
                };
            }

            return new Promise((resolve) => {

                const config = {

                    title: '',
                    text: '',
                    html: '',
                    icon: '',

                    showCancelButton: false,
                    showDenyButton: false,

                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    denyButtonText: 'Deny',

                    allowOutsideClick: true,
                    allowEscapeKey: true,

                    preConfirm: null,
                    preDeny: null,

                    preOpen: null,
                    didOpen: null,
                    preClose: null,
                    didClose: null,

                    customClass: {
                        dialog: 'simal-dialog',
                        container: 'simal-container',
                        icon: 'simal-icon',
                        iconSymbol: 'simal-icon-symbol',
                        title: 'simal-title',
                        content: 'simal-content',
                        validationMessage: 'simal-validation-message',
                        actions: 'simal-actions',
                        button: 'simal-button',
                        confirmButton: 'simal-confirm-button',
                        cancelButton: 'simal-cancel-button',
                        denyButton: 'simal-deny-button',
                        htmlInputs: 'simal-input',
                        htmlFormInputs: 'simal-input'
                    },

                    ...options,

                    customClass: {
                        dialog: 'simal-dialog',
                        container: 'simal-container',
                        icon: 'simal-icon',
                        iconSymbol: 'simal-icon-symbol',
                        title: 'simal-title',
                        content: 'simal-content',
                        validationMessage: 'simal-validation-message',
                        actions: 'simal-actions',
                        button: 'simal-button',
                        confirmButton: 'simal-confirm-button',
                        cancelButton: 'simal-cancel-button',
                        denyButton: 'simal-deny-button',
                        htmlInputs: 'simal-input',
                        htmlFormInputs: 'simal-input',
                        ...(options.customClass || {})
                    }

                };

                const customClass = config.customClass;

                const getClasses = (...classNames) => {

                    return classNames
                        .flatMap((className) =>
                            typeof className === 'string'
                                ? className.split(/\s+/)
                                : []
                        )
                        .filter(Boolean)
                        .filter(
                            (className, index, classes) =>
                                classes.indexOf(className) === index
                        )
                        .join(' ');

                };

                const dialog = document.createElement('dialog');

                dialog.className = getClasses(
                    'simal-dialog',
                    customClass.dialog
                );

                dialog.innerHTML = `
                    <div class="${getClasses(
                        'simal-container',
                        customClass.container
                    )}">

                        ${
                            config.icon
                                ? `<div class="${getClasses(
                                      'simal-icon',
                                      `simal-icon-${config.icon}`,
                                      customClass.icon
                                  )}">
                                       ${this.getIcon(
                                           config.icon,
                                           customClass.iconSymbol
                                       )}
                                   </div>`
                                : ''
                        }

                        ${
                            config.title
                                ? `<div class="${getClasses(
                                      'simal-title',
                                      customClass.title
                                  )}">
                                       ${config.title}
                                   </div>`
                                : ''
                        }

                        ${
                            config.html
                                ? `<div class="${getClasses(
                                      'simal-content',
                                      customClass.content
                                  )}">
                                       ${config.html}
                                   </div>`
                                : config.text
                                    ? `<div class="${getClasses(
                                          'simal-content',
                                          customClass.content
                                      )}">
                                           ${config.text}
                                       </div>`
                                    : ''
                        }

                        <div
                            class="${getClasses(
                                'simal-validation-message',
                                customClass.validationMessage
                            )}"
                            style="display: none;"
                        ></div>

                        <div class="${getClasses(
                            'simal-actions',
                            customClass.actions
                        )}">

                            ${
                                config.showDenyButton
                                    ? `<button
                                           type="button"
                                           class="${getClasses(
                                               'simal-button',
                                               customClass.button,
                                               'simal-deny-button',
                                               customClass.denyButton
                                           )}"
                                       >
                                           ${config.denyButtonText}
                                       </button>`
                                    : ''
                            }

                            ${
                                config.showCancelButton
                                    ? `<button
                                           type="button"
                                           class="${getClasses(
                                               'simal-button',
                                               customClass.button,
                                               'simal-cancel-button',
                                               customClass.cancelButton
                                           )}"
                                       >
                                           ${config.cancelButtonText}
                                       </button>`
                                    : ''
                            }

                            <button
                                type="button"
                                class="${getClasses(
                                    'simal-button',
                                    customClass.button,
                                    'simal-confirm-button',
                                    customClass.confirmButton
                                )}"
                            >
                                ${config.confirmButtonText}
                            </button>

                        </div>

                    </div>
                `;

                const applyInputClasses = () => {

                    const inputSelector =
                        'input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=range]):not([type=hidden]):not([type=button]):not([type=submit]):not([type=reset]), select, textarea';

                    const controls =
                        dialog.querySelectorAll(inputSelector);

                    controls.forEach((control) => {

                        const form = control.closest('form');

                        const className = form
                            ? customClass.htmlFormInputs
                            : customClass.htmlInputs;

                        if (!className) {
                            return;
                        }

                        className
                            .split(/\s+/)
                            .filter(Boolean)
                            .forEach((className) => {
                                control.classList.add(className);
                            });

                    });

                    const forms = dialog.querySelectorAll('form');

                    forms.forEach((form) => {

                        if (!customClass.form) {
                            return;
                        }

                        customClass.form
                            .split(/\s+/)
                            .filter(Boolean)
                            .forEach((className) => {
                                form.classList.add(className);
                            });

                    });

                };

                let completed = false;
                let waitingForHistoryCleanup = false;
                let historyStateAdded = false;
                let finalResult = 'cancelled';
                let isConfirming = false;
                let isDenying = false;
                let validationFailed = false;

                const simalHistoryState = {
                    ...(history.state || {}),
                    __simalDialog: true
                };

                const removePopStateListener = () => {

                    window.removeEventListener(
                        'popstate',
                        handlePopState
                    );

                };

                const runDidClose = () => {

                    if (typeof config.didClose === 'function') {
                        config.didClose(dialog);
                    }

                };

                const removeDialog = () => {

                    if (Simal._active?.dialog === dialog) {
                        Simal._active = null;
                    }

                    if (dialog.open) {
                        dialog.close();
                    }

                    dialog.remove();

                    unlockPageScroll();

                    runDidClose();

                };

                const resolveFinalResult = (value) => {

                    removePopStateListener();

                    const result = {
                        isConfirmed: finalResult === 'confirmed',
                        isCancelled: finalResult === 'cancelled',
                        isDenied: finalResult === 'denied'
                    };

                    if (
                        finalResult === 'confirmed' &&
                        value !== undefined
                    ) {
                        result.value = value;
                    }

                    if (
                        finalResult === 'denied' &&
                        value !== undefined
                    ) {
                        result.value = value;
                    }

                    resolve(result);

                };

                const finish = (result, value) => {

                    if (completed) {
                        return;
                    }

                    completed = true;
                    finalResult = result;

                    /*
                     * Run user-defined preClose hook before
                     * starting the actual close/cleanup process.
                     */
                    if (typeof config.preClose === 'function') {
                        config.preClose(dialog);
                    }

                    // Keep the popstate listener active until
                    // the dummy history entry has actually been removed.
                    if (
                        historyStateAdded &&
                        history.state?.__simalDialog
                    ) {

                        waitingForHistoryCleanup = true;

                        history.back();

                        // Store the value until history cleanup is complete.
                        finish.pendingValue = value;

                        return;
                    }

                    removeDialog();
                    resolveFinalResult(value);

                };

                const handlePopState = () => {

                    // This popstate is caused by our own history.back()
                    // call. The dummy Simal history entry has now been
                    // removed.
                    if (waitingForHistoryCleanup) {

                        waitingForHistoryCleanup = false;
                        historyStateAdded = false;

                        const value = finish.pendingValue;

                        finish.pendingValue = undefined;

                        removeDialog();
                        resolveFinalResult(value);

                        return;
                    }

                    // The user pressed the browser/device Back button
                    // while Simal was visible.
                    if (!completed) {

                        completed = true;
                        finalResult = 'cancelled';

                        /*
                         * Browser/device Back itself has already removed
                         * the dummy history entry.
                         */
                        historyStateAdded = false;

                        /*
                         * Run user-defined preClose hook for
                         * browser/device Back as well.
                         */
                        if (typeof config.preClose === 'function') {
                            config.preClose(dialog);
                        }

                        removeDialog();
                        resolveFinalResult();

                    }

                };

                const validationMessage =
                    dialog.querySelector(
                        '.simal-validation-message'
                    );

                Simal._active = {

                    dialog,

                    close: () => finish('cancelled'),

                    showValidationMessage: (message) => {

                        if (!validationMessage) {
                            return;
                        }

                        if (message) {

                            validationMessage.textContent = message;
                            validationMessage.style.display = '';

                        } else {

                            validationMessage.textContent = '';
                            validationMessage.style.display = 'none';

                        }

                        validationFailed = !!message;
                        isConfirming = false;
                        isDenying = false;

                        const confirmButton =
                            dialog.querySelector(
                                '.simal-confirm-button'
                            );

                        if (confirmButton) {
                            confirmButton.disabled = false;
                        }

                        const denyButton =
                            dialog.querySelector(
                                '.simal-deny-button'
                            );

                        if (denyButton) {
                            denyButton.disabled = false;
                        }

                    }

                };

                const confirmButton =
                    dialog.querySelector(
                        '.simal-confirm-button'
                    );

                const cancelButton =
                    dialog.querySelector(
                        '.simal-cancel-button'
                    );

                const denyButton =
                    dialog.querySelector(
                        '.simal-deny-button'
                    );

                // Prevent normal form submission inside Simal.
                // Form controls are still collected and validated normally.
                const forms =
                    dialog.querySelectorAll('form');

                forms.forEach((form) => {

                    form.addEventListener(
                        'submit',
                        (event) => {
                            event.preventDefault();
                        }
                    );

                });

                const getInputValues = () => {

                    const controls = dialog.querySelectorAll(
                        'input[name], select[name], textarea[name]'
                    );

                    if (!controls.length) {
                        return undefined;
                    }

                    const values = {};

                    controls.forEach((control) => {

                        if (control.disabled) {
                            return;
                        }

                        const name = control.name;

                        if (!name) {
                            return;
                        }

                        let value;

                        if (control.type === 'checkbox') {

                            if (!control.checked) {
                                return;
                            }

                            value = control.value || true;

                        } else if (control.type === 'radio') {

                            if (!control.checked) {
                                return;
                            }

                            value = control.value;

                        } else {

                            value = control.value;

                        }

                        // Support multiple controls using the same name.
                        if (
                            Object.prototype.hasOwnProperty.call(
                                values,
                                name
                            )
                        ) {

                            if (!Array.isArray(values[name])) {
                                values[name] = [values[name]];
                            }

                            values[name].push(value);

                        } else {

                            values[name] = value;

                        }

                    });

                    return values;

                };

                const clearValidationMessage = () => {

                    if (!validationMessage) {
                        return;
                    }

                    validationMessage.textContent = '';
                    validationMessage.style.display = 'none';

                    validationFailed = false;

                };

                const handleConfirm = async () => {

                    if (completed || isConfirming || isDenying) {
                        return;
                    }

                    clearValidationMessage();

                    const values = getInputValues();

                    // Let native HTML validation handle required,
                    // minlength, maxlength, min, max, type,
                    // pattern, etc.
                    const controls = dialog.querySelectorAll(
                        'input[name], select[name], textarea[name]'
                    );

                    for (const control of controls) {

                        if (
                            !control.disabled &&
                            typeof control.checkValidity === 'function' &&
                            !control.checkValidity()
                        ) {

                            control.reportValidity();

                            return;

                        }

                    }

                    let resultValue = values;

                    if (
                        typeof config.preConfirm === 'function'
                    ) {

                        isConfirming = true;
                        confirmButton.disabled = true;

                        try {

                            const preConfirmValue =
                                await config.preConfirm(values);

                            /*
                             * If showValidationMessage()
                             * was called inside preConfirm(),
                             * keep the dialog open.
                             */
                            if (validationFailed) {

                                isConfirming = false;
                                confirmButton.disabled = false;

                                return;

                            }

                            /*
                             * undefined or false means validation failed
                             * and the dialog must remain open.
                             */
                            if (
                                preConfirmValue === undefined ||
                                preConfirmValue === false
                            ) {

                                isConfirming = false;
                                confirmButton.disabled = false;

                                return;

                            }

                            resultValue = preConfirmValue;

                        } catch (error) {

                            isConfirming = false;
                            confirmButton.disabled = false;

                            return;

                        }

                    }

                    finish(
                        'confirmed',
                        resultValue
                    );

                };

                const handleDeny = async () => {

                    if (completed || isConfirming || isDenying) {
                        return;
                    }

                    clearValidationMessage();

                    const values = getInputValues();

                    // Let native HTML validation handle required,
                    // minlength, maxlength, min, max, type,
                    // pattern, etc.
                    const controls = dialog.querySelectorAll(
                        'input[name], select[name], textarea[name]'
                    );

                    for (const control of controls) {

                        if (
                            !control.disabled &&
                            typeof control.checkValidity === 'function' &&
                            !control.checkValidity()
                        ) {

                            control.reportValidity();

                            return;

                        }

                    }

                    let resultValue;

                    if (
                        typeof config.preDeny === 'function'
                    ) {

                        isDenying = true;
                        denyButton.disabled = true;

                        try {

                            const preDenyValue =
                                await config.preDeny(values);

                            /*
                             * If showValidationMessage()
                             * was called inside preDeny(),
                             * keep the dialog open.
                             */
                            if (validationFailed) {

                                isDenying = false;
                                denyButton.disabled = false;

                                return;

                            }

                            /*
                             * false prevents the popup from closing.
                             */
                            if (preDenyValue === false) {

                                isDenying = false;
                                denyButton.disabled = false;

                                return;

                            }

                            /*
                             * undefined keeps the default result.value.
                             */
                            if (preDenyValue !== undefined) {
                                resultValue = preDenyValue;
                            }

                        } catch (error) {

                            isDenying = false;
                            denyButton.disabled = false;

                            return;

                        }

                    }

                    finish(
                        'denied',
                        resultValue
                    );

                };

                confirmButton.addEventListener(
                    'click',
                    handleConfirm
                );

                if (cancelButton) {

                    cancelButton.addEventListener(
                        'click',
                        () => {
                            finish('cancelled');
                        }
                    );

                }

                if (denyButton) {

                    denyButton.addEventListener(
                        'click',
                        handleDeny
                    );

                }

                dialog.addEventListener(
                    'cancel',
                    (event) => {

                        if (config.allowEscapeKey) {
                            finish('cancelled');
                        } else {
                            event.preventDefault();
                        }

                    }
                );

                dialog.addEventListener(
                    'click',
                    (event) => {

                        if (
                            config.allowOutsideClick &&
                            event.target === dialog
                        ) {
                            finish('cancelled');
                        }

                    }
                );

                /*
                 * ---------------------------------------------------------
                 * preOpen
                 * ---------------------------------------------------------
                 *
                 * Default Simal operations are executed first.
                 * User-defined preOpen is executed afterwards.
                 */
                const runPreOpen = () => {

                    // Lock page scrolling.
                    lockPageScroll();

                    // Add dialog to the document.
                    document.body.appendChild(dialog);

                    // Apply default/custom input classes.
                    applyInputClasses();

                    // Add dummy history state.
                    history.pushState(
                        simalHistoryState,
                        '',
                        location.href
                    );

                    historyStateAdded = true;

                    // Listen for browser/device Back button.
                    window.addEventListener(
                        'popstate',
                        handlePopState
                    );

                    // Run user-defined preOpen hook.
                    if (typeof config.preOpen === 'function') {
                        config.preOpen(dialog);
                    }

                };

                /*
                 * Run all pre-open operations before
                 * actually opening the dialog.
                 */
                runPreOpen();

                /*
                 * Open the dialog.
                 */
                dialog.showModal();

                /*
                 * ---------------------------------------------------------
                 * didOpen
                 * ---------------------------------------------------------
                 *
                 * Simal has no default operation here.
                 * Run user-defined didOpen after the dialog is visible.
                 */
                if (typeof config.didOpen === 'function') {
                    config.didOpen(dialog);
                }

            });

        },

        isVisible() {

            return !!(
                this._active &&
                this._active.dialog &&
                this._active.dialog.open
            );

        },

        close() {

            if (this._active) {
                return this._active.close();
            }

            return Promise.resolve();

        },

        showValidationMessage(message) {

            if (this._active?.showValidationMessage) {
                this._active.showValidationMessage(message);
            }

        },

        getIcon(type, customClass = 'simal-icon-symbol') {

            const iconSymbolClass = [
                'simal-icon-symbol',
                customClass
            ]
                .filter(Boolean)
                .join(' ');

            const icons = {

                success: `
                    <span class="${iconSymbolClass}">
                        ✓
                    </span>
                `,

                error: `
                    <span class="${iconSymbolClass}">
                        ×
                    </span>
                `,

                warning: `
                    <span class="${iconSymbolClass}">
                        !
                    </span>
                `,

                info: `
                    <span class="${iconSymbolClass}">
                        i
                    </span>
                `,

                question: `
                    <span class="${iconSymbolClass}">
                        ?
                    </span>
                `

            };

            return icons[type] || '';

        }

    };

    window.simal = Simal;

})(window);
