import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Import your Firebase auth
import { signOut } from "firebase/auth";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, routes }) {
  const [openNav, setOpenNav] = useState(false);
  const [user, setUser] = useState(null); // State to track user
  const navigate = useNavigate();

  // Track user state with Firebase auth onAuthStateChanged
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set user if logged in, otherwise null
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  // Handle mobile nav open/close event to prevent body scroll
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    if (openNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [openNav]);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon, href, target }) => (
        <li key={name} className="capitalize">
          {href ? (
            <a href={href} target={target} className="flex items-center gap-1 p-1 font-bold">
              {icon && React.createElement(icon, { className: "w-[18px] h-[18px] opacity-75 mr-1" })}
              {name}
            </a>
          ) : (
            <Link to={path} target={target} className="flex items-center gap-1 p-1 font-bold">
              {icon && React.createElement(icon, { className: "w-[18px] h-[18px] opacity-75 mr-1" })}
              {name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      navigate("/sign-in"); // Redirect to the sign-in page after logout
    } catch (err) {
      console.error("Error logging out: ", err);
    }
  };

  return (
    <nav className="p-3 bg-transparent text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <span className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
            {brandName}
          </span>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden gap-2 lg:flex">
          {/* Conditionally Render Logout Button if user is logged in */}
          {user && (
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Log Out
            </button>
          )}
        </div>
        <button
          className="ml-auto text-white lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </button>
      </div>
      {openNav && (
        <div className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900">
          {navList}
          {/* Add Logout Button in Mobile View as well */}
          {user && (
            <button
              className="w-full px-4 py-2 mb-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Log Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

Navbar.defaultProps = {
  brandName: "Holberton Stadium",
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string, // Make path optional
      icon: PropTypes.elementType,
      href: PropTypes.string,
      target: PropTypes.string,
    })
  ).isRequired,
};

export default Navbar;
