"use client"; // This line marks the component as a Client Component
import React, { useEffect, useState } from 'react';

const SellerProfiles: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch('/api/sellerProfiles');
      const data = await response.json();
      console.log('Fetched profiles:', data);
      if (Array.isArray(data)) {
        setProfiles(data);
      } else {
        console.error('Data is not an array:', data);
      }
    };
    
    fetchProfiles();
  }, []);

  return (
    <div>
      <h1>Seller Profiles</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile._id}>{profile.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SellerProfiles;
