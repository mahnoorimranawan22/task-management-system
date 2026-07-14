/**
 * Master Framework System Dashboard Orchestration Core Engine Engine
 */

// Application Global State In-Memory Allocations Storage Matrix
let globalTasksCollection = [];
let activeUserSessionContext = null;

document.addEventListener('DOMContentLoaded', () => {
    // Structural Route Guard Gate verification sequences mapping security rules
    const targetTokenKey = localStorage.getItem('task_jwt_token');
    const targetUserDataString = localStorage.getItem('task_logged_user');

    if (!targetTokenKey || !targetUserDataString) {
        localStorage.clear();
        window.location.href = 'login.html';
        return;
    }

    activeUserSessionContext = JSON.parse(targetUserDataString);

    // Bootstrap Active UI Elements Initialization Processing Components
    instantiateDashboardUIHeaderProfile();
    setupDashboardEventTriggers();
    synchronizeEcosystemDataWorkspace();
});

/**
 * Syncs user identification details directly into specific view fields elements
 */
const instantiateDashboardUIHeaderProfile = () => {
    const nameDisplayField = document.getElementById('user-display-name');
    const avatarInitialsField = document.getElementById('user-avatar-initials');

    if (nameDisplayField && activeUserSessionContext.name) {
        nameDisplayField.textContent = activeUserSessionContext.name;
    }

    if (avatarInitialsField && activeUserSessionContext.name) {
        const structuralNameParts = activeUserSessionContext.name.split(' ');
        const initialsString = structuralNameParts.map(part => part[0]).join('').toUpperCase().substring(0, 2);
        avatarInitialsField.textContent = initialsString;
    }
};

/**
 * Attaches operational click event handlers securely across DOM structures
 */
const setupDashboardEventTriggers = () => {
    const logoutBtn = document.getElementById('logout-trigger-btn');
    const themeBtn = document.getElementById('theme-toggle-btn');
    
    // Modal Interaction Component Handles
    const openAddModalBtn = document.getElementById('open-add-modal-btn');
    const closeFormModalBtn = document.getElementById('close-form-modal-btn');
    const cancelFormModalBtn = document.getElementById('cancel-form-modal-btn');
    const dataMutationForm = document.getElementById('dashboard-task-mutation-form');
    
    // Core Queries Tracking Input Event Fields Hooks
    const searchInput = document.getElementById('task-search-input');
    const prioritySelect = document.getElementById('filter-priority-select');
    const statusSelect = document.getElementById('filter-status-select');
    const exportCsvBtn = document.getElementById('export-csv-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear();
            showToast('Ecosystem authorization session cleared. Exiting workspace context...', 'success');
            setTimeout(() => window.location.href = 'index.html', 800);
        });
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const compiledTargetSkin = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', compiledTargetSkin);
            localStorage.setItem('task_app_theme', compiledTargetSkin);
            themeBtn.innerHTML = compiledTargetSkin === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
        });
    }

    // Modal Control Orchestrations Matrix Click Wireframes
    if (openAddModalBtn) {
        openAddModalBtn.addEventListener('click', () => toggleTaskFormModalVisibility(true));
    }
    if (closeFormModalBtn) closeFormModalBtn.addEventListener('click', () => toggleTaskFormModalVisibility(false));
    if (cancelFormModalBtn) cancelFormModalBtn.addEventListener('click', () => toggleTaskFormModalVisibility(false));

    if (dataMutationForm) {
        dataMutationForm.addEventListener('submit', handleTaskFormSubmissionPayloadEvent);
    }

    // Realtime UI Filter Synchronizations Framework Listeners Attachments
    if (searchInput) searchInput.addEventListener('input', executeClientSideFilteringAnalysis);
    if (prioritySelect) prioritySelect.addEventListener('change', executeClientSideFilteringAnalysis);
    if (statusSelect) statusSelect.addEventListener('change', executeClientSideFilteringAnalysis);
    
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', triggerTasksCollectionCSVExportDownloader);
    }
};

/**
 * Synchronizes client collections with remote database sources over API endpoints
 */
const synchronizeEcosystemDataWorkspace = async () => {
    try {
        renderLoadingPlaceholdersStateAcrossLanes();
        const apiResponsePayload = await makeNetworkRequest('/tasks', 'GET');
        globalTasksCollection = apiResponsePayload.data || [];
        
        executeClientSideFilteringAnalysis();
    } catch (apiWorkspaceSyncError) {
        showToast(apiWorkspaceSyncError.message || 'Error tracking database sync parameters compilation.', 'error');
    }
};

/**
 * Operates standard form validation mapping inputs onto structural query modifications configurations
 */
