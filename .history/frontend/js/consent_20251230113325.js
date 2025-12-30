    /**
     * Privacy & Consent Enforcement
     *
     * This module ensures that no analytics, AI insights,
     * or reports are visible unless the user has explicitly
     * provided consent.
     */

    const CONSENT_STORAGE_KEY = "workplace_analytics_consent";

    document.addEventListener("DOMContentLoaded", () => {
    const consentGiven = localStorage.getItem(CONSENT_STORAGE_KEY);

    if (consentGiven !== "true") {
        blockDashboard();
        showConsentModal();
    }
    });

    /**
     * Block all dashboard cards
     */
    function blockDashboard() {
    document.body.style.overflow = "hidden";
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.filter = "blur(6px)";
        card.style.pointerEvents = "none";
    });
    }

    /**
     * Restore dashboard access
     */
    function unblockDashboard() {
    document.body.style.overflow = "auto";
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.filter = "none";
        card.style.pointerEvents = "auto";
    });
    }

    /**
     * Create and display consent modal
     */
    function showConsentModal() {
    const modal = document.createElement("div");
    modal.id = "consentModal";
    modal.innerHTML = `
        <div class="consent-overlay">
        <div class="consent-box">
            <h3>Privacy & Data Usage Consent</h3>
            <p>
            This platform analyzes aggregated workplace data to provide
            insights on wellbeing, productivity, and engagement.
            </p>
            <ul>
            <li>No individual stress data is shared with HR or management</li>
            <li>AI insights are advisory and explainable</li>
            <li>You may withdraw consent at any time</li>
            </ul>
            <div class="consent-actions">
            <button id="declineConsent" class="btn secondary">Decline</button>
            <button id="acceptConsent" class="btn primary">I Agree</button>
            </div>
        </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("acceptConsent").addEventListener("click", () => {
        localStorage.setItem(CONSENT_STORAGE_KEY, "true");
        unblockDashboard();
        modal.remove();
    });

    document.getElementById("declineConsent").addEventListener("click", () => {
        localStorage.setItem(CONSENT_STORAGE_KEY, "false");
        showConsentBlockedState();
        modal.remove();
    });

    document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("privacyBtn");
    if (!btn) return;
        btn.addEventListener("click", () => {
            localStorage.removeItem("workplace_analytics_consent");
            location.reload();
    }

    /**
     * Replace dashboard content if consent is declined
     */
    function showConsentBlockedState() {
    document.body.style.overflow = "hidden";
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.innerHTML = `
        <h3>Consent Required</h3>
        <p class="muted">
            You have declined data processing consent.
            Analytics and insights are unavailable.
        </p>
        `;
        card.style.filter = "none";
    });
    }
