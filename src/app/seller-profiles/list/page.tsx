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
        <div>
            <h1>Seller Profiles</h1>
            <ul>
                {/* Map over the profiles array to render each profile */}
                {profiles.map((profile) => (
                    <li key={profile.id}> {/* Unique key for each list item */}
                        <h2>{profile.name}</h2> {/* Display the profile name */}
                        <p>{profile.description}</p> {/* Display the profile description */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListProfiles; // Export the ListProfiles component
