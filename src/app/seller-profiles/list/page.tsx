// src/app/seller-profiles/list/page.tsx

"use client"; // This line marks the component as a Client Component

import React, { useEffect, useState } from 'react';

const ListProfiles = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            const response = await fetch('/api/sellerProfiles');
            if (response.ok) {
                const data = await response.json();
                setProfiles(data);
            } else {
                console.error('Failed to fetch profiles');
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div>
            <h1>Seller Profiles</h1>
            <ul>
                {profiles.map((profile) => (
                    <li key={profile.id}>
                        <h2>{profile.name}</h2>
                        <p>{profile.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListProfiles;
