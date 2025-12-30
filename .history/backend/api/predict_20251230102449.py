from flask import Blueprint, request, jsonify
import joblib
import numpy as np

predict_bp = Blueprint("predict", __name__)
model = joblib.load("backend/ml/risk_model.joblib")

@predict_bp.route("/api/predict-risk", methods=["POST"])
def predict_risk():
    data = request.json

    X = np.array([[  
        data["stress"],
        data["sleep"],
        data["workHours"],
        data["engagement"],
        data["productivity"]
    ]])

    probs = model.predict_proba(X)[0]
    risk = int(np.argmax(probs))

    explanation = generate_explanation(risk, probs)

    return jsonify({
        "risk_level": risk,
        "probabilities": probs.tolist(),
        "explanation": explanation
    })

def generate_explanation(risk, probs):
    confidence = round(max(probs)*100)
    if risk == 2:
        return f"High burnout risk detected with {confidence}% confidence due to elevated stress and long work hours."
    if risk == 1:
        return f"Moderate risk indicators observed with {confidence}% confidence."
    return f"Low risk detected with {confidence}% confidence."
