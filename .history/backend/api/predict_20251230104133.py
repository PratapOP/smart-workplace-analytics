from flask import Blueprint, request, jsonify, current_app
import numpy as np
import joblib
import os

# Create blueprint
predict_bp = Blueprint("predict", __name__)

# Load ML model once (on first request)
_model = None


def load_model():
    """
    Lazy-load the ML model to avoid reloading on every request.
    """
    global _model
    if _model is None:
        model_path = current_app.config.get("ML_MODEL_PATH")
        if not model_path or not os.path.exists(model_path):
            raise FileNotFoundError("ML model file not found.")
        _model = joblib.load(model_path)
    return _model


@predict_bp.route("/api/predict-risk", methods=["POST"])
def predict_risk():
    """
    Predict workplace risk level using DecisionTreeClassifier
    with calibrated probabilities.
    """
    try:
        data = request.get_json()

        # ---- Input validation ----
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

        # ---- Feature vector (order MUST match training) ----
        features = np.array([[
            float(data["stress"]),
            float(data["sleep"]),
            float(data["workHours"]),
            float(data["engagement"]),
            float(data["productivity"])
        ]])

        model = load_model()

        # ---- Prediction ----
        probabilities = model.predict_proba(features)[0]
        risk_level = int(np.argmax(probabilities))

        # ---- Explanation ----
        explanation = generate_explanation(risk_level, probabilities)

        return jsonify({
            "risk_level": risk_level,          # 0=Low, 1=Medium, 2=High
            "probabilities": probabilities.tolist(),
            "confidence": round(max(probabilities) * 100),
            "explanation": explanation
        })

    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e)
        }), 500


def generate_explanation(risk_level, probabilities):
    """
    Convert ML output into human-readable reasoning.
    """
    confidence = round(max(probabilities) * 100)

    if risk_level == 2:
        return (
            f"High burnout risk detected with {confidence}% confidence. "
            "This is typically associated with elevated stress levels, "
            "reduced sleep, and extended working hours."
        )

    if risk_level == 1:
        return (
            f"Moderate risk indicators observed with {confidence}% confidence. "
            "Emerging stress or engagement patterns may benefit from proactive monitoring."
        )

    return (
        f"Low risk profile detected with {confidence}% confidence. "
        "Current work patterns appear stable."
    )
