import axios from 'axios';
import React, { useState } from 'react'
import { Navigation } from './Navigation'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';

export const BlogList = () => {

    const [blogs,setBlogs] = useState();
    const user = useSelector((state) => state.user);
    const history = createBrowserHistory();

    useState(() => {
        if(user.loginStatus === false){
            history.push('/login');
            history.go('/login');
            return
          }
        const getBlogs = async () => {
            const res = await axios.get(`https://localhost:6161/blog/getall`);
            setBlogs(res.data)
        }
        getBlogs();
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
              const res = await axios.delete(`https://localhost:6161/blog/delete/${id}`,
              {headers: {
                'Access-Control-Allow-Origin': '*',
              "token" : "Bearer " + user.currentUser.accessToken }})
              setBlogs(res.data)
            }
          });
    }

    const handleView = (blog) => {
        Swal.fire({
            imageUrl: blog.BANNER,
            html:
              `<h3>${blog.TITLE}</h3>` +
              `<small>Yazar: ${blog.AUTHOR}</small><br>` +
              `<small>Okunma Sayısı : ${blog.VIEW_COUNT}</small>` +
              `<p>${blog.ARTICLE}</p>` 
             ,
          })
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
            <h4>All Blog Posts</h4>
     
            {/* Dropdown Structure */}
          </div>
          <div className="tab-inn">
        <div className="table-responsive table-desi">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Author</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Edit</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                {blogs && blogs.map((blog) => 
                 <tr key={blog.ID}>
                 <td>{blog.ID}</td>
                 <td>{blog.AUTHOR}</td>
                 <td>{blog.TITLE}</td>
                 <td>{blog.CATEGORY}</td>
                 <td>{blog.CREATED_AT}</td>
                 <td><a  href={`/blogs/edit/${blog.ID}`} className="sb2-2-1-edit"><i className="fa-solid fa-pencil" aria-hidden="true" /></a>
                 </td>
                 <td><a style={{cursor: 'pointer'}} onClick={() => handleView(blog)} className="sb2-2-1-edit"><i className="fa-solid fa-eye" aria-hidden="true" /></a>
                 </td>
                 <td><a style={{cursor: 'pointer'}} onClick={() => handleDelete(blog.ID)} className="sb2-2-1-edit"><i className="fa-solid fa-trash" aria-hidden="true" /></a>
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
