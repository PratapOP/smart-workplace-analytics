/**
 * AI Suggestions UI
 *
 * Fetches ML-backed insights from backend and
 * renders explainable, ethical recommendations.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("aiSuggestions");
  if (!container) return;

  // Placeholder aggregated signals (API-ready)
  const payload = {
    stress: 4.1,
    sleep: 5.8,
    workHours: 9.5,
    engagement: 3.2,
    productivity: 7.0
  };

  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/predict-risk",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    renderAISuggestions(data, container);

  } catch (error) {
    console.error("AI Suggestions fetch failed:", error);
    container.innerHTML = `
      <p class="muted">
        AI insights are currently unavailable.
      </p>
    `;
  }
});

/**
 * Render AI suggestion cards
 */
function renderAISuggestions(data, container) {
  container.innerHTML = "";

  if (!data || typeof data.risk_level === "undefined") {
    container.innerHTML = `
      <p class="muted">
        No AI insights available at this time.
      </p>
    `;
    return;
  }

  const riskLabels = ["Low", "Moderate", "High"];
  const riskLabel = riskLabels[data.risk_level] || "Unknown";

  const card = document.createElement("div");
  card.className = "ai-item";

  card.innerHTML = `
    <div class="ai-title">
      ${riskLabel} Burnout Risk
    </div>

    <div class="ai-confidence">
      Confidence: ${data.confidence}%
    </div>

    <p class="muted">
      ${data.explanation}
    </p>

    <div class="ai-confidence">
      This insight is advisory and based on aggregated patterns only.
    </div>
  `;

  container.appendChild(card);
}
