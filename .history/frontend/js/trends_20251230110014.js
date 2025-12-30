    /**
     * Trend Intelligence UI
     *
     * Displays high-level trend insights based on
     * selected time period (weekly / monthly).
     */

    document.addEventListener("DOMContentLoaded", () => {
    const trendContainer = document.getElementById("trendInsights");
    const trendButtons = document.querySelectorAll(".trend-btn");

    if (!trendContainer || !trendButtons.length) return;

    // Default load
    renderTrends("weekly", trendContainer);

    trendButtons.forEach(btn => {
        btn.addEventListener("click", () => {
        trendButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const period = btn.dataset.period;
        renderTrends(period, trendContainer);
        });
    });
    });

    /**
     * Render trend insights based on period
     */
    function renderTrends(period, container) {
    const insights = getTrendInsights(period);

    container.innerHTML = "";

    insights.forEach(insight => {
        const div = document.createElement("div");
        div.className = "ai-item";

        div.innerHTML = `
        <div class="ai-title">${insight.title}</div>
        <div class="ai-confidence">${insight.subtitle}</div>
        <p class="muted">${insight.description}</p>
        `;

        container.appendChild(div);
    });
    }

    /**
     * Placeholder trend insights (API-ready)
     */
    function getTrendInsights(period) {
    if (period === "monthly") {
        return [
        {
            title: "Sustained Workload Increase",
            subtitle: "Monthly Trend",
            description:
            "Average working hours have increased gradually over the past month, suggesting sustained pressure across teams."
        },
        {
            title: "Engagement Stabilization",
            subtitle: "Monthly Trend",
            description:
            "After a period of fluctuation, engagement levels have stabilized, indicating improved consistency."
        }
        ];
    }

    // Weekly (default)
    return [
        {
        title: "Short-Term Stress Spike",
        subtitle: "Weekly Trend",
        description:
            "A brief increase in stress levels was observed mid-week, followed by recovery toward the end of the week."
        },
        {
        title: "Productivity Uptick",
        subtitle: "Weekly Trend",
        description:
            "Productivity showed a modest increase during the latter half of the week, possibly linked to focused task execution."
        }
    ];
    }
