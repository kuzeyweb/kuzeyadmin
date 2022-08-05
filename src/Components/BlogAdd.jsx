import axios from 'axios';
import React, { useState } from 'react'
import { Navigation } from './Navigation'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';

export const BlogAdd = () => {

    const navigate = useNavigate();
    const history = createBrowserHistory();

    const [title, setTitle] = useState();
    const [banner, setBanner] = useState();
    const [article, setArticle] = useState();
    const [category, setCategory] = useState();
    const [author, setAuthor] = useState();
    const user = useSelector((state) => state.user);

    useState(() => {
        if(user.loginStatus === false){
            history.push('/login');
            history.go('/login');
            return
          }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        let blog = new FormData();
        title && blog.append("title", title);
        banner && blog.append("banner", banner);
        article && blog.append("article", article);
        category && blog.append("category", category);
        author && blog.append("author", author);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    "token" : "Bearer " + user.currentUser.accessToken 
                }
            }
            const res = await axios.post(`https://api.kuzeysoftware.com/blog/create`, blog, config);
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
                    title: 'Blog created successfully.'
                })
                setTimeout(() => {
                    navigate('/blogs')
                }, 3000);
            }
        } catch (err) {
            console.log(err)
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
                                <li style={{ color: '#000' }}>
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
                                    <h4>Add New Post</h4>
                                </div>
                                <div className="bor">
                                    <form>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={(e) => setTitle(e.target.value)} type="text" className="validate" />
                                                <label htmlFor="list-title">Title</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <div className="file-field">
                                                    <div className="btn">
                                                        <span>Banner</span>
                                                        <input onChange={(e) => setBanner(e.target.files[0])} type="file" />
                                                    </div>
                                                    <div className="file-path-wrapper">
                                                        <input className="file-path validate" type="text" placeholder="Upload Blog Banner" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea onChange={(e) => setArticle(e.target.value)} className="materialize-textarea" defaultValue={""} />
                                                <label htmlFor="textarea1">Blog Article:</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={(e) => setCategory(e.target.value)} type="text" className="validate" />
                                                <label htmlFor="post-auth">Category</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <input onChange={(e) => setAuthor(e.target.value)} type="text" className="validate" />
                                                <label htmlFor="post-auth">Author </label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <button onClick={(e) => handleSubmit(e)} className="waves-effect waves-light btn-large" >Submit</button>
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
