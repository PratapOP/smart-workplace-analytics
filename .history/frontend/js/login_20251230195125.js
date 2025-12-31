/**
 * Login Controller (Backend-connected)
 *
 * Responsibilities:
 * - Send login request to backend
 * - Store auth token + user session
 * - Redirect to dashboard
 */

const SESSION_USER_KEY = "smart_workplace_user";
const AUTH_API_URL = "http://127.0.0.1:5000/api/auth/login";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;

    if (!email || !role) {
      alert("Please provide both email and role.");
      return;
    }

    try {
      const response = await fetch(AUTH_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, role })
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Login failed");
        return;
      }

      const data = await response.json();

      const userSession = {
        token: data.token,
        email: data.user.email,
        role: data.user.role,
        expiresIn: data.expires_in,
        loginTime: new Date().toISOString()
      };

      // Store authenticated session
      sessionStorage.setItem(
        SESSION_USER_KEY,
        JSON.stringify(userSession)
      );

      // Redirect to dashboard
      window.location.href = "index.html";

    } catch (err) {
      console.error("Login error:", err);
      alert("Unable to connect to authentication service.");
    }
  });
});
