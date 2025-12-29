const aiContainer = document.getElementById("aiSuggestions");

if (aiContainer) {
  aiContainer.innerHTML = `
    <p><strong>Burnout Risk:</strong> Medium</p>
    <p class="muted">Reason: Increased workload & reduced sleep</p>
    <p><strong>Suggested Action:</strong> Reduce task load temporarily</p>
  `;
}
