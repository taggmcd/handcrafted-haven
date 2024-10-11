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
        <div className="flex flex-col items-center justify-center min-h-screen bg-softGrayPurple p-4">
            <div className="w-full max-w-2xl p-6 bg-blushPink rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-mutedLavenderPink">Seller Profiles</h1>
                <ul className="mt-4 space-y-4">
                    {/* Map over the profiles array to render each profile */}
                    {profiles.map((profile) => (
                        <li key={profile.id} className="p-4 border border-desaturatedMint rounded-lg hover:shadow-lg transition-shadow">
                            <h2 className="text-xl font-semibold text-softGrayPurple">{profile.name}</h2> {/* Display the profile name */}
                            <p className="mt-2 text-paleTealGray">{profile.description}</p> {/* Display the profile description */}
                            <p className="mt-2 italic text-blushPink">{profile.story}</p> {/* Display the seller's story */}
                            <h3 className="mt-4 font-medium text-mutedLavenderPink">Products:</h3>
                            <ul className="mt-2 space-y-2">
                                {profile.products.map((product, index) => (
                                    <li key={index} className="border border-softGrayPurple rounded p-2">
                                        <h4 className="font-semibold text-mutedLavenderPink">{product.name}</h4>
                                        <p className="text-paleTealGray">{product.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ListProfiles; // Export the ListProfiles component
