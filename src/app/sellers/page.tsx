"use client";
import React, { useEffect, useState } from 'react';

interface Product {
  name: string;
  description: string;
}

interface Profile {
  _id: string;
  name: string;
  description: string;
  story: string;
  products: Product[];
}

const SellerProfiles: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch('/api/sellerProfiles');
      const data = await response.json();
      if (Array.isArray(data)) {
        setProfiles(data);
      } else {
        console.error('Data is not an array:', data);
      }
    };

    fetchProfiles();
  }, []);

  const handleDelete = async (profileId: string) => {
    const response = await fetch('/api/sellerProfiles', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyId: profileId }),
    });

    if (response.ok) {
      setProfiles(profiles.filter(profile => profile._id !== profileId));
      console.log('Profile deleted successfully');
    } else {
      console.error('Failed to delete profile');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige-100 p-4">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-forest-green-800 mb-6">Seller Profiles</h1>
        <ul className="space-y-4">
          {profiles.map((profile) => (
            <li key={profile._id} className="p-4 bg-beige-50 rounded-md shadow hover:bg-beige-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-forest-green-800">{profile.name}</h2>
                <p className="text-brown-600">{profile.description}</p>
                <p className="text-brown-600">{profile.story}</p>
                {profile.products.map((product, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-medium text-forest-green-800">{product.name}</h3>
                    <p className="text-brown-600">{product.description}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleDelete(profile._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SellerProfiles;
