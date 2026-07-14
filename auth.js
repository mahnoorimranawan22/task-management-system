/**
 * User Access Signature Validation Subsystem Handler Logic Framework
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginFormElement = document.getElementById('login-form');
    const registerFormElement = document.getElementById('register-form');

    // Authentication Guard routing validation checks sequence
    const currentViewPathName = window.location.pathname;
    const sessionTokenKey = localStorage.getItem('task_jwt_token');

    if (sessionTokenKey && (currentViewPathName.includes('login.html') || currentViewPathName.includes('register.html'))) {
        window.location.href = 'dashboard.html';
        return;
    }

    /**
     * Toggles interface button states to block double-submission anomalies smoothly
     */
    const toggleButtonLoadingState = (btnElement, activateSpinner = true) => {
        if (!btnElement) return;
        if (activateSpinner) {
            btnElement.disabled = true;
            btnElement.dataset.originalContent = btnElement.innerHTML;
            btnElement.innerHTML = '<i class="fa-solid fa-spinner spinner-icon"></i> Processing Operation Matrix...';
        } else {
            btnElement.disabled = false;
            btnElement.innerHTML = btnElement.dataset.originalContent || btnElement.innerHTML;
        }
    };

    // Form Event Bindings Logic Execution Elements Processors
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            const actionSubmitBtn = loginFormElement.querySelector('#submit-btn');
            
            const userEmailInput = document.getElementById('email').value.trim();
            const userPasswordInput = document.getElementById('password').value;

            try {
                toggleButtonLoadingState(actionSubmitBtn, true);
                
                const responseDataMatrix = await makeNetworkRequest('/auth/login', 'POST', {
                    email: userEmailInput,
                    password: userPasswordInput
                });

                showToast('Identity verification signature clear! Entering ecosystem Workspace...', 'success');
                
                // Cache user authentication parameters into stateful browser allocations
                localStorage.setItem('task_jwt_token', responseDataMatrix.token);
                localStorage.setItem('task_logged_user', JSON.stringify(responseDataMatrix.data));

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);

            } catch (authErrorLog) {
                showToast(authErrorLog.message || 'Authorization checks failed over provided targets parameters.', 'error');
                toggleButtonLoadingState(actionSubmitBtn, false);
            }
        });
    }

    if (registerFormElement) {
        registerFormElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            const actionSubmitBtn = registerFormElement.querySelector('#submit-btn');

            const userNameVal = document.getElementById('name').value.trim();
            const userEmailVal = document.getElementById('email').value.trim();
            const userPasswordVal = document.getElementById('password').value;

            if (userPasswordVal.length < 6) {
                showToast('Target password string validation rules parameters require at least 6 characters total.', 'error');
                return;
            }

            try {
                toggleButtonLoadingState(actionSubmitBtn, true);

                const responseDataMatrix = await makeNetworkRequest('/auth/register', 'POST', {
                    name: userNameVal,
                    email: userEmailVal,
                    password: userPasswordVal
                });

                showToast('Identity record created! Setting up tracking workspaces context...', 'success');
                
                localStorage.setItem('task_jwt_token', responseDataMatrix.token);
                localStorage.setItem('task_logged_user', JSON.stringify(responseDataMatrix.data));

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);

            } catch (registrationErrorLog) {
                showToast(registrationErrorLog.message || ' Elicited system structural creation conflict detected.', 'error');
                toggleButtonLoadingState(actionSubmitBtn, false);
            }
        });
    }
});