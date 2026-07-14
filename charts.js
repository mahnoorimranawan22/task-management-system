/**
 * Modern Custom Analytical Pure DOM Graphical Render Engine Subsystem
 */

/**
 * Constructs clean, styled visual data bar rows inside target container elements manually using standard components
 * @param {Array} collectionDataPool - Array containing operational tasks records context indices
 */
const renderDashboardAnalyticalDistributionCharts = (collectionDataPool) => {
    const targetChartContainerNode = document.getElementById('priority-distribution-chart-container');
    if (!targetChartContainerNode) return;

    // Isolate calculation volumes metrics parameters profiles tracking
    const overallTotalCount = collectionDataPool.length;
    
    const countHighUrgency = collectionDataPool.filter(t => t.priority === 'high').length;
    const countMediumUrgency = collectionDataPool.filter(t => t.priority === 'medium').length;
    const countLowUrgency = collectionDataPool.filter(t => t.priority === 'low').length;

    // Formulate relative numeric ratios spaces configurations metrics parameters
    const factorRatioPercentageHigh = overallTotalCount > 0 ? Math.round((countHighUrgency / overallTotalCount) * 100) : 0;
    const factorRatioPercentageMedium = overallTotalCount > 0 ? Math.round((countMediumUrgency / overallTotalCount) * 100) : 0;
    const factorRatioPercentageLow = overallTotalCount > 0 ? Math.round((countLowUrgency / overallTotalCount) * 100) : 0;

    // Programmatically populate structural charts container using standard template models elements
    targetChartContainerNode.innerHTML = `
        <!-- High Priority Metric Bar Rendering Track Row -->
        <div class="custom-chart-bar-row">
            <div class="chart-row-meta-labels">
                <span>High Urgency Actions</span>
                <span>${countHighUrgency} Elements (${factorRatioPercentageHigh}%)</span>
            </div>
            <div class="chart-bar-track-line">
                <div class="chart-bar-fill-dynamic" style="width: ${factorRatioPercentageHigh}%; background-color: var(--color-high);"></div>
            </div>
        </div>

        <!-- Medium Priority Metric Bar Rendering Track Row -->
        <div class="custom-chart-bar-row">
            <div class="chart-row-meta-labels">
                <span>Medium Priority Track</span>
                <span>${countMediumUrgency} Elements (${factorRatioPercentageMedium}%)</span>
            </div>
            <div class="chart-bar-track-line">
                <div class="chart-bar-fill-dynamic" style="width: ${factorRatioPercentageMedium}%; background-color: var(--color-medium);"></div>
            </div>
        </div>

        <!-- Low Priority Metric Bar Rendering Track Row -->
        <div class="custom-chart-bar-row">
            <div class="chart-row-meta-labels">
                <span>Low Priority Buffer</span>
                <span>${countLowUrgency} Elements (${factorRatioPercentageLow}%)</span>
            </div>
            <div class="chart-bar-track-line">
                <div class="chart-bar-fill-dynamic" style="width: ${factorRatioPercentageLow}%; background-color: var(--color-low);"></div>
            </div>
        </div>
    `;
};