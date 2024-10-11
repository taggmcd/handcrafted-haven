// src/app/seller-profiles/list/page.tsx

"use client"; // This line marks the component as a Client Component

import React, { useEffect, useState } from 'react';

const ListProfiles = () => {
    // State to hold the list of seller profiles
    const [profiles, setProfiles] = useState([]);

    // useEffect hook to fetch profiles when the component mounts
    useEffect(() => {
        // Async function to fetch profiles from the API
        const fetchProfiles = async () => {
            // Sending a GET request to the /api/sellerProfiles endpoint
            const response = await fetch('/api/sellerProfiles');
            if (response.ok) { // Check if the response is successful
                const data = await response.json(); // Parse the JSON data
                setProfiles(data); // Update the state with the fetched profiles
            } else {
                console.error('Failed to fetch profiles'); // Log an error message if the fetch fails
            }
        };

        // Call the fetchProfiles function to execute the API request
        fetchProfiles();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center">Seller Profiles</h1>
                <ul className="mt-4 space-y-4">
                    {/* Map over the profiles array to render each profile */}
                    {profiles.map((profile) => (
                        <li key={profile.id} className="p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow">
                            <h2 className="text-xl font-semibold">{profile.name}</h2> {/* Display the profile name */}
                            <p className="mt-2 text-gray-600">{profile.description}</p> {/* Display the profile description */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ListProfiles; // Export the ListProfiles component
