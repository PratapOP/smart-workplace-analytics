        const aiContainer = document.getElementById("aiSuggestions");

        if (aiContainer) {
        aiContainer.innerHTML = `
            <p><strong>Burnout Risk:</strong> Medium</p>
         <p class="muted">Reason: Increased workload & reduced sleep</p>
        <p><strong>Suggested Action:</strong> Reduce task load temporarily</p>
    `;
    }

    document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("aiSuggestions");
    if (!container) return;

    const role = currentUser.role;

    // Simulated aggregated signals (later from backend / ML)
    const signals = {
        stress: 4.1,
        sleep: 5.8,
        workHours: 9.5,
        engagement: 3.2,
        productivity: 7
    };

    const suggestions = generateAISuggestions(signals, role);

    suggestions.forEach(item => {
        const div = document.createElement("div");
        div.className = "ai-item";

        div.innerHTML = `
        <div class="ai-title">${item.title}</div>
        <div class="ai-confidence">Confidence: ${item.confidence}%</div>
        <div class="ai-reason"><strong>Reason:</strong> ${item.reason}</div>
        <div class="ai-action"><strong>Suggested Action:</strong> ${item.action}</div>
        <div class="ai-scope">${item.scope}</div>
        `;

        container.appendChild(div);
    });
    });

    function generateAISuggestions(signals, role) {
    const results = [];

    // Burnout risk
    if (signals.stress > 4 && signals.sleep < 6 && signals.workHours > 9) {
        results.push({
        title: "Potential Burnout Risk",
        confidence: 82,
        reason:
            "High stress levels combined with reduced sleep and extended work hours.",
        action:
            role === "EMPLOYEE"
            ? "Consider taking short breaks and discussing workload concerns."
            : "Review workload distribution and encourage recovery time.",
        scope:
            role === "EMPLOYEE"
            ? "Personal wellbeing insight"
            : "Aggregated team-level insight"
        });
    }

    // Engagement improvement
    if (signals.engagement < 3.5) {
        results.push({
        title: "Engagement Improvement Opportunity",
        confidence: 74,
        reason:
            "Engagement scores have declined while productivity remains stable.",
        action:
            role === "EMPLOYEE"
            ? "Seek feedback opportunities and align tasks with interests."
            : "Introduce feedback sessions or recognition initiatives.",
        scope:
            role === "EMPLOYEE"
            ? "Personal development insight"
            : "Organization-level insight"
        });
    }

    // Productivity optimization
    if (signals.productivity >= 7 && signals.workHours > 9) {
        results.push({
        title: "Efficiency Optimization",
        confidence: 68,
        reason:
            "High output achieved with extended work hours.",
        action:
            role === "EMPLOYEE"
            ? "Experiment with focused work blocks to reduce total hours."
            : "Encourage focused work periods and reduce unnecessary meetings.",
        scope:
            role === "EMPLOYEE"
            ? "Personal productivity insight"
            : "Team-level insight"
        });
    }

    return results;
    }

