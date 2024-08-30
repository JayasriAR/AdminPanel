import { Link } from "react-router-dom";
import React, { useState } from 'react';


function Sidebar() {

  return (
    <div className="border-end font_Fam" id="sidebar-wrapper">
                <div className="fw-bold sidebar-heading border-bottom bg-transparent">Admin<span className="brand_logo">Zone</span></div>
                <div className="list-group list-group-flush bg-transparent">
                    <Link to="/" className="list-group-item  bg-transparent list-group-item-action list-group-item-light p-3" >Dashboard</Link>
                    <Link to="/products" className="list-group-item  bg-transparent list-group-item-action list-group-item-light p-3" >Products</Link>
                    <Link to="/users" className="list-group-item list-group-item-action  bg-transparent list-group-item-light p-3" >Users</Link>
                    <Link to="/vendors" className="list-group-item list-group-item-action  bg-transparent list-group-item-light p-3">Vendors</Link>
                </div>
            </div>
  );
}

export default Sidebar;
