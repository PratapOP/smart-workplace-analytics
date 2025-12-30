/**
 * Login Controller (UI-only, Session-based)
 *
 * Responsibilities:
 * - Capture login form data
 * - Create a user session
 * - Redirect to dashboard
 *
 * NOTE:
 * - This replaces hardcoded users later
 * - Backend auth can be plugged in without UI rewrite
 */

const SESSION_USER_KEY = "smart_workplace_user";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;

    if (!email || !role) {
      alert("Please provide both email and role.");
      return;
    }

    const userSession = {
      email,
      role,
      loginTime: new Date().toISOString()
    };

    // Store session (tab-based, safer than localStorage for auth)
    sessionStorage.setItem(
      SESSION_USER_KEY,
      JSON.stringify(userSession)
    );

    // Redirect to dashboard
    window.location.href = "index.html";
  });
});
