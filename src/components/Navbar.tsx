import { FunctionComponent, useContext, useEffect } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbacks";


interface NavbarProps {
  setIsLoggedIn: Function;
  isLoggedIn: boolean;
  isBusiness: boolean;
}
const Navbar: FunctionComponent<NavbarProps> = ({
  setIsLoggedIn,
  isLoggedIn,
  isBusiness,
}) => {
  let navigate = useNavigate();

  return (
    <div className="bg-dark text-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
          <img src="https://freesvg.org/img/pointing-hand.png
" height={50} alt="biz card logo" />
          <NavLink className="navbar-brand display-2 em" to="/home">
            Cards4Biz
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Sign In
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="register">
                      Sign Up
                    </NavLink>
                  </li>


                  <button
                    className="btn btn-outline-info m-2"
                    onClick={() => {
                      navigate("/businessregister");
                    }}
                  >
                    Create Business Account
                  </button>


                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/cards"
                    >
                      All Cards
                    </NavLink>
                  </li>
                  {isBusiness && (<>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/mycards">
                        My Cards
                      </NavLink>
                    </li></>)}

                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      navigate("/");
                      setIsLoggedIn(false);
                      sessionStorage.removeItem("userData");
                      successMsg("Hope to see you again soon)");
                    }}
                  >
                    Logout
                  </button>
                </>)
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>);
};

export default Navbar;