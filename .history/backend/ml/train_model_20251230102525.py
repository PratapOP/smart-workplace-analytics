import numpy as np
import joblib
from sklearn.tree import DecisionTreeClassifier
from sklearn.calibration import CalibratedClassifierCV

X = np.array([
    [4.5,5.5,10,3.0,7],
    [3.0,7.5,8,4.2,6],
    [4.8,5.0,11,2.8,8],
    [2.5,8.0,7,4.5,5],
    [3.8,6.0,9,3.5,7]
])

y = np.array([2,0,2,0,1])

base = DecisionTreeClassifier(max_depth=4, random_state=42)
model = CalibratedClassifierCV(base, method="isotonic", cv=3)
model.fit(X, y)

joblib.dump(model, "risk_model.joblib")
print("Model trained & saved")
