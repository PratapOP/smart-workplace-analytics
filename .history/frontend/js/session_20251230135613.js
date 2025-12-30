    /**
     * Session Manager
     *
     * Responsibilities:
     * - Read logged-in user from sessionStorage
     * - Expose it as `currentUser` (expected by dashboard)
     * - Redirect to login if no session exists
     */

    const SESSION_USER_KEY = "smart_workplace_user";

    (function initializeSession() {
    const sessionData = sessionStorage.getItem(SESSION_USER_KEY);

    // If no session, redirect to login
    if (!sessionData) {
        window.location.href = "login.html";
        return;
    }

    try {
        const parsedUser = JSON.parse(sessionData);

        // Validate minimum required fields
        if (!parsedUser.role || !parsedUser.email) {
        sessionStorage.removeItem(SESSION_USER_KEY);
        window.location.href = "login.html";
        return;
        }

        // Expose globally (used by auth.js, dashboard.js, ai.js, etc.)
        window.currentUser = {
        email: parsedUser.email,
        role: parsedUser.role,
        isAuthenticated: true
        };

    } catch (error) {
        console.error("Invalid session data:", error);
        sessionStorage.removeItem(SESSION_USER_KEY);
        window.location.href = "login.html";
    }
    })();
