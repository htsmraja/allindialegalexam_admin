import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const UserMenu = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("Authtoken");
    navigate("/login");
  };

  return (
    <>
      <div className="onhover-dropdown">
        <FaUserCircle
          className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
          size={50}
        />

        <div className="dotted-animation">
          <span className="animate-circle"></span>
          <span className="main-circle"></span>
        </div>

        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          <li>
            <Link to="/settings/profile">
              <i data-feather="user"></i> Edit Profile
            </Link>
          </li>

          <li>
            <div onClick={handleLogOut}>
              <i data-feather="log-out"></i> Logout
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
