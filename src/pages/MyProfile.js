import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: 'example_user',
    bio: 'This is a sample bio.',
    followers: 100,
    following: 50,
    posts: [
      { id: 1, imageUrl: 'post1.jpg', caption: 'A beautiful sunset.' },
      { id: 2, imageUrl: 'post2.jpg', caption: 'Exploring the city.' },
      // Add more posts as needed
    ],
  });

  useEffect(() => {
    // Fetch user data from your backend or other data source
    // and update the state using setUserData.
    // Example: fetchUserData(userId).then(data => setUserData(data));
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src="profile-picture.jpg" alt="Profile" className="profile-picture" />
        <div className="user-details">
          <h1>{userData.username}</h1>
          <p>{userData.bio}</p>
          <div className="follow-counts">
            <span>{userData.posts.length} posts</span>
            <span>{userData.followers} followers</span>
            <span>{userData.following} following</span>
          </div>
        </div>
      </div>
      <div className="post-container">
        {userData.posts.map((post) => (
          <div key={post.id} className="post">
            <img src={post.imageUrl} alt={`Post ${post.id}`} />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;