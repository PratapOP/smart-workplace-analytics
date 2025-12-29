    document.addEventListener("DOMContentLoaded", () => {
    const insightsContainer = document.getElementById("trendInsights");
    const buttons = document.querySelectorAll(".trend-btn");

    if (!insightsContainer) return;

    const trendData = {
        weekly: [
        {
            type: "negative",
            title: "Stress Levels Increasing",
            desc: "Average stress has increased by 12% compared to last week.",
            meta: "Team-level insight"
        },
        {
            type: "positive",
            title: "Productivity Stable",
            desc: "Task completion remained stable despite increased workload.",
            meta: "Organization-level insight"
        }
        ],
        monthly: [
        {
            type: "negative",
            title: "Engagement Decline",
            desc: "Employee engagement dropped by 18% month-over-month.",
            meta: "Department-level insight"
        },
        {
            type: "positive",
            title: "Attendance Improvement",
            desc: "Attendance improved by 6% compared to previous month.",
            meta: "Organization-level insight"
        }
        ]
    };

    function renderTrends(period) {
        insightsContainer.innerHTML = "";

        trendData[period].forEach(item => {
        const div = document.createElement("div");
        div.className = `trend-item ${item.type}`;
        div.innerHTML = `
            <div class="trend-title">${item.title}</div>
            <div class="trend-desc">${item.desc}</div>
            <div class="trend-meta">${item.meta}</div>
        `;
        insightsContainer.appendChild(div);
        });
    }

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTrends(btn.dataset.period);
        });
    });

    renderTrends("weekly");
    });
