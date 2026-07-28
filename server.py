from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

events = [
    {"id": 1, "title": "Sample Event 1"},
    {"id": 2, "title": "Sample Event 2"}
]

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Event Catalog!"}), 200

@app.route("/events", methods=["GET"])
def get_events():
    return jsonify(events), 200

@app.route("/events", methods=["POST"])
def add_event():
    data = request.get_json()
    if not data or "title" not in data or not data["title"].strip():
        return jsonify({"error": "Title is required"}), 400
    new_event = {
        "id": len(events) + 1,
        "title": data["title"].strip()
    }
    events.append(new_event)
    return jsonify(new_event), 201

if __name__ == "__main__":
    app.run(debug=True)
