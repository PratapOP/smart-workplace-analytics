/**
 * Charts Initialization
 *
 * Uses Chart.js to render analytics visualizations.
 * Data is static for now and will be replaced by API responses later.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderAttendanceChart();
  renderStressChart();
  renderProductivityChart();
  renderEngagementChart();
});

/* -------------------------------
   Attendance Chart
--------------------------------*/
function renderAttendanceChart() {
  const ctx = document.getElementById("attendanceChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Attendance %",
          data: [95, 92, 94, 93, 96],
          borderColor: "#4f46e5",
          backgroundColor: "transparent",
          tension: 0.35
        }
      ]
    },
    options: baseChartOptions("%")
  });
}

/* -------------------------------
   Stress & Wellbeing Chart
--------------------------------*/
function renderStressChart() {
  const ctx = document.getElementById("stressChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Average Stress Level",
          data: [3.2, 3.6, 4.1, 3.8, 3.4],
          borderColor: "#dc2626",
          backgroundColor: "transparent",
          tension: 0.35
        }
      ]
    },
    options: baseChartOptions("")
  });
}

/* -------------------------------
   Productivity Chart
--------------------------------*/
function renderProductivityChart() {
  const ctx = document.getElementById("productivityChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Tasks Completed",
          data: [6, 7, 8, 9, 10],
          backgroundColor: "#16a34a"
        }
      ]
    },
    options: baseBarOptions()
  });
}

/* -------------------------------
   Engagement Chart
--------------------------------*/
function renderEngagementChart() {
  const ctx = document.getElementById("engagementChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Engagement Score",
          data: [4.1, 4.0, 4.2, 4.3, 4.5],
          borderColor: "#f59e0b",
          backgroundColor: "transparent",
          tension: 0.35
        }
      ]
    },
    options: baseChartOptions("")
  });
}

/* -------------------------------
   Shared Chart Options
--------------------------------*/
function baseChartOptions(suffix) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: { size: 12 }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: value => `${value}${suffix}`
        }
      }
    }
  };
}

function baseBarOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
}
