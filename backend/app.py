from flask import Flask
from flask_cors import CORS

# Import API blueprints
from api.predict import predict_bp
from api.reports import reports_bp
from api.alerts import alerts_bp

def create_app():
    """
    Application factory.
    This allows easy testing, scaling, and deployment.
    """
    app = Flask(__name__)

    # Load configuration
    app.config.from_object("config.Config")

    # Enable CORS for frontend-backend communication
    CORS(app, supports_credentials=True)

    # Register API blueprints
    app.register_blueprint(predict_bp)
    app.register_blueprint(reports_bp)
    app.register_blueprint(alerts_bp)

    @app.route("/", methods=["GET"])
    def health_check():
        return {
            "status": "running",
            "service": "Smart Workplace Analytics Backend"
        }

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
