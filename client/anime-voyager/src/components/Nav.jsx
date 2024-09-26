import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";

export default function Nav() {
  const userManage = useContext(AuthContext);

  return (
    <div className="top">
    <div className="navbar bg-neutral text-white">
      <div className="navbar-start">
      <div className="flex flex-1 justify-start px-2">
    <div className="flex items-stretch">
      
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Your List</div>
        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-28 p-2 shadow">
          <li><NavLink to="/favorites">Favorites</NavLink></li>
          <li><NavLink to="/watched">Finished Animes</NavLink></li>
          <li><NavLink to="/current">Currently Watching</NavLink></li>
          <li><NavLink to="/plan">Plan to Watch</NavLink></li>
        </ul>
      </div>
      <NavLink className="btn btn-ghost" to="/">Home</NavLink>
      <NavLink className="btn btn-ghost" to="/search">Search</NavLink>
    </div>
  </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <a className="btn btn-ghost text-xl text-white">Anime Voyage</a>
      </div>
      <div className="navbar-end">
        {userManage.token ? (
          <NavLink
            onClick={userManage.logout}
            to="/login"
            className="btn btn-ghost text-xl mx-2"
          >
            Logout
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/register"
              className="btn btn-outline btn-info text-lg mx-2"
            >
              Register
            </NavLink>
            <NavLink
              className="btn btn-outline btn-info text-lg mx-2"
              to="/login"
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
    </div>
  );
}
