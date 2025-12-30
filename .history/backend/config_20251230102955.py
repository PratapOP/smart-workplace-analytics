import os

class Config:
    """
    Central configuration for the backend application.
    """

    # Flask
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")

    # Environment
    ENV = os.environ.get("FLASK_ENV", "development")
    DEBUG = ENV == "development"

    # ML Model
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    ML_MODEL_PATH = os.path.join(BASE_DIR, "ml", "risk_model.joblib")

    # API Behavior
    JSON_SORT_KEYS = False

    # CORS / Security (future-ready)
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"

    # Feature Flags (easy toggles later)
    ENABLE_AI = True
    ENABLE_ALERTS = True
    ENABLE_REPORTS = True
