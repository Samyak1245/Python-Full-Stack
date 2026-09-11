from flask import request, jsonify
from config import app, db
from models import Contact


# Get all contacts
@app.route("/contacts", methods=["GET"])
def get_contacts():

    contacts = Contact.query.all()

    return jsonify({
        "contacts": [contact.to_json() for contact in contacts]
    })


# Create a new contact
@app.route("/create_contact", methods=["POST"])
def create_contact():

    data = request.get_json(silent=True) or {}

    first_name = data.get("firstName")
    last_name = data.get("lastName")
    email = data.get("email")

    if not first_name or not last_name or not email:
        return jsonify({
            "error": "All fields are required"
        }), 400

    new_contact = Contact(
        first_name=first_name,
        last_name=last_name,
        email=email
    )

    try:

        db.session.add(new_contact)
        db.session.commit()

        return jsonify({
            "message": "Contact created successfully"
        }), 201

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "error": str(e)
        }), 500


# Update a contact
@app.route("/update_contact/<int:contact_id>", methods=["PATCH"])
def update_contact(contact_id):

    contact = db.session.get(Contact, contact_id)

    if not contact:
        return jsonify({
            "error": "Contact not found"
        }), 404

    data = request.get_json(silent=True) or {}

    contact.first_name = data.get(
        "firstName",
        contact.first_name
    )

    contact.last_name = data.get(
        "lastName",
        contact.last_name
    )

    contact.email = data.get(
        "email",
        contact.email
    )

    try:

        db.session.commit()

        return jsonify({
            "message": "Contact updated successfully"
        }), 200

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "error": str(e)
        }), 500


# Delete a contact
@app.route("/delete_contact/<int:contact_id>", methods=["DELETE"])
def delete_contact(contact_id):

    contact = db.session.get(Contact, contact_id)

    if not contact:
        return jsonify({
            "error": "Contact not found"
        }), 404

    try:

        db.session.delete(contact)
        db.session.commit()

        return jsonify({
            "message": "Contact deleted successfully"
        }), 200

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "error": str(e)
        }), 500


# Create the database table when the application starts. This also runs when
# Gunicorn imports the application on Render.
with app.app_context():
    db.create_all()


# Start the Flask development server locally.
if __name__ == "__main__":
    app.run(debug=True)
