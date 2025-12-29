    document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".export-btn");
    const scopeSelect = document.getElementById("reportScope");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
        if (!startDate.value || !endDate.value) {
            alert("Please select a valid date range.");
            return;
        }

        const format = btn.classList.contains("pdf")
            ? "PDF"
            : btn.classList.contains("excel")
            ? "Excel"
            : "CSV";

        generateReport(format, scopeSelect.value);
        });
    });
    });

    function generateReport(format, scope) {
    alert(
        `${format} report generated successfully.\n\n` +
        `Scope: ${scope.toUpperCase()}\n` +
        `Data: Attendance, Productivity, Engagement (Aggregated)`
    );
    }
