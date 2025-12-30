"""
API package initialization.

All REST endpoints are registered here using Flask Blueprints.
"""

from .predict import predict_bp
from .reports import reports_bp
from .alerts import alerts_bp
from .auth import auth_bp


def register_api(app):
    app.register_blueprint(predict_bp)
    app.register_blueprint(reports_bp)
    app.register_blueprint(alerts_bp)
    app.register_blueprint(auth_bp)
