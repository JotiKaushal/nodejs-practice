import React from 'react'
import {Link} from 'react-router'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const user = useSelector(store => store.user);
  
  return (
    <div className="navbar bg-base-200">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder🖥️</Link>
  </div>
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end mx-5">
     {user && 
     <div className='flex gap-3 text-center'><p>Welcome {user.firstName}</p>
     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div></div>}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/">Settings</Link></li>
        <li><Link>Logout</Link></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default NavBar