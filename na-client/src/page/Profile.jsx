import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log("Auth0 User Object:", user); // Debugging: Check if the user object exists

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && user ? (
      <div>
        <h2>Welcome, {user.name || "No Name Found"}</h2>
        {user.picture && <img src={user.picture} alt="User Profile" />}
        <p>Email: {user.email || "No Email Found"}</p>
        <pre>{JSON.stringify(user, null, 2)}</pre> {/* Display full user object */}
      </div>
    ) : (
      <div>No user info found</div>
    )
  );
};

export default Profile;
