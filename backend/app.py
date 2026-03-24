from flask import Flask, send_from_directory
from flask_cors import CORS
from models import db
from dotenv import load_dotenv
import os

# Import your blueprints
from routes.auth import auth_bp
from routes.candidate import candidate_bp
from routes.admin import admin_bp
from routes.hr import hr_bp
from routes.employee import employee_bp
from routes.leaves import leaves_bp

load_dotenv() 

app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")

# -----------------------
# Configuration
# -----------------------
database_url = os.environ.get("DATABASE_URL")

if not database_url:
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    database_url = "sqlite:///" + os.path.join(BASE_DIR, "instance", "database.db")
elif database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key")

db.init_app(app)

# Updated CORS for Production
# This allows your local dev and your future Vercel site
CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
    "https://nagaryukt.vercel.app",
    "https://nagaryukt-hrms.vercel.app" # Backup in case nagaryukt is taken
])

# -----------------------
# Register Blueprints
# -----------------------
app.register_blueprint(auth_bp)
app.register_blueprint(candidate_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(hr_bp)
app.register_blueprint(employee_bp)
app.register_blueprint(leaves_bp)

# -----------------------
# Serve React SPA (Optional for separated deployment, but good to keep)
# -----------------------
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

# -----------------------
# Run Server
# -----------------------
if __name__ == "__main__":
    # Get port from environment (Render provides this) or default to 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)