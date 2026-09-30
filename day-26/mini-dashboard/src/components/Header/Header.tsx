import { useEffect } from "react";
import { useAuthContext } from "../../utils/AuthContext";
import "./Header.css";
import { useNavigate } from "react-router";

function Header() {
  const user = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("running useEffect in header")
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [navigate,user]);

  return (
    <div className="header-div">
      <img
        src="favicon.svg"
        alt="logo"
        className="logo"
        width={50}
        height={40}
      />
      <img src={user  ? user.avatar : 'user1.jpeg'} alt="avatar" className="avatar" />
    </div>
  );
}

export default Header;
