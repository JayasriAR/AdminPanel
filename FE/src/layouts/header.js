import React, { useState } from 'react';
import swal from 'sweetalert';
// import { useNavigate } from 'react-router-dom';
function Header() {
    const [isToggled, setIsToggled] = useState(false);
    const click = () => {
      const sidebarToggle = document.body.querySelector('#sidebar-wrapper');
      if (sidebarToggle) {
      sidebarToggle.click();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        setIsToggled(!isToggled); // Toggle the state
      }
    };
    const logout=()=>{
      swal({
          title: "Are you sure?",
          text: "Do you need to logout!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willlogout) => {
          if (willlogout) {
            localStorage.removeItem('token');
            window.location.href = "/";
          }
        });
     }
  //  const uname1 = localStorage.getItem('uname');
  //  const uname = uname1.charAt(0).toUpperCase()+uname1.slice(1);
    return (
        <nav className="navbar navbar-expand-lg navbg border-bottom">
        <div className="container-fluid">
        <i
          className={`fa fa-solid ${isToggled ? 'fa-angles-right' : 'fa-angles-left'}`} onClick={click}
          id="sidebarToggle"
        ></i>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                    {/* <li className="nav-item active"><a className="nav-link fw-bold" href="#">{uname}</a></li> */}
                    <li className="nav-item active me-3" style={{cursor:'pointer'}}><a href="#" className="nav-link l-clr" onClick={logout}><i className="fa-solid fa-right-from-bracket "></i></a></li>
                    {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="f0alse">Services</a>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#!">Product</a>
                            <a className="dropdown-item" href="#!">Users</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#!">Vendors</a>
                        </div>
                    </li> */}
                </ul>
            </div>
       </div>
       </nav>
    
    );
  }
  
  export default Header;
  