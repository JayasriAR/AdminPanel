import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import swal from 'sweetalert';
function UserTable() {
  const [users, setUsers] = useState([]);
  const [maxIndex, setMaxIndex] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    image:null,
    uname: '',
    uemail: '',
    uphno: 0,
    uaddress:'',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user => {
    return (
      user._id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.uname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.uemail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.uphno.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.uaddress.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const customHeaders = {
    'authorization': localStorage.getItem('token') ,
  };
  useEffect(() => {
        axios.get('http://127.0.0.1:3001/users/get_all_users', {
        headers: customHeaders
})
        .then(function (response) {
        // handle success
        setUsers(response.data.data);
        setMaxIndex(response.data.data.length);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('maxlen_users', maxIndex.toString());
  }, [maxIndex]);

  const handleEdit = (userId) => {
    setEditingUser(userId);
    const userToEdit = users.find(user => user._id === userId);
    setUpdatedData({ ...userToEdit, image: null }); // Set proimage to null initially
  };
  const handleSave = async (userId) => {
    try {
      const formData = new FormData();

      // Append non-empty values to the FormData object
      if (updatedData.uname.trim() !== '') {
        formData.append('uname', updatedData.uname);
      }
      if (updatedData.uemail.trim() !== '') {
        formData.append('uemail', updatedData.uemail);
      }
      if (updatedData.uaddress.trim() !== '') {
        formData.append('uaddress', updatedData.uaddress);
      }
    
      if (!isNaN(updatedData.uphno)) {
        formData.append('uphno', updatedData.uphno);
      }

      // Append the new image file if it's selected
      if (updatedData.image instanceof File) {
        formData.append('image', updatedData.image);
      }

      // Send a PUT request to the backend to update the product
      await axios.put(`http://127.0.0.1:3001/users/edit_user/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = await axios.get('http://127.0.0.1:3001/users/get_all_users', {
        headers: customHeaders,
      });
  
      setUsers(response.data.data);
      setMaxIndex(response.data.data.length);
      // Clear the editing state after a successful edit
      setEditingUser(null);
      swal({
        icon: 'success',
        title: 'user Edited!',
    });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/users/delete_user/${userId}`, {
        headers: {
          'authorization': localStorage.getItem('token'),
        },
      });

      const response = await axios.get('http://127.0.0.1:3001/users/get_all_users', {
        headers: customHeaders,
      });

      setUsers(response.data.data);
      setMaxIndex(response.data.data.length);

      swal({
        icon: 'success',
        title: 'User Deleted!',
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <>
      <h1 className="text-center py-4 font_Fam">User Details</h1>
      <Container fluid>
      <Form className="d-flex justify-content-center">
            <Form.Control
               type="text"
               value={searchQuery}
               onChange={handleSearchChange}
              placeholder="Search Users"
              className="form-control search mb-3 w-lg-50 w-25 font_Fam"
              aria-label="Search"
            />
            </Form>
        {filteredUsers.length===0 ? (
          <Table responsive className="pro_table text-center font_Fam m-2 bg-white rounder-2">
          <thead>
           <tr>
             <th>Id</th>
             <th>User Name</th>
             <th>Email</th>
             <th>Phone Number</th>
             <th>Address</th>
             <th>image</th>
           </tr>
         </thead>
         <tbody><tr><td style={{color:'red'}} className='mb-1' colspan='5'>No Users found</td></tr></tbody>
       </Table>
        ) : (
          <Table responsive bordered hover className="pro_table font_Fam text-center bg-white rounder-2">
            <thead>
              <tr>
                <th>Id</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                  {editingUser === user._id ? (
                      <input
                        type="text"
                        value={updatedData.uname}
                        onChange={(e) => setUpdatedData({ ...updatedData, uname: e.target.value })}
                      />
                    ) : (
                      <span>{user.uname}</span>
                    )}</td>
                    <td>
                {editingUser === user._id ? (
                      <input
                        type="text"
                        value={updatedData.uemail}
                        onChange={(e) => setUpdatedData({ ...updatedData, uemail: e.target.value })}
                      />
                    ) : (
                      <span>{user.uemail}</span>
                    )}</td>
                  <td>
                {editingUser === user._id ? (
                      <input
                        type="text"
                        value={updatedData.uphno}
                        onChange={(e) => setUpdatedData({ ...updatedData, uphno: e.target.value })}
                      />
                    ) : (
                      <span>{user.uphno}</span>
                    )}</td>
                   <td>
                {editingUser === user._id ? (
                      <input
                        type="text"
                        value={updatedData.uaddress}
                        onChange={(e) => setUpdatedData({ ...updatedData, uaddress: e.target.value })}
                      />
                    ) : (
                      <span>{user.uaddress}</span>
                    )}</td>
                     <td>
                  {editingUser === user._id ? (
    <input
      type="file"
      onChange={(e) => setUpdatedData({ ...updatedData, image: e.target.files[0] })}
    />
                  ) : (
                    <span> {user.image && (
                      <img
                        src={user.image}
                        alt="User"
                        style={{ maxWidth: '80px', maxHeight: '80px'}}
                      />
                    )}</span>
                  )}
                  </td>
                  <td>
                  {editingUser === user._id ? (
                    <button className='btn btn-outline-success' onClick={() => handleSave(user._id)}>Save</button>
                  ) : (
                    <button className='btn btn-outline-warning' onClick={() => handleEdit(user._id)}>Edit</button>
                  )}
                     <button className='btn btn-outline-danger ms-2 mt-1' onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
            
               
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      <div className="text-center mt-3">
        <Link to="/add-users" className="add_prod_btn mt-2 mb-2 font_Fam">
          Add New User
        </Link>
      </div>
    </>
  );
}

export default UserTable;
