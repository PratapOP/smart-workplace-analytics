from flask import Blueprint, request, jsonify, current_app
from services.ai_engine import generate_report_ai_summary

# Create blueprint
reports_bp = Blueprint("reports", __name__)


@reports_bp.route("/api/report-summary", methods=["POST"])
def report_summary():
    """
    Generate an AI-powered executive summary for reports.
    Accepts aggregated metrics only (no individual-level data).
    """
    try:
        data = request.get_json()

        # ---- Validation: aggregated data only ----
        required_fields = [
            "stress",
            "sleep",
            "workHours",
            "engagement",
            "productivity"
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({
                    "error": f"Missing required field: {field}"
                }), 400

        # ---- Generate AI summary ----
        summary = generate_report_ai_summary(data)

        return jsonify({
            "ai_summary": summary
        })

    except Exception as e:
        return jsonify({
            "error": "Failed to generate report summary",
            "details": str(e)
        }), 500
