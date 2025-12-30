from flask import Blueprint, request, jsonify

# Create blueprint
alerts_bp = Blueprint("alerts", __name__)


@alerts_bp.route("/api/alerts", methods=["POST"])
def evaluate_alerts():
    """
    Evaluate rule-based workplace alerts using aggregated metrics.
    No individual-level data is processed.
    """
    try:
        data = request.get_json()

        required_fields = [
            "avg_stress",
            "avg_sleep",
            "avg_workHours",
            "engagement_change",
            "absenteeism_rate"
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({
                    "error": f"Missing required field: {field}"
                }), 400

        alerts = []

        # ---- Stress Trend Alert ----
        if data["avg_stress"] >= 4:
            alerts.append({
                "level": "warning",
                "title": "Rising Stress Levels Detected",
                "description":
                    "Average stress levels have remained elevated over recent periods.",
                "scope": "Team-level",
                "action_hint": "Monitor workload and encourage recovery time."
            })

        # ---- Engagement Drop Alert ----
        if data["engagement_change"] <= -0.2:
            alerts.append({
                "level": "critical",
                "title": "Engagement Decline Alert",
                "description":
                    "A significant drop in engagement has been observed compared to the previous period.",
                "scope": "Department-level",
                "action_hint": "Initiate feedback sessions and review team dynamics."
            })

        # ---- Attendance Risk Alert ----
        if data["absenteeism_rate"] >= 0.1:
            alerts.append({
                "level": "info",
                "title": "Attendance Pattern Change",
                "description":
                    "Absenteeism has increased slightly compared to historical averages.",
                "scope": "Organization-level",
                "action_hint": "Track trends and identify potential causes."
            })

        return jsonify({
            "alerts": alerts
        })

    except Exception as e:
        return jsonify({
            "error": "Failed to evaluate alerts",
            "details": str(e)
        }), 500
