// src/app/seller-profiles/create/page.tsx

"use client"; // Add this line to mark the component as a Client Component

import React, { useState } from 'react';

const CreateProfile = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('/api/sellerProfiles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });

        if (response.ok) {
            console.log('Profile created successfully');
            // Optionally, redirect to the list page or show a success message
        } else {
            console.error('Failed to create profile');
            // Optionally, show an error message
        }
    };

    return (
        <div>
            <h1>Create Seller Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Create Profile</button>
            </form>
        </div>
    );
};

export default CreateProfile;
