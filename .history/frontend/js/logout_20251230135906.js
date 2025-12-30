/**
 * Logout Controller
 *
 * Responsibilities:
 * - Clear user session
 * - Clear consent state (privacy reset)
 * - Redirect to login page
 */

const SESSION_USER_KEY = "smart_workplace_user";
const CONSENT_STORAGE_KEY = "workplace_analytics_consent";

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    // Clear session (auth)
    sessionStorage.removeItem(SESSION_USER_KEY);

    // Clear consent (privacy)
    localStorage.removeItem(CONSENT_STORAGE_KEY);

    // Redirect to login
    window.location.href = "login.html";
  });
});
