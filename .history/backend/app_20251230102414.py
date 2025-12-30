from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
from api.predict import predict_bp
from api.reports import reports_bp

app = Flask(__name__)
model = joblib.load("risk_model.joblib")

@app.route("/api/predict-risk", methods=["POST"])
def predict_risk():
    data = request.json

    features = np.array([[
        data["stress"],
        data["sleep"],
        data["workHours"],
        data["engagement"],
        data["productivity"]
    ]])

    probs = model.predict_proba(features)[0]
    prediction = int(np.argmax(probs))
    
    app.register_blueprint(predict_bp)
    app.register_blueprint(reports_bp)

    return jsonify({
        "risk_level": prediction,
        "probabilities": probs.tolist()
    })
