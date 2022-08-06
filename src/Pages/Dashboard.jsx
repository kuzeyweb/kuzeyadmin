import React, { useState } from 'react'
import {Navigation} from '../Components/Navigation'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { createBrowserHistory } from 'history';
import { login } from '../Redux/Auth';


export const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = createBrowserHistory();
  useState(() => {
    if(user.loginStatus === false){
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
         <h4>Sol menüden işlem seçiniz.</h4>
        </div>
      </div>
    </div>
  </div>
  )
}
