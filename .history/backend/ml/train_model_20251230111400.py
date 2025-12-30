import numpy as np
import joblib
from sklearn.tree import DecisionTreeClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.model_selection import train_test_split


def load_training_data():
    """
    Load or generate training data.

    NOTE:
    - Currently uses synthetic data
    - Replace this with real historical data later
    """

    # Feature order:
    # [stress, sleep, workHours, engagement, productivity]
    X = np.array([
        [4.6, 5.2, 10.5, 3.0, 7],
        [3.1, 7.5, 8.0, 4.4, 6],
        [4.9, 4.8, 11.0, 2.7, 8],
        [2.6, 8.1, 7.2, 4.6, 5],
        [3.8, 6.0, 9.3, 3.6, 7],
        [4.3, 5.5, 9.8, 3.2, 7],
        [2.9, 7.8, 7.5, 4.3, 6],
        [4.7, 5.0, 10.8, 2.9, 8]
    ])

    # Risk labels:
    # 0 -> Low, 1 -> Medium, 2 -> High
    y = np.array([
        2,  # high risk
        0,  # low risk
        2,  # high risk
        0,  # low risk
        1,  # medium risk
        1,  # medium risk
        0,  # low risk
        2   # high risk
    ])

    return X, y


def train_and_save_model():
    """
    Train Decision Tree with calibrated probabilities
    and save the trained model to disk.
    """

    X, y = load_training_data()

    # Base Decision Tree
    base_model = DecisionTreeClassifier(
        max_depth=4,
        min_samples_leaf=2,
        random_state=42
    )

    # Probability calibration
    calibrated_model = CalibratedClassifierCV(
    base_model,
    method="sigmoid",
    cv=2
)


    # Train on full dataset (safe for small synthetic data)
    calibrated_model.fit(X, y)

    # Save trained model
    joblib.dump(calibrated_model, "risk_model.joblib")

    print("✅ Calibrated Decision Tree model trained and saved as risk_model.joblib")


if __name__ == "__main__":
    train_and_save_model()
