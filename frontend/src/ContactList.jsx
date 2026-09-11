import React from "react";
import "./ContactList.css";

const ContactList = ({
    contacts,
    updateContact,
    updateCallback,
    openCreateModal
}) => {

    const onDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this contact?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `http://127.0.0.1:5000/delete_contact/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (response.ok) {
                updateCallback();
            } else {
                console.error("Failed to delete contact");
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div className="contact-page">

            {/* Header */}
            <div className="contact-header">
                <div>
                    <h1>My Contacts</h1>
                    <p>Manage your contacts</p>
                </div>

                <button
                    className="add-button"
                    onClick={openCreateModal}
                >
                    + Add Contact
                </button>
            </div>

            {/* Contacts Card */}
            <div className="contacts-card">

                <div className="table-header">
                    <h2>Contacts</h2>

                    <span>
                        {contacts.length}{" "}
                        {contacts.length === 1
                            ? "contact"
                            : "contacts"}
                    </span>
                </div>

                {contacts.length === 0 ? (

                    <div className="empty-state">
                        <h3>No contacts yet</h3>

                        <p>
                            Add your first contact to get started.
                        </p>

                        <button
                            className="add-button"
                            onClick={openCreateModal}
                        >
                            + Add Your First Contact
                        </button>
                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {contacts.map((contact) => (

                                    <tr key={contact.id}>

                                        <td>
                                            <div className="contact-info">

                                                <div className="avatar">
                                                    {contact.firstName
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <strong>
                                                        {contact.firstName}{" "}
                                                        {contact.lastName}
                                                    </strong>

                                                    <span>
                                                        ID #{contact.id}
                                                    </span>
                                                </div>

                                            </div>
                                        </td>

                                        <td>
                                            {contact.email}
                                        </td>

                                        <td>

                                            <div className="actions">

                                                <button
                                                    className="action-button edit"
                                                    onClick={() =>
                                                        updateContact(contact)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="action-button delete"
                                                    onClick={() =>
                                                        onDelete(contact.id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

            <p className="footer-text">
                Contact Manager • React + Flask
            </p>

        </div>
    );
};

export default ContactList;