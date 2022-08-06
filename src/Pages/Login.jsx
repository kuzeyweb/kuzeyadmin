import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import '../assets/css/login.css';
import '../assets/css/loginStyle.css';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Auth';

export const Login = () => {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate()
    const dispatch = useDispatch();
   
    useState(() => {
      const user =  {
        "ID": 28,
        "FULLNAME": "test",
        "EMAIL": "f@m",
        "ROLE": "ROOT",
        "PROFILE_PICTURE": "http://api.kuzeysoftware.com/public/w5L-79mOG-JPN(3).png",
        "REGISTERED_AT": "2022-08-01T16:46:08.000Z",
        "LAST_LOGIN": "2022-08-06T12:00:45.000Z",
        "LAST_OFFER": 11545,
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsInJvbGUiOiJST09UIiwiaWF0IjoxNjU5Nzg4MTM3LCJleHAiOjE2NjAwNDczMzd9.Jsg3qEvJHfEs5yJG-MiTrwWSwpxgrlr1mtWKtcasOWA",
        "websites" :     [{
          "WEBSITE_ID": 1,
          "USER_ID": 28,
          "PATH": "youtube.com",
          "KEYWORDS": 7,
          "FIRST_3": 2,
          "FOURTO_TEN": 3,
          "TENTO_HUNDRED": 2
      },
      {
          "WEBSITE_ID": 3,
          "USER_ID": 28,
          "PATH": "kuzeysoftware.com",
          "KEYWORDS": 7,
          "FIRST_3": 0,
          "FOURTO_TEN": 0,
          "TENTO_HUNDRED": 0
      },
      {
          "WEBSITE_ID": 4,
          "USER_ID": 28,
          "PATH": "ablemar.com",
          "KEYWORDS": 5,
          "FIRST_3": 0,
          "FOURTO_TEN": 0,
          "TENTO_HUNDRED": 0
      }
  ]
    }
      dispatch(login(user));
      setTimeout(() => {
        navigate('/');
      }, 2000);
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('https://api.kuzeysoftware.com/auth/signin', {email,password}); 
            if(res.data.accessToken){
                const res1 = await axios.get(`https://api.kuzeysoftware.com/seo/getwebsites/${res.data.ID}`);
                const websites = res1.data
                const user = {...res.data, websites}
                dispatch(login(user))
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
                    title: 'Welcome ' + res.data.FULLNAME + '!'
                })
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }           
        }catch(err){
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
                title: 'Incorrect username or password'
            })
           
        }
    }

  return (
   <div className="form-body">
     
        <div className="row">
          <div className="img-holder">
            <div className="bg" />
            <div className="info-holder">
              <img src="https://i.ibb.co/9b48rY1/kuzey-white.png" alt="" />
            </div>
          </div>
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <div className="page-links">
                  <a className="active">Login</a>
                </div>
                <form>
                  <input onChange={(e) => setEmail(e.target.value)} className="form-control" type="text" name="username" placeholder="E-mail Address" required />
                  <input onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" name="password" placeholder="Password" required />
                  <div className="form-button">
                    <button onClick={(e) => handleSubmit(e)}  className="ibtn">Login</button> <a href="forget7.html">Forget password?</a>
                  </div>
                </form>
          
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
