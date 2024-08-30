import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AC_ADD_PRODUCT } from '../actions/products';
import swal from 'sweetalert';

function Addproducts() {
const dispatch = useDispatch();
const navigate=useNavigate();
    const [prodname,setprodname]=useState('');
    const [prodnamerr,setprodnamerr]=useState(false);

    const [description,setdescription]=useState('');
    const [descriptionerr,setdescriptionerr]=useState(false);
    const [description_format_err,setdescription_format_err]=useState(false);

    const [stock,setStock]=useState('');
    const[stock_err,setStockErr]=useState(false);
    const[stock_format_err,setStockFormatErr]=useState(false);

    const [price, setPrice] = useState("");
    const [priceFormatErr, setPriceFormatErr] = useState(false);
    const [priceErr, setPriceErr] = useState(false);



    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  
        if (allowedTypes.includes(file.type)) {
          setFileError('');
          setSelectedFile(file);
  
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setFileError('Invalid file type. Please select a PNG, JPG, or JPEG file.');
          setSelectedFile(null);
          setImagePreview(null);
        }
      } else {
        // No file selected
        setFileError('Please select a file.');
        setSelectedFile(null);
        setImagePreview(null);
      }
    };
    const addProduct=(event)=>{
      event.preventDefault();
      let prodname1=prodname;
      let description1=description;
      let priceValue1 = price;
      var flag_prodname=0;
      var flag_description=0;
      var flag_priceValue=0;
      var flag_stock=0;
      if (!selectedFile) {
        setFileError('Please select a file.');
      }
        if (priceValue1) {
          if (/^[0-9]+$/.test(priceValue1)) {
            const numericPrice = parseInt(priceValue1, 10);
    
            if (numericPrice !== 0) {
              flag_priceValue=1;
              setPrice(priceValue1);
              setPriceFormatErr(false);
              setPriceErr(false);
            } else {
              setPrice(priceValue1);
              setPriceFormatErr(false);
              setPriceErr(true);
            }
          } else {
            setPrice(priceValue1);
            setPriceFormatErr(true);
            setPriceErr(false);
          }
        } else {
          setPrice(priceValue1);
          setPriceFormatErr(false);
          setPriceErr(true);
        }
      if(prodname1){
        if(prodname1.length>0){
          setprodnamerr(false)
          flag_prodname=1;
          setprodname(prodname1)
        }
        else{
          setprodnamerr(true)
      }
      }
    
      if (description1){
      if(description1.length>200){
          setdescription(description1)
          setdescription_format_err(true)
          setdescriptionerr(false)
      }
      else{
          setdescription(description1)
          setdescription_format_err(false)
          setdescriptionerr(false)
          flag_description=1;
      }
    }
    else{
      setdescription(description1)
      setdescription_format_err(false)
      setdescriptionerr(true)
    }
  
    
    const stockValue = stock;

    if (stockValue) {
      if (/^[0-9]+$/.test(stockValue)) {
        if (parseInt(stockValue, 10) !== 0) {
          flag_stock=1;
          setStock(stockValue);
          setStockFormatErr(false);
          setStockErr(false);
        } else {
          setStock(stockValue);
          setStockFormatErr(false);
          setStockErr(true);
        }
      } else {
        setStock(stockValue);
        setStockFormatErr(true);
        setStockErr(false);
      }
    } else {
      setStock(stockValue);
      setStockFormatErr(false);
      setStockErr(true);
    }

    if(flag_description==1 && flag_priceValue==1 && flag_prodname==1 && flag_stock==1){
      let proddata = {pname:prodname,description:description,pprice:price,stockcount:stock,proimage:selectedFile}
      dispatch(AC_ADD_PRODUCT(proddata));
      swal({
        icon: 'success',
        title: 'Product Added!',
    })
        .then(() => {
            navigate('/products');
        });
    }
  }

  
      const inputChange=(event)=>{
        let id=event.target.id;
        let value=event.target.value;
        if(id=='price'){
        const priceValue = value;

        if (priceValue) {
          if (/^[0-9]+$/.test(priceValue)) {
            const numericPrice = parseInt(priceValue, 10);
    
            if (numericPrice !== 0) {
              setPrice(priceValue);
              setPriceFormatErr(false);
              setPriceErr(false);
            } else {
              setPrice(priceValue);
              setPriceFormatErr(false);
              setPriceErr(true);
            }
          } else {
            setPrice(priceValue);
            setPriceFormatErr(true);
            setPriceErr(false);
          }
        } else {
          setPrice(priceValue);
          setPriceFormatErr(false);
          setPriceErr(true);
        }
      }

        if(id=='prodname'){
        if(value.length>0){
          setprodnamerr(false)
          setprodname(value)
        }
        else{
            setprodnamerr(true)
            setprodname(value)
        }
          }
        if(id=='description'){
          if (value){
            if(value.length>200){
                setdescription(value)
                setdescription_format_err(true)
                setdescriptionerr(false)
            }
            else{
                setdescription(value)
                setdescription_format_err(false)
                setdescriptionerr(false)
            }
          }
          else{
            setdescription(value)
            setdescription_format_err(false)
            setdescriptionerr(true)
          }
        }

        if(id=='stock'){
          const stockValue = value;

    if (stockValue) {
      if (/^[0-9]+$/.test(stockValue)) {
        if (parseInt(stockValue, 10) !== 0) {
          setStock(stockValue);
          setStockFormatErr(false);
          setStockErr(false);
          
        } else {
          setStock(stockValue);
          setStockFormatErr(false);
          setStockErr(true);
        }
      } else {
        setStock(stockValue);
        setStockFormatErr(true);
        setStockErr(false);
      }
    } else {
      setStock(stockValue);
      setStockFormatErr(false);
      setStockErr(true);
    }
  }
        }

    return (
        <>
          <div className='container-fluid fluid_color'></div>
        <form encType="multipart/form-data" className="container text-center product_form p-3 pt-5">
        <h1 className='text-center font-fam mt-3 font-weight-bold mb-3' style={{color:'black'}}>Enter Product details</h1><br/>
        <input type='text' id='prodname' value={prodname} onChange={inputChange} placeholder='Enter Your Product Name'/><br/>
        {prodnamerr?<span style={{color:'red'}} id='prodnamerr'>Product name is Required</span>:""}<br/><br/>
    
        <textarea  id='description' value={description} onChange={inputChange} placeholder='Enter Your description'></textarea>
        <br/>
        {descriptionerr?<span style={{color:'red'}} id='descriptionerr'>Description is Required</span>:""}
    
        {description_format_err?<span style={{color:'red'}} id='description_format_err'>Max Length For Description Is 200 Words</span>:""}<br/><br/>
        <input type='text' id='stock' value={stock} onChange={inputChange} placeholder='Enter Max Stock'/><br/>
        {stock_format_err?<span style={{color:'red'}} id='stock_format_err'>Enter Max Stock as Numbers</span>:""}
        {stock_err?<span style={{color:'red'}} id='stock_err'>Stock Cannot Be Zero</span>:""}
        <br/><br/>
        <input type="text" id="price" value={price} onChange={inputChange} placeholder="Enter Price"/>
        <br/>
      {priceFormatErr ? (<span style={{ color: 'red' }} id="price_format_err">Enter Price as Numbers </span>) : ('')}
      {priceErr ? (<span style={{ color: 'red' }} id="price_err">Price Cannot Be Zero </span>) : ('')}
        <br/>
        <input type="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange} /><br/>
        {fileError && <span style={{ color: 'red' }}>{fileError}</span>}<br/>
        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />}<br/><br/>
        <button type="button" className="btn btn-outline-success font_Fam" onClick={addProduct}>Add Product</button>
        <br/><br/>
        <Link to="/products" className='add_prod_btn mt-5 font_Fam'>Back</Link>
        </form></>
    );
}


export default Addproducts;
