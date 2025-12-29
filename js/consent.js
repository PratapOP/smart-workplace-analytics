    const CONSENT_KEY = "workplace_consent";

    document.addEventListener("DOMContentLoaded", () => {
    const consentOverlay = document.getElementById("consentOverlay");
    const acceptBtn = document.getElementById("acceptConsent");
    const declineBtn = document.getElementById("declineConsent");

    const consentGiven = localStorage.getItem(CONSENT_KEY);

    if (!consentGiven) {
        consentOverlay.classList.remove("hidden");
        disableDashboard();
    }

    acceptBtn.addEventListener("click", () => {
        localStorage.setItem(CONSENT_KEY, "true");
        consentOverlay.classList.add("hidden");
        enableDashboard();
    });

    declineBtn.addEventListener("click", () => {
        localStorage.setItem(CONSENT_KEY, "false");
        showConsentBlockedState();
    });
    });

    function disableDashboard() {
    document.querySelectorAll(".card").forEach(card => {
        card.style.filter = "blur(6px)";
        card.style.pointerEvents = "none";
    });
    }

    function enableDashboard() {
    document.querySelectorAll(".card").forEach(card => {
        card.style.filter = "none";
        card.style.pointerEvents = "auto";
    });
    }

    function showConsentBlockedState() {
    document.querySelectorAll(".card").forEach(card => {
        card.innerHTML = `
        <h2>Consent Required</h2>
        <p class="muted">
            You have declined data processing consent.
            Analytics and insights are unavailable.
        </p>
        `;
    });

    document.getElementById("consentOverlay").classList.add("hidden");
    }
