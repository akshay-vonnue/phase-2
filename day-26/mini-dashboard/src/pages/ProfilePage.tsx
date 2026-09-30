import { useState } from "react";
import { useAuthContext } from "../utils/AuthContext";
import "./ProfilePage.css";
import { useNavigate } from "react-router";

function ProfilePage() {
  const user = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("jwt_token");
      setLoading(false);
      navigate("/login", { replace: true });
    }, 1000);
  };

  return (
    <>
      <div className="no-items profile-card">
        <div className="user-avatar">
          <img src={user.avatar} alt="avatar" />
        </div>
        <div className="user-name">{user.name}</div>
        <div className="user-email">{user.email}</div>
        {/* <div className="user-id">{user.id}</div> */}
        <button type="button" onClick={handleLogout} className="logout-button">
          {loading ? "loading..." : "logout"}
        </button>
      </div>
    </>
  );
}

export default ProfilePage;
