/**
 * Global Configuration Parameters System Options Settings Orchestration Module Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // Structural Security Authentication Check Gate Verification Flow Paths
    if (!localStorage.getItem('task_jwt_token')) {
        window.location.href = 'login.html';
        return;
    }

    initializeSettingsInterfaceControlOptionsStates();
    attachGlobalSystemSettingsControlHandlersListeners();
});

/**
 * Align active interface controls settings variables to accurately reflect saved browser configurations states
 */
const initializeSettingsInterfaceControlOptionsStates = () => {
    const systemCachedThemeValueKey = localStorage.getItem('task_app_theme') || 'dark';
    const settingsThemeButtonsCollection = document.querySelectorAll('.selection-pill-theme-btn-toggle');

    settingsThemeButtonsCollection.forEach(btnNode => {
        if (btnNode.dataset.themeIdTarget === systemCachedThemeValueKey) {
            btnNode.classList.add('active');
        } else {
            btnNode.classList.remove('active');
        }
    });

    // Alert systems checkboxes configuration states alignment checking
    const toastCheckboxStateNode = document.getElementById('settings-checkbox-toast-notifications');
    if (toastCheckboxStateNode) {
        const cachedNotificationPermissionFlagStatus = localStorage.getItem('task_setting_allow_toasts');
        toastCheckboxStateNode.checked = cachedNotificationPermissionFlagStatus !== 'false';
    }
};

/**
 * Sets input event management tracking wireframe bindings loops across settings panels
 */
const attachGlobalSystemSettingsControlHandlersListeners = () => {
    const themeButtonsList = document.querySelectorAll('.selection-pill-theme-btn-toggle');
    const toastCheckboxNodeElement = document.getElementById('settings-checkbox-toast-notifications');
    const logoutBtn = document.getElementById('logout-trigger-btn');

    themeButtonsList.forEach(buttonElement => {
        buttonElement.addEventListener('click', () => {
            const chosenThemeIdKeyString = buttonElement.dataset.themeIdTarget;

            // Update DOM Document metadata descriptors variables configurations properties
            document.documentElement.setAttribute('data-theme', chosenThemeIdKeyString);
            localStorage.setItem('task_app_theme', chosenThemeIdKeyString);

            // Refactor visual active flags toggles classes states definitions parameters
            themeButtonsList.forEach(b => b.classList.remove('active'));
            buttonElement.classList.add('active');

            showToast(`Ecosystem layout canvas skin color theme switched to ${chosenThemeIdKeyString} visual profiles modes.`, 'success');
        });
    });

    if (toastCheckboxNodeElement) {
        toastCheckboxNodeElement.addEventListener('change', (e) => {
            const operationalInputCheckedValueFlag = e.target.checked;
            localStorage.setItem('task_setting_allow_toasts', operationalInputCheckedValueFlag.toString());
            
            if (operationalInputCheckedValueFlag) {
                showToast('Ecosystem runtime success notifications alerts verification popups enabled.', 'success');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'index.html';
        });
    }
};