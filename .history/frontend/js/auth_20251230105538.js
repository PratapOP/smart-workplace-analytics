/**
 * Authentication / User Context (Frontend Simulation)
 *
 * NOTE:
 * - This is a placeholder until backend auth is added
 * - Structure matches backend User model
 */

const currentUser = {
  id: 1,
  name: "Abhiuday",
  email: "abhiuday@example.com",
  role: "HR", // HR | MANAGER | EMPLOYEE
  isActive: true
};

/**
 * Render role badge in navbar
 */
document.addEventListener("DOMContentLoaded", () => {
  const roleBadge = document.getElementById("userRoleBadge");

  if (!roleBadge) return;

  roleBadge.textContent = currentUser.role;
});
