import { useEffect, useState } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import "./App.css";

function App() {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState({});

    const fetchContacts = async () => {
        try {
            const response = await fetch(
                "http://127.0.0.1:5000/contacts"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch contacts");
            }

            const data = await response.json();
            setContacts(data.contacts);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const openCreateModal = () => {
        setCurrentContact({});
        setIsModalOpen(true);
    };

    const openEditModal = (contact) => {
        setCurrentContact(contact);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentContact({});
    };

    const onUpdate = () => {
        closeModal();
        fetchContacts();
    };

    return (
        <div className="app">
            <ContactList
                contacts={contacts}
                updateContact={openEditModal}
                updateCallback={fetchContacts}
                openCreateModal={openCreateModal}
            />

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button
                            className="close"
                            onClick={closeModal}
                        >
                            ×
                        </button>

                        <ContactForm
                            key={currentContact.id ?? "new"}
                            existingContact={currentContact}
                            updateCallback={onUpdate}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
