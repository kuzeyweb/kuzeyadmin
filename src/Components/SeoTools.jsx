import axios from 'axios'
import React, { useState } from 'react'
import { Navigation } from './Navigation'
import Swal from 'sweetalert2'
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';

export const SeoTools = () => {
    const history = createBrowserHistory();
    const [sites,setSites] = useState();
    const user = useSelector((state) => state.user);
    
    useState(() => {
        if(user.loginStatus === false){
            history.push('/login');
            history.go('/login');
            return
          }
          const getWebsites = async () => {
            const res = await axios.get(`https://api.kuzeysoftware.com/seo/getwebsites/${user.currentUser.ID}`);
          setSites(res.data);
          }
          getWebsites();
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
        <div className="sb2-2-3">
    <div className="row">
      <div className="col-md-12">
        <div className="box-inn-sp">
          <div className="inn-title">
            <h4>Bionluk Offers</h4>
     
            {/* Dropdown Structure */}
          </div>
          <div className="tab-inn">
            <div className="table-responsive table-desi">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Anahtar Kelime Sayısı</th>
                    <th>Genel Durum</th>
                    <th>İlk 3</th>
                    <th>3-10 Arası</th>
                    <th>10-100 Arası</th>
                  </tr>
                </thead>
                <tbody>
                    {sites && sites.map((site) => 
                    <tr key={site.WEBSITE_ID}>
                    <td><a href={"https://" + site.PATH}><span className="list-enq-name">https://{site.PATH}</span></a>
                    </td>
                    <td> <span className="label label-primary">{site.KEYWORDS}</span></td>  
                    <td> <i className="fa-solid fa-circle-arrow-up"></i></td>  
                    <td> <span className="label label-info">{site.FIRST_3}</span></td>  
                    <td> <span className="label label-success">{site.FOURTO_TEN}</span></td>  
                    <td> <span className="label label-warning">{site.TENTO_HUNDRED}</span></td>  
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
