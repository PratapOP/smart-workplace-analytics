    document.addEventListener("DOMContentLoaded", () => {
    const role = currentUser.role;
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const allowedRoles = card.dataset.role.split(" ");
        if (!allowedRoles.includes(role)) {
        card.style.display = "none";
        }
    });
    });
