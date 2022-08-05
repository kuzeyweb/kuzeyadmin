import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Navigation } from './Navigation';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const UserAdd = () => {

    const navigate = useNavigate();
    const history = createBrowserHistory();
    const [fullName,setFullName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [pcontrol,setPcontrol] = useState();
    const [role,setRole] = useState('ADMIN');
    const [picture,setPicture] = useState();
    const USER = useSelector((state) => state.user);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== pcontrol){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: `Passwords doesn't match!`
              })
             return
           }
           const user = new FormData();
           fullName && user.append("fullname", fullName);
           email && user.append("email", email);
           password && user.append("password", password);
           role && user.append("role", role);
           picture && user.append("picture", picture);
         
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    "token" : "Bearer " + USER.currentUser.accessToken 
                }
            }
            const res = await axios.post(`https://api.kuzeysoftware.com/auth/signup`, user, config);
            if(res.data == 'success'){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'User created successfully.'
                  })
                  setTimeout(() => {
                    navigate('/users');
                  }, 3000);
            }
        } catch (err) {
            console.log(err)
        }
    }
    useState(() => {
        console.log(USER.currentUser.accessToken )
        if(USER.loginStatus === false){
            history.push('/login');
            history.go('/login');
            return
          }
    })
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
              <li><img src={USER.currentUser.PROFILE_PICTURE} alt="profilResmi" />
              </li>
              <li style={{color: '#000'}}>
                <span>Hoşgeldin</span> <br /> <b> {USER.currentUser.FULLNAME}</b>
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
              <h4>
                Add New User</h4>
            </div>
            <div className="tab-inn">
              <form>
                <div className="row">
                  <div className="input-field col s6">
                    <input onChange={(e) => setFullName(e.target.value)} type="text" className="validate" />
                    <label htmlFor="first_name">Fullname</label>
                  </div>
                  <div className="input-field col s6">
                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="validate" />
                    <label htmlFor="last_name">Email</label>
                  </div>
                </div>
          
                <div className="row">
                  <div className="input-field col s6">
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="validate" />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="input-field col s6">
                    <input onChange={(e) => setPcontrol(e.target.value)} type="password"className="validate" />
                    <label htmlFor="password1">Confirm Password</label>
                  </div>
                </div>
                      <div className="row">
               
                <div className="input-field col s12">
                <label>Select User Role</label><br /><br />
                    <select onChange={(e) => setRole(e.target.value)}>
                      <option value={'Root'} disabled>Root</option>
                      <option value={'Admin'}>Admin</option>
                      <option value={'Editor'}>Editor</option>
                  
                    </select>
                  
                  </div>
            
                </div>
                <div className="row">
                <div className="input-field col s12">
                    <div className="file-field">
                      <div className="btn">
                        <span>IMAGE</span>
                        <input onChange={(e) => setPicture(e.target.files[0])} accept="image/png, image/jpeg, image/gif" type="file" />
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload Profile Picture" />
                      </div>
                    </div>
                  </div>
      
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button onClick={(e) => handleSubmit(e)} className="waves-effect waves-light btn-large">GÖNDER</button>
                  </div>
                </div>
              </form>
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
