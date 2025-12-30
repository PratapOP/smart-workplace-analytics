    /**
     * Alert System UI
     *
     * Displays ethical, trend-based alerts for HR and Managers.
     * Alerts are signals, not judgments.
     */

    document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("alertsContainer");
    if (!container) return;

    // Placeholder alerts (API-ready)
    const alerts = [
        {
        level: "warning",
        title: "Rising Stress Levels Detected",
        description:
            "Average stress levels have increased steadily over the past week.",
        scope: "Team-level",
        actionHint: "Monitor workload and encourage recovery time."
        },
        {
        level: "critical",
        title: "Engagement Decline Alert",
        description:
            "Engagement scores have dropped significantly compared to last period.",
        scope: "Department-level",
        actionHint: "Initiate feedback sessions and review team dynamics."
        },
        {
        level: "info",
        title: "Attendance Pattern Change",
        description:
            "A slight increase in absenteeism has been observed recently.",
        scope: "Organization-level",
        actionHint: "Track trends and identify potential causes."
        }
    ];

    renderAlerts(alerts, container);
    });

    /**
     * Render alert cards
     */
    function renderAlerts(alerts, container) {
    if (!alerts.length) {
        container.innerHTML = `
        <p class="muted">
            No alerts at this time. Workplace indicators are stable.
        </p>
        `;
        return;
    }

    alerts.forEach(alert => {
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert";

        alertDiv.innerHTML = `
        <div class="alert-title">${alert.title}</div>
        <div class="alert-description">${alert.description}</div>
        <div class="muted">
            ${alert.scope} • Suggested Action: ${alert.actionHint}
        </div>
        `;

        container.appendChild(alertDiv);
    });
    }
