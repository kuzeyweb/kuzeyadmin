import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Navigation } from './Navigation';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const WebsiteAdd = () => {
    const history = createBrowserHistory();
    const [path,setPath] = useState();
    const [keywords,setKeywords] = useState();

    const USER = useSelector((state) => state.user);


    const handleSubmit = async (e) => {
        Swal.fire({
            title: 'Sorgular yapılıyor...',
            html: 'Lütfen bekleyiniz...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading()
            }
          });
        e.preventDefault();
       
        const website = {
            "PATH" : path,
            "keywords" : keywords,
            "USER_ID" : USER.currentUser.ID
        }
         const res = await axios.post("https://api.kuzeysoftware.com/seo/create" , website);
        Swal.close();
        Swal.fire({
            icon : res.data.code ? "error" : "success",
            title: res.data.code ? 'Hata!' : 'Yükleme tamamlandı',
            html: res.data.code ? res.data.code : res.data,
          });
    };
    useState(() => {
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
                    <input onChange={(e) => setPath(e.target.value)} type="text" className="validate" />
                    <label htmlFor="first_name">URL</label>
                  </div>
              
                </div>
          
                      <div className="row">
               
                <div className="input-field col s12">
                <div className="input-field col s6">
                    <textarea style={{padding : '10px', width : '690px'}} placeholder="Anahtar kelimeler (Kelimeleri virgül ile ayırarak yazın)" onChange={(e) => setKeywords(e.target.value)}   />
                    
                  </div>
                  
                  </div>
            
                </div>
   
                <div className="row">
                  <div className="input-field col s12">
                    <button onClick={(e) => handleSubmit(e)} className="btn-primary waves-effect waves-light btn-large">GÖNDER</button>
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
