// src/app/seller-profiles/create/page.tsx

"use client"; // Add this line to mark the component as a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const CreateProfile = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter(); // Initialize router

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/sellerProfiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description }),
            });

            if (response.ok) {
                setMessage('Profile created successfully!');
                setTimeout(() => {
                    router.push('/seller-profiles'); // Redirect after 2 seconds
                }, 2000);
            } else {
                throw new Error('Failed to create profile');
            }
        } catch (error) {
            console.error(error);
            setMessage('Failed to create profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Create Seller Profile</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className={`w-full p-2 text-white rounded-md focus:outline-none ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? 'Creating...' : 'Create Profile'}
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>} {/* Display success/error message */}
            </div>
        </div>
    );
};

export default CreateProfile;
