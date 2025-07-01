const ProfileInfo = ({ profile, currentUser }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // Check if current user is following this profile
  useEffect(() => {
    if (currentUser && profile) {
      setIsFollowing(profile.isFollowing || false);
    }
  }, [currentUser, profile]);

  const handleFollow = async () => {
    try {
      const endpoint = isFollowing ? 'unfollow' : 'follow';
      await axios.post(`http://localhost:5000/api/follow/${profile.id}/${endpoint}`);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  };

  return (
    <div className="profile-info">
      <div className="profile-picture">
        <img src={profile.avatar || '/default-avatar.png'} alt="Profile" />
      </div>
      
      <div className="profile-details">
        <h2>{profile.name}</h2>
        <p>{profile.bio || 'No bio yet'}</p>
        <div className="profile-stats">
          <span>{profile._count?.posts || 0} posts</span>
          <span>{profile._count?.followers || 0} followers</span>
          <span>{profile._count?.following || 0} following</span>
        </div>
      </div>

      {currentUser && (
        <div className="profile-actions">
          {currentUser.id === profile.id ? (
            <button className="edit-btn">Edit Profile</button>
          ) : (
            <button 
              onClick={handleFollow}
              className={isFollowing ? 'unfollow-btn' : 'follow-btn'}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;