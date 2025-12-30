from flask import Flask, jsonify
from flask_cors import CORS

from api import register_api


def create_app():
    app = Flask(__name__)

    # Enable CORS for frontend communication
    CORS(app)

    # Register all API blueprints
    register_api(app)

    @app.route("/")
    def health_check():
        return jsonify({
            "status": "running",
            "service": "Smart Workplace Analytics Backend"
        })

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
