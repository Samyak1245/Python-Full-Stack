import { useState } from "react";

const ContactForm = ({
    existingContact = {},
    updateCallback
}) => {

    const [firstName, setFirstName] = useState(existingContact.firstName ?? "");
    const [lastName, setLastName] = useState(existingContact.lastName ?? "");
    const [email, setEmail] = useState(existingContact.email ?? "");

    const updating = Object.keys(existingContact).length > 0;

    const onSubmit = async (e) => {

        e.preventDefault();

        const data = {
            firstName,
            lastName,
            email
        };

        const url = updating
            ? `http://127.0.0.1:5000/update_contact/${existingContact.id}`
            : "http://127.0.0.1:5000/create_contact";

        try {

            const response = await fetch(url, {
                method: updating ? "PATCH" : "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || "Something went wrong");
                return;
            }

            updateCallback();

        } catch (error) {

            console.error(error);
            alert("Unable to connect to the server.");

        }
    };

    return (
        <form onSubmit={onSubmit}>

            <h2>
                {updating
                    ? "Update Contact"
                    : "Create Contact"}
            </h2>

            <div>
                <label htmlFor="firstName">
                    First Name
                </label>

                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) =>
                        setFirstName(e.target.value)
                    }
                    required
                />
            </div>

            <div>
                <label htmlFor="lastName">
                    Last Name
                </label>

                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) =>
                        setLastName(e.target.value)
                    }
                    required
                />
            </div>

            <div>
                <label htmlFor="email">
                    Email
                </label>

                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />
            </div>

            <button type="submit">
                {updating
                    ? "Update Contact"
                    : "Create Contact"}
            </button>

        </form>
    );
};

export default ContactForm;
