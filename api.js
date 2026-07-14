/**
 * Standalone Unified Fetch Core API Endpoint Interactivity Layer Wrapper Engine
 */

const BASE_URL = 'http://localhost:3000/api';

/**
 * Executed wrapper implementation processing fetch requests towards the system back-end architecture
 * @param {string} relativeEndpoint - Relative target action link paths string
 * @param {string} requestMethod - Restful HTTP operational action type verbs
 * @param {object|null} contextPayload - Target data models to pass to backend schemas
 */
const makeNetworkRequest = async (relativeEndpoint, requestMethod = 'GET', contextPayload = null) => {
    const identityToken = localStorage.getItem('task_jwt_token');
    
    // Formulate configuration header attributes matching expected system protocol signatures
    const executionHeaders = {
        'Content-Type': 'application/json'
    };

    if (identityToken) {
        executionHeaders['Authorization'] = `Bearer ${identityToken}`;
    }

    const connectivityOptions = {
        method: requestMethod,
        headers: executionHeaders
    };

    if (contextPayload && (requestMethod === 'POST' || requestMethod === 'PUT' || requestMethod === 'PATCH')) {
        connectivityOptions.body = JSON.stringify(contextPayload);
    }

    try {
        const networkResponse = await fetch(`${BASE_URL}${relativeEndpoint}`, connectivityOptions);
        const structurePayload = await networkResponse.json();

        // Detect expired token context configurations to dynamically reset permissions frameworks safely
        if (networkResponse.status === 401) {
            localStorage.removeItem('task_jwt_token');
            localStorage.removeItem('task_logged_user');
            if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html') && !window.location.pathname.includes('index.html')) {
                window.location.href = 'login.html';
            }
        }

        if (!networkResponse.ok) {
            throw new Error(structurePayload.message || 'Network interface pipeline caught general processing abnormalities.');
        }

        return structurePayload;
    } catch (networkFailureError) {
        console.error(`[API Network Error Link Context Trace]: ${networkFailureError.message}`);
        throw networkFailureError;
    }
};