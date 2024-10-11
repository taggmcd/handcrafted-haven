// src/app/seller-profiles/[id]/page.tsx

import React from 'react';
import { SellerProfile } from '../../types'; // Adjust the path as needed

// Define the props for the component
interface SellerProfilePageProps {
    profile: SellerProfile | null; // Allow null if profile not found
}

// Component to display the seller profile
const SellerProfilePage: React.FC<SellerProfilePageProps> = ({ profile }) => {
    if (!profile) {
        return <div>Profile not found</div>; // Handle profile not found case
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-softGrayPurple">
            <div className="w-full max-w-2xl p-6 bg-blushPink rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-mutedLavenderPink">{profile.name}</h1>
                <p className="mt-4 text-mutedLavenderPink">{profile.description}</p>
                <p className="mt-2 text-mutedLavenderPink">{profile.story}</p>
                <h2 className="mt-4 text-lg font-medium text-mutedLavenderPink">Products:</h2>
                <ul className="mt-2">
                    {profile.products.map((product) => (
                        <li key={product.id} className="mt-2">
                            <h3 className="font-semibold text-mutedLavenderPink">{product.name}</h3>
                            <p className="text-mutedLavenderPink">{product.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Fetch the list of seller IDs for static paths
export async function getStaticPaths() {
    const response = await fetch('http://localhost:3000/api/sellerProfiles'); // Adjust the URL to your API endpoint
    const profiles: SellerProfile[] = await response.json();

    // Generate paths for each profile ID
    const paths = profiles.map((profile) => ({
        params: { id: profile.id.toString() }, // Ensure id is a string
    }));

    return { paths, fallback: true }; // Set fallback to true for new profiles
}

// Fetch seller profile data based on ID
export async function getStaticProps(context: { params: { id: string } }) {
    const { id } = context.params;
    const response = await fetch(`http://localhost:3000/api/sellerProfiles/${id}`); // Adjust URL as needed

    if (!response.ok) {
        return {
            props: {
                profile: null, // Handle case where profile is not found
            },
        };
    }

    const profile: SellerProfile = await response.json();

    return {
        props: {
            profile: profile || null, // Handle case where profile is not found
        },
    };
}

export default SellerProfilePage;
