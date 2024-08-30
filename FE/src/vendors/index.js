import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { Link} from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import Form from 'react-bootstrap/Form';

function VendorTable() {
  
  const [editingVendor, setEditingVendor] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [maxIndex, setMaxIndex] = useState(0);
  const customHeaders = {
    'authorization': localStorage.getItem('token') ,
  };
  const [updatedData, setUpdatedData] = useState({
    vname: '',
    vaddress: '',
    vphno: '',
    vemail: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = vendors.filter(vendor => {
    return (
      vendor._id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.vname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.vaddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.vphno.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.vemail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    axios
      .get('http://127.0.0.1:3001/vendors/get_all_vendors', {
        headers: customHeaders
})
      .then(function (response) {
        setVendors(response.data.data);
        setMaxIndex(response.data.data.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  

  // Save max index to localStorage
  useEffect(() => {
    localStorage.setItem('maxIndex', maxIndex.toString());
  }, [maxIndex]);

  const handleDelete = async (vendorId) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/vendors/delete_vendor/${vendorId}`, {
        headers: {
          'authorization': localStorage.getItem('token'),
        },
      });

      const response = await axios.get('http://127.0.0.1:3001/vendors/get_all_vendors', {
        headers: customHeaders,
      });

      setVendors(response.data.data);
      setMaxIndex(response.data.data.length);

      swal({
        icon: 'success',
        title: 'Vendor Deleted!',
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (vendorId) => {
    setEditingVendor(vendorId);
    const vendorToEdit = vendors.find(vendors => vendors._id === vendorId);
    setUpdatedData({ ...vendorToEdit, }); // Set proimage to null initially
  };
  const handleSave = async (vendorId) => {
  try {
    console.log('----------------updated vendor---------------',updatedData);
  

    await axios.put(`http://127.0.0.1:3001/vendors/edit_vendor/${vendorId}`, updatedData);

    const response = await axios.get('http://127.0.0.1:3001/vendors/get_all_vendors', {
      headers: customHeaders,
    });

    setVendors(response.data.data);
    setMaxIndex(response.data.data.length);
    // Clear the editing state after a successful edit
    setEditingVendor(null);
    swal({
      icon: 'success',
      title: 'Vendors Edited!',
  });
     
  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
      <h1 className='text-center py-4 font_Fam'>Vendor Details</h1>
      <Container fluid>
      <Form className="d-flex justify-content-center">
            <Form.Control
               type="text"
               value={searchQuery}
               onChange={handleSearchChange}
              placeholder="Search Vendors"
              className="form-control search mb-3 w-lg-50 w-25 font_Fam"
              aria-label="Search"
            />
            </Form>
        {filteredVendors.length === 0 ? (
          <Table responsive className="text-center font_Fam m-2 bg-white rounder-2">
             <thead>
              <tr>
                <th>Id</th>
                <th>Vendor Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Contract</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody><tr><td style={{color:'red'}} colspan='5'>No Vendors found</td></tr></tbody>
          </Table>
        ) : (
          <Table responsive bordered hover className='pro_table font_Fam text-center bg-white rounder-2'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Vendor Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Contract</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor, index) => (
                <tr key={vendor._id}>
                  <td>{index + 1}</td>
                  <td>
                    {editingVendor === vendor._id ? (
                      <input
                        type="text"
                        value={updatedData.vname}
                        onChange={(e) => setUpdatedData({ ...updatedData, vname: e.target.value })}
                      />
                    ) : (
                      <span>{vendor.vname}</span>
                    )}
                  </td>
                  <td>
                    {editingVendor === vendor._id ? (
                      <input
                        type="text"
                        value={updatedData.vemail}
                        onChange={(e) => setUpdatedData({ ...updatedData, vemail: e.target.value })}
                      />
                    ) : (
                      <span>{vendor.vemail}</span>
                    )}
                  </td>
                  <td>
                    {editingVendor === vendor._id ? (
                      <input
                        type="text"
                        value={updatedData.vphno}
                        onChange={(e) => setUpdatedData({ ...updatedData, vphno: e.target.value })}
                      />
                    ) : (
                      <span>{vendor.vphno}</span>
                    )}
                  </td>
                  <td>
                    {editingVendor === vendor._id ? (
                      <input
                        type="text"
                        value={updatedData.vaddress}
                        onChange={(e) => setUpdatedData({ ...updatedData, vaddress: e.target.value })}
                      />
                    ) : (
                      <span>{vendor.vaddress}</span>
                    )}
                  </td>
                  <td>
                  {editingVendor === vendor._id ? (
                    <button className='btn btn-outline-success' onClick={() => handleSave(vendor._id)}>Save</button>
                  ) : (
                    <button className='btn btn-outline-warning' onClick={() => handleEdit(vendor._id)}>Edit</button>
                  )}
               <button className='btn btn-outline-danger ms-2 mt-1' onClick={() => handleDelete(vendor._id)}>Delete</button>
                </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <div className='mt-3 text-center'>
           <Link to="/add-vendors" className='add_prod_btn mt-5 me-2 font_Fam'>Add New Vendor</Link>
         </div>
      </Container>
     
    </>
  );
}

export default VendorTable;
