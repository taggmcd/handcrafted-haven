// page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link component for navigation

// Define types for the product and profile objects
interface Product {
    id: string;
    name: string;
    description: string;
}

interface Profile {
    id: string;
    name: string;
    description: string;
    story: string;
    products: Product[];
}

const ListProfiles = () => {
    // Define state with proper typing
    const [profiles, setProfiles] = useState<Profile[]>([]); // Explicitly define the type as an array of Profile
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const [searchQuery, setSearchQuery] = useState(''); // Search query state

    // Fetch seller profiles
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('/api/sellerProfiles');
                if (response.ok) {
                    const data: Profile[] = await response.json();
                    setProfiles(data);
                } else {
                    throw new Error('Failed to fetch profiles');
                }
            } catch (err) {
                // Narrow the error type to Error, ensuring we can access err.message
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
            setLoading(false); // Stop loading once fetch is complete
        };
    
        fetchProfiles();
    }, []);
    

    // Filter profiles based on search query
    const filteredProfiles = profiles.filter(profile =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-softGrayPurple p-4">
            <div className="w-full max-w-2xl p-6 bg-blushPink rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-mutedLavenderPink">Seller Profiles</h1>
                
                <div className="search-bar mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for sellers..."
                        className="border p-2 rounded w-full"
                    />
                </div>

                {loading && <p className="text-center text-mutedLavenderPink">Loading profiles...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && !error && (
                    <ul className="mt-4 space-y-4">
                        {filteredProfiles.length > 0 ? (
                            filteredProfiles.map((profile) => (
                                <li key={profile.id} className="p-4 border border-desaturatedMint rounded-lg hover:shadow-lg transition-shadow">
                                    <h2 className="text-xl font-semibold text-softGrayPurple">{profile.name}</h2>
                                    <p className="mt-2 text-paleTealGray">{profile.description}</p>
                                    <p className="mt-2 italic text-blushPink">{profile.story}</p>
                                    
                                    <h3 className="mt-4 font-medium text-mutedLavenderPink">Products:</h3>
                                    <ul className="mt-2 space-y-2">
                                        {profile.products.map((product) => (
                                            <li key={product.id} className="border border-softGrayPurple rounded p-2">
                                                <h4 className="font-semibold text-mutedLavenderPink">
                                                    <Link href={`/products/${product.id}`}>
                                                        <a className="hover:underline">{product.name}</a>
                                                    </Link>
                                                </h4>
                                                <p className="text-paleTealGray">{product.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                        ) : (
                            <p className="text-center text-mutedLavenderPink">No profiles found</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ListProfiles;
