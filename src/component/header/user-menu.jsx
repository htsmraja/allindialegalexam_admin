import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { FaUserCircle } from "react-icons/fa";

const UserMenu = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("Authtoken");
    navigate("/login");
  };

  return (
    <Fragment>
      <li className="onhover-dropdown">
        <div className="media align-items-center">
          <FaUserCircle
            className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
            size={50} // Adjust as needed
            alt="header-user"
          />
          <div className="dotted-animation">
            <span className="animate-circle"></span>
            <span className="main-circle"></span>
          </div>
        </div>
        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          <li>
            <Link to={`/settings/profile`}>
              <i data-feather="user"></i>Edit Profile
            </Link>
          </li>

          <li>
            <div onClick={handleLogOut}>
              <i data-feather="log-out"></i>Logout
            </div>
          </li>
        </ul>
      </li>
    </Fragment>
  );
};

export default UserMenu;
