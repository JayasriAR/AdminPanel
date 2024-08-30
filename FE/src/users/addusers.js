import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AC_ADD_USER } from '../actions/users';
import { Link,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Addusers() {
  const navigate=useNavigate();
const dispatch = useDispatch();
    const [username,setusername]=useState('');
    const [usernamerr,setusernamerr]=useState(false);

    const [email,setEmail]=useState('');
    const [Mailerr,setMailerr]=useState(false);
    const [Mail_format_err,setMail_format_err]=useState(false);

    const [phno,setPhno]=useState('');
    const[Phnoerr,setPhnoerr]=useState(false);
    const[Phno_format_err,setPhno_format_err]=useState(false);
 
    const [Address,setAddress]=useState('');
    const [Addresserr,setAddresserr]=useState(false);
    const [Address_format_err,setAddress_format_err]=useState(false);


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
  
    const Adduser_submit = (event) => {
      // Validation for the selected file
      event.preventDefault();

      let username1 = username;
      let Address1 = Address;
      let phno1 = phno;
      let email1 = email;
      let flag_username1 = 0;
      let flag_Address = 0;
      let flag_phno = 0;
      let flag_email = 0;
      if (!selectedFile) {
        setFileError('Please select a file.');
      }
      if (username1) {
        setusernamerr(false);
        flag_username1 = 1;
      } else {
        setusernamerr(true);
        flag_username1 = 0;
      }
    
      if (Address1) {
        if (Address1.length > 200) {
          setAddress_format_err(true);
          setAddresserr(false);
          flag_Address = 0;
        } else {
          setAddress_format_err(false);
          setAddresserr(false);
          flag_Address = 1;
        }
      } else {
        setAddress_format_err(false);
        setAddresserr(true);
        flag_Address = 0;
      }
    
      if (email1) {
        setEmail(email1);
        let regexpattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (regexpattern.test(email1)) {
          setMail_format_err(false);
          setMailerr(false);
          flag_email = 1;
        } else {
          setMail_format_err(true);
          setMailerr(false);
          flag_email = 0;
        }
      } else {
        setEmail(email1);
        setMail_format_err(false);
        setMailerr(true);
        flag_email = 0;
      }
    
      if (phno1) {
        setPhno(phno1);
        let regex_phone = /^\d{10}$/;
        if (regex_phone.test(phno1)) {
          setPhno_format_err(false);
          setPhnoerr(false);
          flag_phno = 1;
        } else {
          setPhno_format_err(true);
          setPhnoerr(false);
          flag_phno = 0;
        }
      } else {
        setPhno_format_err(false);
        setPhnoerr(true);
        flag_phno = 0;
      }
    
      if (flag_Address === 1 && flag_email === 1 && flag_username1 === 1 && flag_phno === 1) {
        let userdata = { uname: username, uaddress: Address, uemail: email, uphno: phno,image: selectedFile,};
        dispatch(AC_ADD_USER(userdata));
        swal({
          icon: 'success',
          title: 'User Added!',
      })
          .then(() => {
              navigate('/users');
          });
      }
    };
    


      const inputChange=(event)=>{
        let id=event.target.id;
        let value=event.target.value;
        

        if(id=='username'){
        if(value.length>0){
          setusernamerr(false)
          setusername(value)
        }
        else{
            setusernamerr(true)
            setusername(value)
        }
          }
        if (id == 'email') {
            setEmail(value);
            let regexpattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            setMail_format_err(!regexpattern.test(value));
            setMailerr(false);
        }
  
          if(id=='phno'){
            setPhno(value)
            let phno1=value;
          let regex_phone=/^\d{10}$/;
          if (phno1) {
            if (regex_phone.test(phno1)) {
                setPhno(phno1)
                setPhno_format_err(false)
                setPhnoerr(false)
            } else {
                setPhno(phno1)
                setPhno_format_err(true)
                setPhnoerr(false)
            }
          }
           else {
                setPhno(phno1)
                setPhno_format_err(false)
                setPhnoerr(true)
          }
          }
            
        
        if(id=='Address'){
          if (value){
            if(value.length>200){
                setAddress(value)
                setAddress_format_err(true)
                setAddresserr(false)
            }
            else{
                setAddress(value)
                setAddress_format_err(false)
                setAddresserr(false)
            }
          }
          else{
            setAddress(value)
            setAddress_format_err(false)
            setAddresserr(true)
          }
        }

        }

    return (
        <>
        <form className="container text-center user_form p-3 pt-5">
        <h1 className='text-center font-fam mt-3 font-weight-bold mb-3' style={{color:'black'}}>Enter user details</h1><br/>
        <input type='text' id='username' value={username} onChange={inputChange} placeholder='Enter Your user Name'/><br/>
        {usernamerr?<span style={{color:'red'}} id='usernamerr'>User name is Required</span>:""}<br/><br/>
        <input type='text' id='email' value={email} onChange={inputChange} placeholder='Enter User email'/><br/>
        {Mailerr?<span style={{color:'red'}} id='Mailerr'>Mail is Required</span>:""}
        {Mail_format_err?<span style={{color:'red'}} id='Mail_format_err'>Enter Valid Mail</span>:""}<br/><br/>
        
        <textarea  id='Address' value={Address} onChange={inputChange} placeholder='Enter Your Address'></textarea>
        <br/>
        {Addresserr?<span style={{color:'red'}} id='Addresserr'>Address is Required</span>:""}
        {Address_format_err?<span style={{color:'red'}} id='Address_format_err'>Max Length For Address Is 200 Words</span>:""}
    
        <br/><br/>
        <input type='text' id='phno' placeholder='Enter Your Phone Number' value={phno} onChange={inputChange}/><br/>
        {Phnoerr?<span style={{color:'red'}} id='Phnoerr'>Phone Number is Required</span>:""}
        {Phno_format_err?<span style={{color:'red'}} id='Phno_format_err'>Enter Valid Phone Number</span>:""}<br/>
        <input type="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange} /><br/>
        {fileError && <span style={{ color: 'red' }}>{fileError}</span>}<br/>
        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />}<br/>
        <button type="button" className="btn btn-outline-success mt-4" onClick={Adduser_submit}>Add user</button><br/><br/>
        <Link to="/users" className='add_prod_btn mt-5 font_Fam'>Back</Link>
        </form></>
    );
}


export default Addusers;
