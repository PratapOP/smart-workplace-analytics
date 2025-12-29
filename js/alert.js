    document.addEventListener("DOMContentLoaded", () => {
    const alertsContainer = document.getElementById("alertsContainer");
    if (!alertsContainer) return;

    // Simulated alert data (later from backend)
    const alerts = [
        {
        level: "warning",
        title: "Rising Stress Trend Detected",
        description:
            "Average stress levels have increased steadily over the past 7 days.",
        scope: "Team-level",
        updated: "Today"
        },
        {
        level: "info",
        title: "Attendance Pattern Change",
        description:
            "Late check-ins have slightly increased compared to last week.",
        scope: "Organization-level",
        updated: "Yesterday"
        },
        {
        level: "critical",
        title: "Engagement Drop Alert",
        description:
            "Engagement scores have dropped significantly in one or more teams.",
        scope: "Department-level",
        updated: "2 days ago"
        }
    ];

    alerts.forEach(alert => {
        const alertDiv = document.createElement("div");
        alertDiv.className = `alert ${alert.level}`;

        alertDiv.innerHTML = `
        <div class="alert-title">${alert.title}</div>
        <div class="alert-description">${alert.description}</div>
        <div class="alert-meta">
            ${alert.scope} • Last updated: ${alert.updated}
        </div>
        `;

        alertsContainer.appendChild(alertDiv);
    });
    });