const handleTaskFormSubmissionPayloadEvent = async (e) => {
    e.preventDefault();
    
    const hiddenTaskIdAnchor = document.getElementById('form-target-task-id-hidden-anchor').value;
    const titleValue = document.getElementById('task-title-input-field').value.trim();
    const descValue = document.getElementById('task-desc-textarea-field').value.trim();
    const priorityValue = document.getElementById('task-priority-select-field').value;
    const statusValue = document.getElementById('task-status-select-field').value;

    const documentContextBodyPayload = {
        title: titleValue,
        description: descValue,
        priority: priorityValue,
        status: statusValue
    };

    try {
        if (hiddenTaskIdAnchor) {
            // Update Operation Pipeline Flow Paths
            await makeNetworkRequest(`/tasks/${hiddenTaskIdAnchor}`, 'PUT', documentContextBodyPayload);
            showToast('Task specification documents modified safely inside system collections.', 'success');
        } else {
            // Instantiation Core Operation Path Execution Block
            await makeNetworkRequest('/tasks', 'POST', documentContextBodyPayload);
            showToast('Fresh work item entity tracking record instantiated successfully.', 'success');
        }

        toggleTaskFormModalVisibility(false);
        synchronizeEcosystemDataWorkspace();
    } catch (operationPersistenceErrorLog) {
        showToast(operationPersistenceErrorLog.message || 'Payload schema checks encountered structural formatting rejections.', 'error');
    }
};

/**
 * Opens or closes the management overlay display pane smoothly and resets state variables cleanly
 */
const toggleTaskFormModalVisibility = (forceOpen = true, referenceTaskObject = null) => {
    const modalOverlayElement = document.getElementById('task-form-modal-overlay');
    const formElement = document.getElementById('dashboard-task-mutation-form');
    const modalTitleElement = document.getElementById('modal-box-title-context-string');

    if (!modalOverlayElement || !formElement) return;

    if (forceOpen) {
        if (referenceTaskObject) {
            modalTitleElement.textContent = 'Modify Core Work Item Configurations';
            document.getElementById('form-target-task-id-hidden-anchor').value = referenceTaskObject._id;
            document.getElementById('task-title-input-field').value = referenceTaskObject.title;
            document.getElementById('task-desc-textarea-field').value = referenceTaskObject.description || '';
            document.getElementById('task-priority-select-field').value = referenceTaskObject.priority;
            document.getElementById('task-status-select-field').value = referenceTaskObject.status;
        } else {
            modalTitleElement.textContent = 'Instantiate Fresh Work Item';
            formElement.reset();
            document.getElementById('form-target-task-id-hidden-anchor').value = '';
        }
        modalOverlayElement.classList.remove('hidden');
    } else {
        modalOverlayElement.classList.add('hidden');
        formElement.reset();
    }
};

/**
 * Evaluates tracking control configurations parameters across standard in-memory caches to populate views dynamically
 */
const executeClientSideFilteringAnalysis = () => {
    const searchFilterPhrase = document.getElementById('task-search-input').value.toLowerCase().trim();
    const priorityFilterChoice = document.getElementById('filter-priority-select').value;
    const statusFilterChoice = document.getElementById('filter-status-select').value;

    const filteredCollectionResult = globalTasksCollection.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchFilterPhrase) || 
                              (task.description && task.description.toLowerCase().includes(searchFilterPhrase));
        const matchesPriority = !priorityFilterChoice || task.priority === priorityFilterChoice;
        const matchesStatus = !statusFilterChoice || task.status === statusFilterChoice;

        return matchesSearch && matchesPriority && matchesStatus;
    });

    populateKanbanBoardLaneInterfaces(filteredCollectionResult);
    recalculateDashboardAnalyticalSummaries(filteredCollectionResult);
};

/**
 * Processes data arrays matching status fields parameters directly onto physical lane structures
 */
