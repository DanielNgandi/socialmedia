import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileInfo from './ProfileInfo';
import { getCurrentUser } from '../context/AuthLayout';

const UserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (isLoading) return <div>Loading profile...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="profile-page">
      {/* Cover Photo */}
      <div className="cover-photo">
        <img src={profile.coverPhoto || '/default-cover.jpg'} alt="Cover" />
        {currentUser?.id === profile.id && (
          <button className="edit-profile-btn">Edit Profile</button>
        )}
      </div>

      {/* Profile Info Section */}
      <ProfileInfo profile={profile} currentUser={currentUser} />

      {/* Profile Navigation */}
      <nav className="profile-nav">
        <button>Posts</button>
        <button>About</button>
        <button>Friends</button>
        <button>Photos</button>
      </nav>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Will add posts here later */}
        <p>This is {profile.name}'s profile page</p>
      </div>
    </div>
  );
};

export default UserProfile;