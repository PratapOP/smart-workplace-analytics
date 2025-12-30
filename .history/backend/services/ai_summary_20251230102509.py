def generate_ai_summary(data):
    risk = data.get("risk_level", 1)
    confidence = data.get("confidence", 70)

    if risk == 2:
        return f"High burnout risk ({confidence}%). Recommend workload reduction and recovery initiatives."
    if risk == 1:
        return f"Moderate risk ({confidence}%). Monitoring and proactive engagement recommended."
    return f"Low risk ({confidence}%). Current patterns appear stable."
