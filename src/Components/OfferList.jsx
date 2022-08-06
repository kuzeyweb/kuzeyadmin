import axios from 'axios'
import React, { useState } from 'react'
import { Navigation } from './Navigation'
import env from "react-dotenv";
import Swal from 'sweetalert2'
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';

export const OfferList = () => {
    const history = createBrowserHistory();
    const [offers,setOffers] = useState();
    const user = useSelector((state) => state.user);
    
    useState(() => {
/*         if(user.loginStatus === false){
            history.push('/login');
            history.go('/login');
            return
          } */
        const getUsers = async () => {
            const res = await axios.get(`https://localhost:6161/bion/getall`);
            setOffers(res.data.sort((a,b) => b.ID - a.ID))
            
        }
        getUsers();
    })

    const autoMessage = async (title) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Message will be sent immediately!",
            icon: 'warning',
            confirmButtonText: 'Yes send!',
            showCancelButton: true,
            confirmButtonColor: '#000'
          }).then(async (result) => {
            if(result.isConfirmed){
              const res = await axios.post(`http://localhost:6161/bion/automsg`, {search: title})
              Swal.fire(res.data)
            }
           
          });
    }
    const manualMessage = async (title) => {
        const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Sending an offer message...',
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
              'aria-label': 'Type your message here'
            },
            showCancelButton: true
          })
          
          if (text) {
            const res = await axios.post(`http://localhost:6161/bion/manmsg`, {search: title, index: text})
            Swal.fire(res.data)
          }
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
            <h4>Bionluk Offers</h4>
     
            {/* Dropdown Structure */}
          </div>
          <div className="tab-inn">
            <div className="table-responsive table-desi">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Name</th>
                    <th>BreadCrumb</th>
                    <th>Title</th>
                    <th>Text</th>
                    <th>Butce</th>
                    <th>Sure</th>
                    <th>TeklifSayisi</th>
                    <th>Hazır Teklif Yolla</th>
                    <th>Özel Teklif Yolla</th>
                  </tr>
                </thead>
                <tbody>
                    {offers && offers.map((offer) => 
                    <tr key={offer.ID}>
                    <td><a target="_blank" href={offer.IMG} className="list-img"><img src={offer.IMG} alt="" /></a>
                    </td>
                    <td><a href="#"><span className="list-enq-name">{offer.NAME}</span></a>
                    </td>
                    <td>{offer.BREADCRUMB}</td>
                    <td> {offer.TITLE}</td>
                    <td> {offer.TEXT}</td>
                    <td> <span className="label label-primary">{offer.BUTCE}</span></td>
                    <td>{offer.SURE}</td>
                    <td>{offer.TEKLIF_SAYISI}</td>
                    <td>
                      <a style={{cursor : 'pointer'}} onClick={()  => autoMessage(offer.TITLE)}><i className="fa-solid fa-comment"></i></a>
                    </td>
                    <td>
                      <a style={{cursor : 'pointer'}} onClick={()  => manualMessage(offer.TITLE)} ><i className="fa-solid fa-comment-dots"></i></a>
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
