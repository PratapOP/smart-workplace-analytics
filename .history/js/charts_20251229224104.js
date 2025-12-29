const createLineChart = (id, label, data, color) => {
  new Chart(document.getElementById(id), {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [{
        label,
        data,
        borderColor: color,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });
};

createLineChart("attendanceChart", "Attendance %", [95, 92, 94, 93, 96], "#4f46e5");
createLineChart("stressChart", "Stress Level", [2, 3, 4, 3, 2], "#ef4444");
createLineChart("productivityChart", "Tasks Completed", [6, 7, 8, 9, 10], "#22c55e");
createLineChart("engagementChart", "Engagement Score", [4, 4.1, 4.2, 4.3, 4.5], "#f59e0b");
