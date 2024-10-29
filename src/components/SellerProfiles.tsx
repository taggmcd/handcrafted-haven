import React, { useEffect, useState } from 'react';
import styles from './seller-profiles.module.css';  // Import the CSS module

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

  return (
    <div className={styles['profile-container']}>
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <div key={profile._id} className={styles['profile-card']}>
            <div className={styles['profile-details']}>
              <h2 className={styles['profile-name']}>{profile.name}</h2>
              <p className={styles['profile-description']}>{profile.description}</p>
              <p className={styles['profile-story']}>{profile.story}</p>
              {profile.products.map((product, idx) => (
                <div key={idx}>
                  <h3 className={styles['profile-name']}>{product.name}</h3>
                  <p className={styles['profile-description']}>{product.description}</p>
                </div>
              ))}
              <a href={`/seller/${profile._id}`} className={styles['profile-link']}>More about this seller</a>
            </div>
          </div>
        ))
      ) : (
        <p>No seller profiles available</p>
      )}
    </div>
  );
};

export default SellerProfiles;
