    /**
     * Export & Reporting Controller
     *
     * Handles report generation workflow and
     * retrieves AI summaries from the backend.
     */

    document.addEventListener("DOMContentLoaded", () => {
    const exportButtons = document.querySelectorAll(".export-btn");
    const scopeSelect = document.getElementById("reportScope");
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");

    if (!exportButtons.length) return;

    exportButtons.forEach(button => {
        button.addEventListener("click", () => {
        const format = getExportFormat(button);
        generateReport(format, scopeSelect, startDateInput, endDateInput);
        });
    });
    });

    /**
     * Determine export format based on button class
     */
    function getExportFormat(button) {
    if (button.classList.contains("pdf")) return "PDF";
    if (button.classList.contains("excel")) return "Excel";
    return "CSV";
    }

    /**
     * Generate report workflow
     */
    async function generateReport(format, scopeSelect, startDateInput, endDateInput) {
    if (!startDateInput.value || !endDateInput.value) {
        alert("Please select a valid date range.");
        return;
    }

    const payload = {
        // Aggregated metrics (placeholder, API-ready)
        stress: 4.0,
        sleep: 6.0,
        workHours: 9.2,
        engagement: 3.4,
        productivity: 7.1
    };

    try {
        const response = await fetch(
        "http://127.0.0.1:5000/api/report-summary",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }
        );

        const data = await response.json();

        showReportConfirmation(format, scopeSelect.value, data.ai_summary);
    } catch (error) {
        console.error("Report generation failed:", error);
        alert("Failed to generate report. Please try again.");
    }
    }

    /**
     * Display report confirmation (placeholder UX)
     */
    function showReportConfirmation(format, scope, aiSummary) {
    alert(
        `${format} Report Generated\n\n` +
        `Scope: ${scope.toUpperCase()}\n\n` +
        `AI Summary:\n${aiSummary}`
    );
    }
