import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { logOut } from '../Redux/Auth';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'

export const Navigation = () => {

    const dispatch = useDispatch();
    
      let activeClassName = "menu-active";
      const navigate = useNavigate();

      const handleLogout = () => {
        dispatch(logOut());
        navigate('/login');
      }
      const user = useSelector((state) => state.user);
  return (
    <div className="sb2-13">
    <ul className="collapsible" data-collapsible="accordion">
      <li><NavLink  className={({ isActive }) =>
              isActive ? activeClassName : undefined
            } to="/" ><i className="fa fa-bar-chart" aria-hidden="true" /> Dashboard</NavLink>
      </li>
      <li><NavLink  className={({ isActive }) =>
              isActive ? activeClassName : undefined
            } to="/offers" ><i className="fa-solid fa-file-invoice-dollar"/> Bionluk</NavLink>
      </li>
      <li><a><i className="fa-brands fa-google"  /> SEO Tools</a>
        <div className=" left-sub-menu">
          <ul>
            <li><NavLink  className={({ isActive }) =>
              isActive ? activeClassName : undefined
            } to="/seotools">All Web Sites</NavLink>
            </li>
            <li><NavLink  className={({ isActive }) =>
              isActive ? activeClassName : undefined
            } to="/addwebsite">Add Website</NavLink>
            </li>
            { user.currentUser.websites.map((site) => 
                    <li key={site.WEBSITE_ID}><NavLink  className={({ isActive }) =>
                    isActive ? activeClassName : undefined
                  } to={`/websitedetails/${site.PATH}/${site.WEBSITE_ID}`}>{site.PATH}</NavLink>
                  </li>
                    )}
          </ul>
        </div>
      </li>
      <li><a><i className="fa fa-user"  /> Users</a>
        <div className=" left-sub-menu">
          <ul>
            <li><NavLink  className={({ isActive }) =>
              isActive ? activeClassName : undefined
            } to="/users">All Users</NavLink>
            </li>
            <li><NavLink  className={({ isActive }) =>
              isActive ? activeClassName : undefined
            } to="/createuser">Add New user</NavLink>
            </li>
          </ul>
        </div>
      </li>
      <li><a><i className="fa fa-rss" aria-hidden="true" /> Blogs</a>
        <div className=" left-sub-menu">
          <ul>
            <li><NavLink  className={({ isActive }) =>
              isActive ? activeClassName : undefined
            } to="/blogs">All Blogs</NavLink>
            </li>
            <li><NavLink  className={({ isActive }) =>
              isActive ? activeClassName : undefined
            } to="/createblog">Add Blog</NavLink>
            </li>
          </ul>
        </div>
      </li>
      <li><a onClick={() => handleLogout()} style={{cursor : 'pointer'}}><i className="fa-solid fa-sign-out" aria-hidden="true" /> Logout</a>
       
      </li>
    
    </ul>
  </div>
  )
}
