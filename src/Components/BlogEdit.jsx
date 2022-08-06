import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Navigation } from './Navigation'
import { createBrowserHistory } from 'history';
import Swal from 'sweetalert2'


export const BlogEdit = () => {
  
  const navigate = useNavigate();
  const history = createBrowserHistory();

  const user = useSelector((state) => state.user);
  const [blog,setBlog] = useState();
  const [title,setTitle] = useState();
  const [banner,setBanner] = useState();
  const [article,setArticle] = useState();
  const [category,setCategory] = useState();
  const [author,setAuthor] = useState();
  const id = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let blog = new FormData();
    title && blog.append("title", title);
    banner && blog.append("banner", banner);
    article && blog.append("article", article);
    category && blog.append("category", category);
    author && blog.append("author", author);
    blog.append("id", id.id);
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
                ,'Access-Control-Allow-Origin': '*',
                "token" : "Bearer " + user.currentUser.accessToken 
            }
        }
        const res = await axios.post(`https://localhost:6161/blog/edit`, blog, config);
        if (res.data == 'success') {
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
                title: 'Blog successfully updated.'
            })
            setTimeout(() => {
                navigate('/blogs');
            }, 3000);
        }
    } catch (err) {
        console.log(err)
    }
}

  useState(() => {
    if(user.loginStatus === false){
      history.push('/login');
      history.go('/login');
      return
    }
      const getBlog = async () => {
          const res = await axios.get(`https://localhost:6161/blog/getbyid/${id.id}`);
          setBlog(res.data[0]);
          setTitle(res.data[0].TITLE);
          setBanner(res.data[0].BANNER);
          setArticle(res.data[0].ARTICLE);
          setCategory(res.data[0].CATEGORY);
          setAuthor(res.data[0].AUTHOR);
      }
      getBlog();

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
        <div className="sb2-2-add-blog sb2-2-1">
    <div className="box-inn-sp">
      <div className="inn-title">
        <h4>Edit Post</h4>
      </div>
      <div className="bor">
        <form>
          <div className="row">
            <div className="input-field col s12">
            <small htmlFor="list-title">Title</small>
              <input onChange={(e) => setTitle(e.target.value)} type="text" defaultValue={blog && blog.TITLE} className="validate" />
              
            </div>
            <div className="input-field col s12">
              <div className="file-field">
                <div className="btn">
                  <span>File</span>
                  <input type="file" />
                </div>
                <div className="file-path-wrapper">
                  <input onChange={(e) => setBanner(e.target.files[0])} className="file-path validate" type="text" placeholder="Değiştirmek için yükleyin, aynı kalması için boş bırakın." />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12"> <small >Blog Article:</small>
              <textarea onChange={(e) => setArticle(e.target.value)} className="materialize-textarea" defaultValue={blog && blog.ARTICLE} />
             
            </div>
          </div>
          <div className="row">
          </div>
          <div className="row">
            <div className="input-field col s12">
            <small htmlFor="post-auth">Category</small>
              <input onChange={(e) => setCategory(e.target.value)} type="text" defaultValue={blog && blog.CATEGORY} className="validate" />
              
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
            <small >Author Name</small>
              <input onChange={(e) => setAuthor(e.target.value)} type="text" defaultValue={blog && blog.AUTHOR} className="validate" />
             
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <button onClick={(e) => handleSubmit(e)}  className="waves-effect waves-light btn-large"  > Submit </button>
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



  )
}
