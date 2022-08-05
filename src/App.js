import {Dashboard} from './Pages/Dashboard'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserList } from './Components/UserList';
import { BlogAdd } from './Components/BlogAdd';
import { UserAdd } from './Components/UserAdd';
import { BlogList } from './Components/BlogList';
import { BlogEdit } from './Components/BlogEdit';
import { Login } from './Pages/Login';
import { OfferList } from './Components/OfferList';
import { SeoTools } from './Components/SeoTools';
import { WebsiteDetails } from './Components/WebsiteDetails';
import { WebsiteAdd } from './Components/WebsiteAdd';

function App() {
  return (
    <Router>
    <Routes>
        
    <Route exact path="/" element={<Dashboard />} /> 
    <Route path="/login" element={<Login />} /> 
    <Route path="/offers" element={<OfferList />} /> 
    <Route path="/users" element={<UserList />} /> 
    <Route path="/users/edit/:id" element={<UserList />} /> 
    <Route path="/createuser" element={<UserAdd />} /> 
    <Route path="/blogs" element={<BlogList />} /> 
    <Route path="/blogs/edit/:id" element={<BlogEdit />} /> 
    <Route path="/createblog" element={<BlogAdd />} /> 
    <Route path="/seotools" element={<SeoTools />} /> 
    <Route path="/websitedetails/:site/:id" element={<WebsiteDetails />} /> 
    <Route path="/addwebsite" element={<WebsiteAdd />} /> 

    </Routes>
    </Router>
  );
}

export default App;
