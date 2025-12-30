from flask import Flask
from flask_cors import CORS
from api.predict import predict_bp
from api.reports import reports_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(predict_bp)
app.register_blueprint(reports_bp)

if __name__ == "__main__":
    app.run(debug=True)
