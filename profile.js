/**
 * Identity Profile Management Configuration Interface Processing Engine
 */

let cachedProfileObjectInstanceReference = null;

document.addEventListener('DOMContentLoaded', () => {
    // Session Existence Handlers Verification Route Gate Checks
    const sessionTokenKey = localStorage.getItem('task_jwt_token');
    const systemCachedUserString = localStorage.getItem('task_logged_user');

    if (!sessionTokenKey || !systemCachedUserString) {
        localStorage.clear();
        window.location.href = 'login.html';
        return;
    }

    cachedProfileObjectInstanceReference = JSON.parse(systemCachedUserString);

    setupIdentityManagementViewFormWireframes();
    setupAvatarUploadInterfaceInteractions();
});

/**
 * Maps validation properties fields coordinates cleanly onto profile components layout inputs elements
 */
const setupIdentityManagementViewFormWireframes = () => {
    const inputNameField = document.getElementById('profile-input-name-field');
    const inputEmailField = document.getElementById('profile-input-email-field');
    const cardTitleString = document.getElementById('profile-card-name-title-string');
    const cardSubString = document.getElementById('profile-card-email-sub-string');
    const avatarLargeInitials = document.getElementById('avatar-large-initials-field');
    const formNodeElement = document.getElementById('profile-synchronization-form');
    const logoutBtn = document.getElementById('logout-trigger-btn');

    if (cachedProfileObjectInstanceReference) {
        if (inputNameField) inputNameField.value = cachedProfileObjectInstanceReference.name || '';
        if (inputEmailField) inputEmailField.value = cachedProfileObjectInstanceReference.email || '';
        if (cardTitleString) cardTitleString.textContent = cachedProfileObjectInstanceReference.name || 'TaskPro Operator';
        if (cardSubString) cardSubString.textContent = cachedProfileObjectInstanceReference.email || 'operator@system.io';
        
        if (avatarLargeInitials && cachedProfileObjectInstanceReference.name) {
            avatarLargeInitials.textContent = cachedProfileObjectInstanceReference.name.split(' ').map(p => p[0]).join('').toUpperCase().substring(0,2);
        }
    }

    if (formNodeElement) {
        formNodeElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            const actionSubmitBtn = document.getElementById('save-profile-btn');
            const targetUpdatedNameValue = inputNameField.value.trim();

            if (!targetUpdatedNameValue) {
                showToast('Target profile identity string cannot match a null character sequence mapping rules.', 'error');
                return;
            }

            try {
                if (actionSubmitBtn) {
                    actionSubmitBtn.disabled = true;
                    actionSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin-offset"></i> Syncing...';
                }

                // Hit endpoints updates route sequences logic paths
                const apiResponseResult = await makeNetworkRequest('/users/profile', 'PUT', {
                    name: targetUpdatedNameValue
                });

                showToast('Identity profile schema synchronized successfully across all structural caches.', 'success');
                
                // Update local structural caches to match new database profiles states 
                const updatedUserObjectStructure = { ...cachedProfileObjectInstanceReference, name: targetUpdatedNameValue };
                localStorage.setItem('task_logged_user', JSON.stringify(updatedUserObjectStructure));
                cachedProfileObjectInstanceReference = updatedUserObjectStructure;

                // Adjust visual text items positions elements immediately inside views parameters mapping configurations
                if (cardTitleString) cardTitleString.textContent = targetUpdatedNameValue;
                if (avatarLargeInitials) {
                    avatarLargeInitials.textContent = targetUpdatedNameValue.split(' ').map(p => p[0]).join('').toUpperCase().substring(0,2);
                }

            } catch (profilePersistenceSyncFailureErrorLog) {
                // If special dedicated user routes mismatch, attempt fallback path updates via general options components models
                showToast(profilePersistenceSyncFailureErrorLog.message || 'Direct profile sync unavailable, parameter rules execution skipped.', 'error');
            } finally {
                if (actionSubmitBtn) {
                    actionSubmitBtn.disabled = false;
                    actionSubmitBtn.innerHTML = '<span>Commit Profile Alignment</span> <i class="fa-solid fa-user-check"></i>';
                }
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

/**
 * Creates visual mock simulations for profile picture selections to handle client interaction frames flawlessly
 */
const setupAvatarUploadInterfaceInteractions = () => {
    const hiddenFileInputNode = document.getElementById('avatar-file-upload-hidden-input');
    const largeAvatarInitialsField = document.getElementById('avatar-large-initials-field');

    if (!hiddenFileInputNode || !largeAvatarInitialsField) return;

    hiddenFileInputNode.addEventListener('change', (event) => {
        const structuralUploadedFileHandle = event.target.files[0];
        if (!structuralUploadedFileHandle) return;

        // Verify image formats parameters prior to parsing changes views components transformations
        if (!structuralUploadedFileHandle.type.startsWith('image/')) {
            showToast('Provided asset index file rejects verification rules parameters. Image type asset required.', 'error');
            return;
        }

        const standardClientSideFileReader = new FileReader();
        standardClientSideFileReader.onload = (e) => {
            // Apply captured image data string directly onto standard CSS background properties elements styles templates
            largeAvatarInitialsField.style.backgroundImage = `url('${e.target.result}')`;
            largeAvatarInitialsField.style.backgroundSize = 'cover';
            largeAvatarInitialsField.style.backgroundPosition = 'center';
            largeAvatarInitialsField.textContent = ''; // Evict original initials string tracking labels placeholders 
            
            showToast('Identity profile avatar preview synchronized within active workspace layout.', 'success');
        };
        
        standardClientSideFileReader.readAsDataURL(structuralUploadedFileHandle);
    });
};