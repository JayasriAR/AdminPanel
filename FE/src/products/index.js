import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
function ProductTable() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [maxIndex, setMaxIndex] = useState(0);
  const [showFullDescriptions, setShowFullDescriptions] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    proimage:null,
    pname: '',
    description: '',
    pprice: 0,
    stockcount: 0,
  });
  const customHeaders = {
    'authorization': localStorage.getItem('token'),
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    return (
      product._id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.pname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.pprice.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.stockcount.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleEdit = (productId) => {
    setEditingProduct(productId);
    const productToEdit = products.find(product => product._id === productId);
    setUpdatedData({ ...productToEdit, proimage: null }); // Set proimage to null initially
  };
  const handleSave = async (productId) => {
    try {
      const formData = new FormData();

      // Append non-empty values to the FormData object
      if (updatedData.pname.trim() !== '') {
        formData.append('pname', updatedData.pname);
      }
      if (updatedData.description.trim() !== '') {
        formData.append('description', updatedData.description);
      }
      if (!isNaN(updatedData.pprice)) {
        formData.append('pprice', updatedData.pprice);
      }
      if (!isNaN(updatedData.stockcount)) {
        formData.append('stockcount', updatedData.stockcount);
      }

      // Append the new image file if it's selected
      if (updatedData.proimage instanceof File) {
        formData.append('proimage', updatedData.proimage);
      }

      // Send a PUT request to the backend to update the product
      await axios.put(`http://127.0.0.1:3001/products/edit_product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = await axios.get('http://127.0.0.1:3001/products/get_all_products', {
        headers: customHeaders,
      });
  
      setProducts(response.data.data);
      setMaxIndex(response.data.data.length);
      // Clear the editing state after a successful edit
      setEditingProduct(null);
      swal({
        icon: 'success',
        title: 'Product Edited!',
    })
        .then(() => {
            navigate('/products');
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3001/products/get_all_products', {
        headers: customHeaders
})
      .then(function (response) {
        setProducts(response.data.data);
        setMaxIndex(response.data.data.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/products/delete_product/${productId}`, {
        headers: {
          'authorization': localStorage.getItem('token'),
        },
      });

      const response = await axios.get('http://127.0.0.1:3001/products/get_all_products', {
        headers: customHeaders,
      });
      setProducts(response.data.data);
      setMaxIndex(response.data.data.length);
      swal({
        icon: 'success',
        title: 'Product Deleted!',
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    localStorage.setItem('maxlen_Products', maxIndex.toString());
  }, [maxIndex]);
  const toggleDescription = (productId) => {
    setShowFullDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [productId]: !prevDescriptions[productId],
    }));
  };
  return (
    <>
   
      <h1 className='text-center py-4 font_Fam'>Products Details</h1>
      <Container fluid>
      <Form className="d-flex justify-content-center">
            <Form.Control
               type="text"
               value={searchQuery}
               onChange={handleSearchChange}
              placeholder="Search Products"
              className="form-control search mb-3 w-lg-50 w-25 font_Fam"
              aria-label="Search"
            />
            </Form>
    
      {filteredProducts.length === 0 ? (
          <Table responsive bordered className="text-center font_Fam m-2 bg-white rounder-2">
            <thead>
              <tr>
                <th>Id</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: 'red' }} className='mb-1' colSpan='5'>No Products found</td>
              </tr>
            </tbody>
          </Table>
        ) : (
            <Table responsive bordered className='font_Fam text-center bg-white rounder-2 pro_table w-100 table-responsive'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>

                  <td>
                    {editingProduct === product._id ? (
                      <input
                        type="text"
                        value={updatedData.pname}
                        onChange={(e) => setUpdatedData({ ...updatedData, pname: e.target.value })}
                      />
                    ) : (
                      <span>{product.pname}</span>
                    )}
                  </td>
                  <td className='description-cell'>
                    {editingProduct === product._id ? (
                      <textarea
                        value={updatedData.description}
                        onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                      />
                    ) : (
                      <>
                        {product.description && (
                          <>
                            {showFullDescriptions[product._id] ? (
                              <div>{product.description}</div>
                            ) : (
                              <div>
                                {`${product.description.slice(0, 50)}${product.description.length > 50 ? '...' : ''}`}
                              </div>
                            )}
                            {product.description.length > 50 && (
                              <span className='view-more' onClick={() => toggleDescription(product._id)}>
                                {showFullDescriptions[product._id] ? (
                                  <i className="fa-solid fa-angle-up icon_up"></i>
                                ) : (
                                  <i className="fa-solid fa-angle-down icon_up"></i>
                                )}
                              </span>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </td>
                  <td>
                    {editingProduct === product._id ? (
                      <input
                        type="text"
                        value={updatedData.pprice}
                        onChange={(e) => setUpdatedData({ ...updatedData, pprice: e.target.value })}
                      />
                    ) : (
                      <span>{product.pprice}</span>
                    )}
                  </td>
                  <td>
                    {editingProduct === product._id ? (
                      <input
                        type="text"
                        value={updatedData.stockcount}
                        onChange={(e) => setUpdatedData({ ...updatedData, stockcount: e.target.value })}
                      />
                    ) : (
                      <span>{product.stockcount}</span>
                    )}
                  </td>
                  <td>
                  {editingProduct === product._id ? (
    <input
      type="file"
      onChange={(e) => setUpdatedData({ ...updatedData, proimage: e.target.files[0] })}
    />
                  ) : (
                    <span>{product.proimage && (
                      <img
                        src={product.proimage}
                        alt="User"
                        style={{ maxWidth: '80px', maxHeight: '80px'}}
                      />
                    )}</span>
                  )}
                  </td>
                  <td>
                  {editingProduct === product._id ? (
                    <button className='btn btn-outline-success' onClick={() => handleSave(product._id)}>Save</button>
                  ) : (
                    <button className='btn btn-outline-warning' onClick={() => handleEdit(product._id)}>Edit</button>
                  )}
                  <button className='btn btn-outline-danger ms-2 mt-1' onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      <div className='text-center mt-3'>
        <Link to='/add-products' className='add_prod_btn mt-2 mb-2 font_Fam'>
          Add Product
        </Link>
      </div>
    </>
  );
}

export default ProductTable;
