from flask import Blueprint, request, jsonify
from services.ai_summary import generate_ai_summary

reports_bp = Blueprint("reports", __name__)

@reports_bp.route("/api/report-summary", methods=["POST"])
def report_summary():
    data = request.json
    summary = generate_ai_summary(data)
    return jsonify({"ai_summary": summary})
