import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Sidebar from './layouts/sidebar';
import Header from './layouts/header';
import Dashboard from './dashboard/index';
import Products from './products/index';
import Vendors from "./vendors/index";
import Users from "./users/index";
import Addproducts from "./products/addproduct";
import Addusers from "./users/addusers";
import Addvendor from "./vendors/addvendor";
import LoginForm from "./login";
import SignupForm from "./registerForm";
import { useState,useEffect } from "react";


function App() {
  const [authtoken, setAuthToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Check and update the token on every render
    setAuthToken(localStorage.getItem('token'));
  }, []);
  return (
    <BrowserRouter>
      {!authtoken || authtoken == null ? (
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      ) : (
        <div className="d-flex sidebar_bg" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="users" element={<Users />} />
              <Route path="add-users" element={<Addusers />} />
              <Route path="vendors" element={<Vendors />} />
              <Route path="add-vendors" element={<Addvendor />} />
              <Route path="add-products" element={<Addproducts />} />
            </Routes>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
