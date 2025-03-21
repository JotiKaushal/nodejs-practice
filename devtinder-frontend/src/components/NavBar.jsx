import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { base_url } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { removeFeed } from '../utils/feedSlice';
const NavBar = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(`${base_url}logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    }
    catch (err) {
      //redirect to error page
    }

  }
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder🖥️</Link>
      </div>
      <div className="flex-none gap-2">
        {user &&
          <div className="dropdown dropdown-end mx-5">
            <div className='flex gap-3 text-center'><p>Welcome {user.firstName}</p>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src= {user.photoUrl} />
                </div>
              </div></div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><Link to="/premium">Premium</Link></li>
              <li><Link onClick={handleLogout}>Logout</Link></li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default NavBar