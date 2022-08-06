import axios from 'axios'
import React, { useState } from 'react'
import { Navigation } from './Navigation'
import Swal from 'sweetalert2'
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';

export const UserList = () => {
    const history = createBrowserHistory();
    const [users,setUsers] = useState();
    const user = useSelector((state) => state.user);
    
    useState(() => {
/*         if(user.loginStatus === false){
            history.push('/login');
            history.go('/login');
            return
          } */
        const getUsers = async () => {
            const res = await axios.get(`https://localhost:6161/auth/getall`);
            setUsers(res.data)
            
        }
        getUsers();
    })

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonText: 'Yes, delete it!',
            showCancelButton: true,
            confirmButtonColor: '#b82b28'
          }).then(async (result) => {
            if(result.isConfirmed){
              const res = await axios.delete(`https://localhost:6161/auth/delete/${id}`,
              {headers: {
                'Access-Control-Allow-Origin': '*',
                "token" : "Bearer " + user.currentUser.accessToken }})
              setUsers(res.data)
            }
          });
    }

  return (
    <div>
    <div className="container-fluid sb1">
      <div className="row">
        {/*== LOGO ==*/}
        <div className="col-md-2 col-sm-3 col-xs-6 sb1-1">
      
          <a href="/"  ><img src="https://i.ibb.co/3vQMw9J/kuzey-side-light-2.png" alt="" />
          </a>
        </div>
      
     <div className="col-md-2 col-sm-3 col-xs-6">
        </div>
      </div>
    </div>
    {/*== BODY CONTNAINER ==*/}
    <div className="container-fluid sb2">
      <div className="row">
        <div className="sb2-1">
          {/*== USER INFO ==*/}
          <div className="sb2-12">
            <ul>
              <li><img src={user.currentUser.PROFILE_PICTURE} alt="profilResmi" />
              </li>
              <li style={{color: '#000'}}>
                <span>Hoşgeldin</span> <br /> <b> {user.currentUser.FULLNAME}</b>
              </li>
              <li />
            </ul>
          </div>
       <Navigation />
        </div>
        <div className="sb2-2">
        <div className="sb2-2-3">
    <div className="row">
      <div className="col-md-12">
        <div className="box-inn-sp">
          <div className="inn-title">
            <h4>All Users</h4>
     
            {/* Dropdown Structure */}
          </div>
          <div className="tab-inn">
            <div className="table-responsive table-desi">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Registered At</th>
                    <th>Last Login</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => 
                    <tr key={user.ID}>
                    <td><span className="list-img"><img src={user.PROFILE_PICTURE} alt="" /></span>
                    </td>
                    <td><a href="#"><span className="list-enq-name">{user.FULLNAME}</span></a>
                    </td>
                    <td>{user.EMAIL}</td>
                    <td> <span className="label label-primary">{user.ROLE}</span></td>
                    <td>{user.REGISTERED_AT}</td>
                    <td>{user.LAST_LOGIN}</td>
                    <td>
                      <a href={`/users/edit/${user.ID}`}><i className="fa-solid fa-pen" aria-hidden="true" /></a>
                    </td>
                    <td>
                      <a style={{cursor : 'pointer'}} onClick={()  => handleDelete(user.ID)}><i className="fa-solid fa-trash" aria-hidden="true" /></a>
                    </td>
                  </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        </div>
      </div>
    </div>
  </div>
 
  )
}