const populateKanbanBoardLaneInterfaces = (tasksToRenderArray) => {
    const lanesMappingObject = {
        'pending': document.getElementById('lane-dropzone-pending'),
        'in-progress': document.getElementById('lane-dropzone-in-progress'),
        'completed': document.getElementById('lane-dropzone-completed')
    };

    // Erase current visual instances cleanly prior to parsing updates sequence
    Object.values(lanesMappingObject).forEach(zone => { if(zone) zone.innerHTML = ''; });

    const structuralCountersTrackingMap = { 'pending': 0, 'in-progress': 0, 'completed': 0 };

    if (tasksToRenderArray.length === 0) {
        Object.keys(lanesMappingObject).forEach(statusKey => {
            if (lanesMappingObject[statusKey]) {
                lanesMappingObject[statusKey].innerHTML = `
                    <div class="empty-state-card-placeholder">
                        <i class="fa-solid fa-cubes-stacked"></i>
                        <p>Zero active items match parameters configuration rules.</p>
                    </div>`;
            }
        });
    } else {
        tasksToRenderArray.forEach(task => {
            const targetDropzoneContainer = lanesMappingObject[task.status];
            if (targetDropzoneContainer) {
                structuralCountersTrackingMap[task.status]++;
                
                // Construct standard interface element representation safely
                const cardNodeElement = document.createElement('div');
                cardNodeElement.className = 'task-document-card';
                cardNodeElement.id = `task-card-id-node-${task._id}`;
                
                // Configure native standard browser drag attribute vectors configurations 
                cardNodeElement.setAttribute('draggable', 'true');
                cardNodeElement.dataset.internalIdRef = task._id;

                const trackingDateLabel = task.createdAt ? new Date(task.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric'}) : 'Realtime';

                cardNodeElement.innerHTML = `
                    <div class="card-top-row">
                        <span class="priority-pill-badge p-${task.priority}">${task.priority}</span>
                        <button class="card-action-trigger-dots-btn" onclick="triggerDirectTaskCardEdit('${task._id}')" title="Configure document configurations"><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                    <div class="task-card-body-meta">
                        <h4>${escapeHTMLDataString(task.title)}</h4>
                        <p>${escapeHTMLDataString(task.description || 'No additional contexts provided.')}</p>
                    </div>
                    <div class="card-bottom-row-tray">
                        <span class="timestamp-tracking-indicator"><i class="fa-regular fa-clock"></i> ${trackingDateLabel}</span>
                        <div class="action-interactive-buttons-group">
                            ${task.status !== 'completed' ? `<button class="card-icon-action-trigger color-success-hover" onclick="triggerDirectTaskCompletionRoute('${task._id}')" title="Mark work item finished verification"><i class="fa-solid fa-check"></i></button>` : ''}
                            <button class="card-icon-action-trigger color-danger-hover" onclick="triggerDirectTaskDeletionRoute('${task._id}')" title="Permanently expunge item tracking instance"><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                    </div>
                `;

                // Attach drag listeners securely using native framework modules
                attachNativeDragDropFunctionalEmitters(cardNodeElement);
                
                // Remove temporary placeholder text if it's the first card entering the view lane
                const genericPlaceholder = targetDropzoneContainer.querySelector('.empty-state-card-placeholder');
                if (genericPlaceholder) genericPlaceholder.remove();

                targetDropzoneContainer.appendChild(cardNodeElement);
            }
        });
    }

    // Sync structural counter fields arrays
    Object.keys(structuralCountersTrackingMap).forEach(key => {
        const counterNode = document.getElementById(`counter-lane-${key}`);
        if(counterNode) counterNode.textContent = structuralCountersTrackingMap[key];
    });

    // Reinitialize systemic lane target receivers listeners hookups
    initializeNativeDragDropReceiversInfrastructure();
};

/**
 * Triggers modal view pre-populated with cached state parameters values
 */
window.triggerDirectTaskCardEdit = (taskIdValue) => {
    const discoveredTaskObj = globalTasksCollection.find(t => t._id === taskIdValue);
    if (discoveredTaskObj) {
        toggleTaskFormModalVisibility(true, discoveredTaskObj);
    }
};

/**
 * Directly hits state change completion interfaces on backend channels
 */
window.triggerDirectTaskCompletionRoute = async (taskIdValue) => {
    try {
        await makeNetworkRequest(`/tasks/${taskIdValue}/complete`, 'PATCH');
        showToast('Work item lifecycle successfully marked executed.', 'success');
        synchronizeEcosystemDataWorkspace();
    } catch (completionMutationApiError) {
        // Fallback option matrix handling if PATCH endpoint variants face routing structure issues
        try {
            const existingTask = globalTasksCollection.find(t => t._id === taskIdValue);
            if(existingTask) {
                await makeNetworkRequest(`/tasks/${taskIdValue}`, 'PUT', { ...existingTask, status: 'completed' });
                showToast('Work item status synchronized safely to completed.', 'success');
                synchronizeEcosystemDataWorkspace();
            }
        } catch(putFallbackError) {
            showToast(completionMutationApiError.message || 'State modification request declined by remote system gateways.', 'error');
        }
    }
};

/**
 * Forces permanent hard eviction routines over referenced elements IDs records
 */
window.triggerDirectTaskDeletionRoute = async (taskIdValue) => {
    if (!confirm('Are you absolutely certain you want to permanently erase this work item tracker instance? This deployment choice cannot be rolled back.')) return;
    
    try {
        await makeNetworkRequest(`/tasks/${taskIdValue}`, 'DELETE');
        showToast('Task document permanently deleted from active collections contexts.', 'success');
        synchronizeEcosystemDataWorkspace();
    } catch (deletionActionApiError) {
        showToast(deletionActionApiError.message || 'Ecosystem security definitions blocked execution parameter.', 'error');
    }
};

/**
 * Recalculates metrics and triggers background visual updates routines smoothly
 */
const recalculateDashboardAnalyticalSummaries = (activeCollectionScope) => {
    const totalCount = activeCollectionScope.length;
    const pendingCount = activeCollectionScope.filter(t => t.status === 'pending').length;
    const progressCount = activeCollectionScope.filter(t => t.status === 'in-progress').length;
    const completedCount = activeCollectionScope.filter(t => t.status === 'completed').length;

    // Direct text value adjustments injection sequences
    document.getElementById('stat-total-count').textContent = totalCount;
    document.getElementById('stat-pending-count').textContent = pendingCount;
    document.getElementById('stat-progress-count').textContent = progressCount;
    document.getElementById('stat-completed-count').textContent = completedCount;

    // Fire processing transformations to handle analytical visuals updates
    renderDashboardAnalyticalDistributionCharts(activeCollectionScope);
    
    // Process complex mathematical equations tracking ratios smoothly
    const ratioCalculationValue = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    
    const radialTextLabelNode = document.getElementById('radial-percentage-display-string');
    const radialPathStrokeNode = document.getElementById('radial-progress-bar-path');

    if(radialTextLabelNode) radialTextLabelNode.textContent = `${ratioCalculationValue}%`;
    if(radialPathStrokeNode) {
        // Translate numeric percentage value spaces directly onto SVG circle tracking metrics formulas properties bounds
        radialPathStrokeNode.setAttribute('stroke-dasharray', `${ratioCalculationValue}, 100`);
    }
};

/**
 * Compiles dynamic structures to prevent browser structural string scripting infections inside system inputs loops
 */
const escapeHTMLDataString = (rawStringData) => {
    if (!rawStringData) return '';
    return rawStringData
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

/**
 * Sets temporary clean modern CSS waiting animations across interface frames
 */
const renderLoadingPlaceholdersStateAcrossLanes = () => {
    const trackingLanesArray = [
        document.getElementById('lane-dropzone-pending'),
        document.getElementById('lane-dropzone-in-progress'),
        document.getElementById('lane-dropzone-completed')
    ];

    trackingLanesArray.forEach(laneNode => {
        if (laneNode) {
            laneNode.innerHTML = `
                <div class="empty-state-card-placeholder">
                    <i class="fa-solid fa-spinner fa-spin-offset-loading spinner-icon" style="font-size:1.5rem; color:#6366f1;"></i>
                    <p style="font-size:0.78rem; opacity:0.8;">Fetching target collection indices matrices parameters...</p>
                </div>`;
        }
    });
};

/**
 * Compiles structural internal task collection items directly onto comma separated rows downloads formats values
 */
const triggerTasksCollectionCSVExportDownloader = () => {
    if (globalTasksCollection.length === 0) {
        showToast('Zero operational items tracked inside datastore buffers available for transfer export routing actions.', 'error');
        return;
    }

    // Compose standard metadata row string labels tracking keys definitions
    let standardCsvOutputBody = 'Task_Database_ID,Task_Title,Task_Description,Lifecycle_Status,Urgency_Priority,Created_Timestamp\r\n';

    globalTasksCollection.forEach(t => {
        const structuralEscapedTitle = `"${t.title.replace(/"/g, '""')}"`;
        const structuralEscapedDesc = `"${(t.description || '').replace(/"/g, '""')}"`;
        standardCsvOutputBody += `${t._id},${structuralEscapedTitle},${structuralEscapedDesc},${t.status},${t.priority},${t.createdAt || ''}\r\n`;
    });

    // Deploy programmatic document transfer download payload link triggers directly using browser resource allocations
    const automatedTransferBlob = new Blob([standardCsvOutputBody], { type: 'text/csv;charset=utf-8;' });
    const virtualLinkElement = document.createElement('a');
    
    const virtualResourceUrl = URL.createObjectURL(automatedTransferBlob);
    virtualLinkElement.setAttribute('href', virtualResourceUrl);
    virtualLinkElement.setAttribute('download', `TaskPro_Export_DataReport_${new Date().toISOString().split('T')[0]}.csv`);
    virtualLinkElement.style.visibility = 'hidden';
    
    document.body.appendChild(virtualLinkElement);
    virtualLinkElement.click();
    document.body.removeChild(virtualLinkElement);
    showToast('Task collections safely compiled and exported into structural CSV spreadsheets format.', 'success');
};