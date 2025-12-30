from typing import List, Dict


def aggregate_metrics(records: List[Dict]) -> Dict:
    """
    Aggregate raw records into privacy-safe metrics.

    Expected input:
    [
        {
            "stress": float,
            "sleep": float,
            "workHours": float,
            "engagement": float,
            "productivity": float
        },
        ...
    ]

    Output:
    {
        "stress": avg_stress,
        "sleep": avg_sleep,
        "workHours": avg_work_hours,
        "engagement": avg_engagement,
        "productivity": avg_productivity
    }
    """

    if not records or not isinstance(records, list):
        raise ValueError("Records must be a non-empty list")

    total = {
        "stress": 0.0,
        "sleep": 0.0,
        "workHours": 0.0,
        "engagement": 0.0,
        "productivity": 0.0
    }

    count = len(records)

    for record in records:
        for key in total.keys():
            if key not in record:
                raise ValueError(f"Missing required field in record: {key}")
            total[key] += float(record[key])

    # Compute averages
    aggregated = {
        key: round(total[key] / count, 2)
        for key in total
    }

    return aggregated


def compute_trend_change(current: float, previous: float) -> float:
    """
    Compute percentage change between two values.

    Used for trend intelligence and alerts.
    """
    if previous == 0:
        return 0.0

    return round((current - previous) / previous, 2)
