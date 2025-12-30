/**
 * Dashboard Role-Based Rendering
 *
 * This file controls which dashboard sections
 * are visible based on the current user's role.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof currentUser === "undefined") {
    console.warn("Dashboard: currentUser not defined");
    return;
  }

  const userRole = currentUser.role;
  const sections = document.querySelectorAll("[data-role]");

  sections.forEach(section => {
    const allowedRoles = section.dataset.role.split(" ");

    if (!allowedRoles.includes(userRole)) {
      section.style.display = "none";
    }
  });
});
