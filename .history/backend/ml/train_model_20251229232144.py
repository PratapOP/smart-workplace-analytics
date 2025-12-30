import joblib
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

# Example synthetic dataset (replace with real data later)
X = np.array([
    [4.5, 5.5, 10, 3.0, 7],
    [3.0, 7.0, 8, 4.2, 6],
    [4.8, 5.0, 11, 2.8, 8],
    [2.5, 8.0, 7, 4.5, 5],
    [3.8, 6.0, 9, 3.5, 7]
])

y = np.array([2, 0, 2, 0, 1])  # Risk levels

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = DecisionTreeClassifier(
    max_depth=4,
    min_samples_leaf=2,
    random_state=42
)

model.fit(X_train, y_train)

joblib.dump(model, "risk_model.joblib")
print("Model trained and saved.")
