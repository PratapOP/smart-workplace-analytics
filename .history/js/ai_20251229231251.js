    /**
     * AI Suggestions Engine
     * ---------------------
     * Hybrid rule-based intelligence (ML-ready)
     * Ethical, explainable, role-aware
     */

    document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("aiSuggestions");
    if (!container) return;

    // Safety: ensure user context exists
    if (typeof currentUser === "undefined" || !currentUser.role) {
        console.warn("AI Engine: User context missing");
        return;
    }

    const role = currentUser.role;

    /**
     * Simulated aggregated signals
     * (Later replaced by backend / ML model output)
     */
    const signals = {
        stress: 4.1,        // avg stress (1–5)
        sleep: 5.8,         // avg sleep hours
        workHours: 9.5,     // avg daily work hours
        engagement: 3.2,    // engagement score (1–5)
        productivity: 7     // tasks/day or normalized score
    };

    const suggestions = generateAISuggestions(signals, role);

    // Empty state
    if (suggestions.length === 0) {
        container.innerHTML = `
        <p class="muted">
            No actionable insights detected at the moment.
            Current trends appear stable.
        </p>
        `;
        return;
    }

    // Render AI suggestions
    suggestions.forEach(item => {
        const div = document.createElement("div");
        div.className = "ai-item";

        div.innerHTML = `
        <div class="ai-title">${item.title}</div>
        <div class="ai-confidence">Confidence: ${item.confidence}%</div>
        <div class="ai-reason">
            <strong>Reason:</strong> ${item.reason}
        </div>
        <div class="ai-action">
            <strong>Suggested Action:</strong> ${item.action}
        </div>
        <div class="ai-scope">${item.scope}</div>
        `;

        container.appendChild(div);
    });
    });

    /**
     * Core AI suggestion logic
     * Rule-based now, ML-backed later
     */
    function generateAISuggestions(signals, role) {
    const results = [];

    /* -------------------------------
        Burnout Risk Detection
    --------------------------------*/
    if (
        signals.stress >= 4 &&
        signals.sleep < 6 &&
        signals.workHours > 9
    ) {
        results.push({
        title: "Potential Burnout Risk",
        confidence: 82,
        reason:
            "Sustained high stress combined with reduced sleep and extended work hours.",
        action:
            role === "EMPLOYEE"
            ? "Consider taking short breaks, prioritizing rest, and discussing workload concerns."
            : "Review workload distribution and encourage recovery time across teams.",
        scope:
            role === "EMPLOYEE"
            ? "Personal wellbeing insight"
            : "Aggregated team-level insight"
        });
    }

    /* -------------------------------
        Engagement Opportunity
    --------------------------------*/
    if (signals.engagement < 3.5) {
        results.push({
        title: "Engagement Improvement Opportunity",
        confidence: 74,
        reason:
            "Engagement scores have declined while productivity remains relatively stable.",
        action:
            role === "EMPLOYEE"
            ? "Seek feedback opportunities and align tasks with personal interests."
            : "Introduce feedback sessions, recognition programs, or team check-ins.",
        scope:
            role === "EMPLOYEE"
            ? "Personal development insight"
            : "Organization-level insight"
        });
    }

    /* -------------------------------
        Productivity Optimization
    --------------------------------*/
    if (signals.productivity >= 7 && signals.workHours > 9) {
        results.push({
        title: "Efficiency Optimization Opportunity",
        confidence: 68,
        reason:
            "High output is being achieved, but with longer-than-optimal work hours.",
        action:
            role === "EMPLOYEE"
            ? "Experiment with focused work blocks to maintain output while reducing hours."
            : "Encourage focused work periods and reduce unnecessary meetings.",
        scope:
            role === "EMPLOYEE"
            ? "Personal productivity insight"
            : "Team-level insight"
        });
    }

    return results;
    }
