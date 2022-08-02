//External Lib Import
import { useEffect } from "react";
import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import {
  AiOutlineLogout,
  AiOutlineMenuUnfold,
  AiOutlineUser,
} from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";

import { BsArrowsFullscreen } from "react-icons/bs";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ApiRequest from "../APIRequest/ApiRequest";

//Internal Lib Import
import logo from "../assets/images/logo.svg";
import SessionHelper from "../helper/SessionHelper";

function AppNavigation({ openMenu, setOpenMenu, title = "Home" }) {
  useEffect(() => {
    ApiRequest.selectUserRequest();
  }, []);

  let userProfile = useSelector((state) => state.profile.value);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const FullScreen = () => {
    if (isFullScreen === true) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    } else {
      let elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      setIsFullScreen(true);
    }
  };

  const logoutUser = () => {
    SessionHelper.removeToken("accessToken");
    window.location.href = "/login";
  };

  return (
    <>
      <title>{title}</title>
      <Navbar className="fixed-top px-0 shadow-sm ">
        <Container fluid={true}>
          <Navbar.Brand>
            <button
              className="icon-nav m-0 h5 btn btn-link"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <AiOutlineMenuUnfold />
            </button>
            <Link to="/">
              <img className="nav-logo mx-2" src={logo} alt="logo" />
            </Link>
          </Navbar.Brand>

          <div className="float-right h-auto d-flex align-items-center">
            <NavLink
              to="/create-post"
              className={({ isActive }) =>
                isActive ? "link-item-active" : "link-item"
              }
            >
              <IoCreateOutline className="link-item-icon" />
            </NavLink>
            <button
              className="mx-2 mb-0 icon-nav h6 px-3 btn btn-link"
              onClick={FullScreen}
            >
              <BsArrowsFullscreen />
            </button>

            {userProfile ? (
              <div className="user-dropdown">
                <img
                  className="icon-nav-img icon-nav"
                  src={userProfile && userProfile.avatar}
                  alt={userProfile && userProfile.userName}
                  onClick={() => setOpenDropdown(!openDropdown)}
                />
                <div
                  className={
                    openDropdown
                      ? "user-dropdown-content d-block"
                      : "user-dropdown-content"
                  }
                >
                  <div className="mt-4 text-center">
                    <img
                      className="icon-nav-img"
                      src={userProfile && userProfile.avatar}
                      alt={userProfile && userProfile.userName}
                    />
                    <h6>{userProfile && userProfile.name}</h6>
                    <hr className="user-dropdown-divider  p-0" />
                  </div>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? "link-item-active" : "link-item"
                    }
                  >
                    <AiOutlineUser className="link-item-icon" />
                    <span className="link-item-caption">Profile</span>
                  </NavLink>
                  <span
                    onClick={logoutUser}
                    className="link-item"
                    style={{ cursor: "pointer" }}
                  >
                    <AiOutlineLogout className="link-item-icon" />
                    <span className="link-item-caption">Logout</span>
                  </span>
                </div>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "link-item-active me-3" : "link-item me-3"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/registration"
                  className={({ isActive }) =>
                    isActive ? "link-item-active" : "link-item"
                  }
                >
                  Registration
                </NavLink>
              </>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavigation;
