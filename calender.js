/**
 * Dynamic Operational Timelines Scheduler Grid Controller Engine
 */

let internalCalendarRenderDateTracker = new Date();
let contextualCalendarSyncedTasksCache = [];

document.addEventListener('DOMContentLoaded', () => {
    // Authentications Check Gate Setup Configuration Matrix Rules
    if (!localStorage.getItem('task_jwt_token')) {
        window.location.href = 'login.html';
        return;
    }

    setupCalendarInterfaceNavigationControls();
    fetchTimelineTasksCollectionData();
});

const setupCalendarInterfaceNavigationControls = () => {
    const prevTrigger = document.getElementById('calendar-prev-month-trigger');
    const nextTrigger = document.getElementById('calendar-next-month-trigger');
    const logoutBtn = document.getElementById('logout-trigger-btn');

    if (prevTrigger) {
        prevTrigger.addEventListener('click', () => {
            internalCalendarRenderDateTracker.setMonth(internalCalendarRenderDateTracker.getMonth() - 1);
            generateChronologicalMatrixInterfaceView();
        });
    }

    if (nextTrigger) {
        nextTrigger.addEventListener('click', () => {
            internalCalendarRenderDateTracker.setMonth(internalCalendarRenderDateTracker.getMonth() + 1);
            generateChronologicalMatrixInterfaceView();
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'index.html';
        });
    }
};

const fetchTimelineTasksCollectionData = async () => {
    try {
        const responseDataPayload = await makeNetworkRequest('/tasks', 'GET');
        contextualCalendarSyncedTasksCache = responseDataPayload.data || [];
        generateChronologicalMatrixInterfaceView();
    } catch (timelineFetchErrorLog) {
        showToast('Timeline calendar matrix tracking failed synchronization with datastore APIs.', 'error');
    }
};

/**
 * Builds standard calendar day cells configurations mapping arrays accurately programmatically
 */
const generateChronologicalMatrixInterfaceView = () => {
    const mountPointContainer = document.getElementById('calendar-grid-slots-mount-point');
    const titleHeaderString = document.getElementById('calendar-month-year-title-string');

    if (!mountPointContainer || !titleHeaderString) return;

    mountPointContainer.innerHTML = '';

    const currentYearInt = internalCalendarRenderDateTracker.getFullYear();
    const currentMonthInt = internalCalendarRenderDateTracker.getMonth();

    // Set header month metadata label values components parameters
    const stringMonthLabelValue = internalCalendarRenderDateTracker.toLocaleString('default', { month: 'long' });
    titleHeaderString.textContent = `${stringMonthLabelValue} ${currentYearInt}`;

    // Compute calendar grid layout padding parameters
    const indexFirstDayOfWeekPosition = new Date(currentYearInt, currentMonthInt, 1).getDay();
    const totalDaysInActiveMonthCount = new Date(currentYearInt, currentMonthInt + 1, 0).getDate();

    const timestampTodayObject = new Date();

    // Loop execution to place empty padding cells configuration parameters boxes safely
    for (let padIndex = 0; padIndex < indexFirstDayOfWeekPosition; padIndex++) {
        const structuralPaddingBoxNode = document.createElement('div');
        structuralPaddingBoxNode.className = 'calendar-day-slot-box disabled-padding-slot';
        mountPointContainer.appendChild(structuralPaddingBoxNode);
    }

    // Main collection loop iterating through pure numerical values indices matching days lengths
    for (let dayPivotValue = 1; dayPivotValue <= totalDaysInActiveMonthCount; dayPivotValue++) {
        const dayCellSlotNodeElement = document.createElement('div');
        dayCellSlotNodeElement.className = 'calendar-day-slot-box';

        // Detect if item configuration attributes match current chronological date references
        if (timestampTodayObject.getDate() === dayPivotValue && 
            timestampTodayObject.getMonth() === currentMonthInt && 
            timestampTodayObject.getFullYear() === currentYearInt) {
            dayCellSlotNodeElement.classList.add('today-current-marker');
        }

        dayCellSlotNodeElement.innerHTML = `<span class="day-numeric-label">${dayPivotValue}</span>`;

        // Intercept local task caches to discover match criteria based on document timestamps properties
        const contextualFilterTargetDateString = new Date(currentYearInt, currentMonthInt, dayPivotValue).toDateString();

        const filteredTasksForThisDay = contextualCalendarSyncedTasksCache.filter(task => {
            if (!task.createdAt) return false;
            return new Date(task.createdAt).toDateString() === contextualFilterTargetDateString;
        });

        // Procedurally render individual task chips directly inside the cell grid container array block
        filteredTasksForThisDay.forEach(task => {
            const microChipElementNode = document.createElement('div');
            microChipElementNode.className = `calendar-task-micro-chip-node status-${task.status}`;
            microChipElementNode.textContent = task.title;
            microChipElementNode.setAttribute('title', `[${task.priority.toUpperCase()}] ${task.title}`);
            dayCellSlotNodeElement.appendChild(microChipElementNode);
        });

        mountPointContainer.appendChild(dayCellSlotNodeElement);
    }
};