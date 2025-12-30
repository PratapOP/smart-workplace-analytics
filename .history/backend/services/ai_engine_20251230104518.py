import numpy as np
from flask import current_app
import joblib
import os

from services.ai_summary import build_ai_summary


# Cache model in memory
_model = None


def _load_model():
    """
    Load the calibrated ML model once and reuse it.
    """
    global _model

    if _model is None:
        model_path = current_app.config.get("ML_MODEL_PATH")

        if not model_path or not os.path.exists(model_path):
            raise FileNotFoundError("Calibrated ML model not found.")

        _model = joblib.load(model_path)

    return _model


def generate_report_ai_summary(aggregated_metrics: dict) -> str:
    """
    Generate an AI-powered executive summary for reports.

    Input: aggregated metrics only (privacy-safe)
    Output: human-readable, ethical AI summary
    """

    # ---- Validate inputs ----
    required_fields = [
        "stress",
        "sleep",
        "workHours",
        "engagement",
        "productivity"
    ]

    for field in required_fields:
        if field not in aggregated_metrics:
            raise ValueError(f"Missing required field: {field}")

    # ---- Prepare feature vector (order MUST match training) ----
    features = np.array([[
        float(aggregated_metrics["stress"]),
        float(aggregated_metrics["sleep"]),
        float(aggregated_metrics["workHours"]),
        float(aggregated_metrics["engagement"]),
        float(aggregated_metrics["productivity"])
    ]])

    # ---- ML inference ----
    model = _load_model()
    probabilities = model.predict_proba(features)[0]
    risk_level = int(np.argmax(probabilities))
    confidence = round(max(probabilities) * 100)

    # ---- Delegate wording to summary builder ----
    summary = build_ai_summary(
        risk_level=risk_level,
        confidence=confidence,
        metrics=aggregated_metrics
    )

    return summary
