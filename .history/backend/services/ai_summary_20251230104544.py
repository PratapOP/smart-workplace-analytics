def build_ai_summary(
    risk_level: int,
    confidence: int,
    metrics: dict
) -> str:
    """
    Build a human-readable AI summary based on risk level,
    calibrated confidence, and aggregated metrics.

    risk_level:
        0 -> Low
        1 -> Medium
        2 -> High
    """

    # Defensive checks
    if risk_level not in (0, 1, 2):
        raise ValueError("Invalid risk level")

    stress = metrics.get("stress")
    sleep = metrics.get("sleep")
    work_hours = metrics.get("workHours")
    engagement = metrics.get("engagement")

    # ---- HIGH RISK SUMMARY ----
    if risk_level == 2:
        return (
            f"High burnout risk detected with {confidence}% confidence. "
            f"Recent trends indicate elevated stress levels"
            f"{_optional_clause(stress, lambda x: x >= 4, ' (stress is notably high)')}, "
            f"combined with extended working hours"
            f"{_optional_clause(work_hours, lambda x: x >= 9, ' (average work hours exceed healthy limits)')} "
            f"and reduced recovery time"
            f"{_optional_clause(sleep, lambda x: x < 6, ' (sleep duration is below recommended levels)')}. "
            "It is advisable to review workload distribution and encourage rest and recovery initiatives."
        )

    # ---- MEDIUM RISK SUMMARY ----
    if risk_level == 1:
        return (
            f"Moderate risk indicators observed with {confidence}% confidence. "
            "While overall performance remains stable, emerging patterns suggest "
            "increasing pressure or early signs of disengagement. "
            "Proactive monitoring and periodic team check-ins may help prevent escalation."
        )

    # ---- LOW RISK SUMMARY ----
    return (
        f"Low risk profile detected with {confidence}% confidence. "
        "Current work patterns appear stable, with no immediate indicators "
        "of excessive stress or disengagement. "
        "Maintaining existing practices and periodic monitoring is recommended."
    )


def _optional_clause(value, condition_fn, clause_text):
    """
    Helper to conditionally append explanatory clauses.
    Keeps summaries precise without over-asserting.
    """
    try:
        if value is not None and condition_fn(value):
            return clause_text
    except Exception:
        pass

    return ""
