import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AC_ADD_VENDOR } from '../actions/vendors';
import { Link,useNavigate} from 'react-router-dom';
import swal from 'sweetalert';

function Addvendor() {
  const navigate = useNavigate();
const dispatch = useDispatch();
    const [vendorname,setvendorname]=useState('');
    const [vendornamerr,setvendornamerr]=useState(false);

    const [email,setEmail]=useState('');
    const [Mailerr,setMailerr]=useState(false);
    const [Mail_format_err,setMail_format_err]=useState(false);

    const [phno,setPhno]=useState('');
    const[Phnoerr,setPhnoerr]=useState(false);
    const[Phno_format_err,setPhno_format_err]=useState(false);
 
    const [Address,setAddress]=useState('');
    const [Addresserr,setAddresserr]=useState(false);
    const [Address_format_err,setAddress_format_err]=useState(false);




    const Addvendor_submit = () => {
      let vendorname1 = vendorname;
      let Address1 = Address;
      let phno1 = phno;
      let email1 = email;
      let flag_vendorname1 = 0;
      let flag_Address = 0;
      let flag_phno = 0;
      let flag_email = 0;
    
      if (vendorname1.length > 0) {
        setvendornamerr(false);
        flag_vendorname1 = 1;
      } else {
        setvendornamerr(true);
        flag_vendorname1 = 0;
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
    
      if (flag_Address === 1 && flag_email === 1 && flag_vendorname1 === 1 && flag_phno === 1) {
        let vendordata = { vname: vendorname, vaddress: Address, vemail: email, vphno: phno };
        dispatch(AC_ADD_VENDOR(vendordata));
        swal({
          icon: 'success',
          title: 'Vendors Added!',
      })
          .then(() => {
              navigate('/vendors');
          });
      }
    };
    


      const inputChange=(event)=>{
        let id=event.target.id;
        let value=event.target.value;
        

        if(id=='vendorname'){
        if(value.length>0){
          setvendornamerr(false)
          setvendorname(value)
        }
        else{
            setvendornamerr(true)
          setvendorname(value)

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
        <form className="container text-center vendor_form p-3 pt-5">
        <h1 className='text-center font-fam mt-3 font-weight-bold mb-3' style={{color:'black'}}>Enter vendor details</h1><br/>
        <input type='text' id='vendorname' value={vendorname} onChange={inputChange} placeholder='Enter vendor Name'/><br/>
        {vendornamerr?<span style={{color:'red'}} id='vendornamerr'>vendor name is Required</span>:""}<br/><br/>
        <input type='text' id='email' value={email} onChange={inputChange} placeholder='Enter Vendor email'/><br/>
        {Mailerr?<span style={{color:'red'}} id='Mailerr'>Mail is Required</span>:""}
        {Mail_format_err?<span style={{color:'red'}} id='Mail_format_err'>Enter Valid Mail</span>:""}<br/><br/>
        
        <textarea  id='Address' value={Address} onChange={inputChange} placeholder='Enter Contract Details'></textarea>
        <br/>
        {Addresserr?<span style={{color:'red'}} id='Addresserr'>Contract details is Required</span>:""}
        {Address_format_err?<span style={{color:'red'}} id='Address_format_err'>Max Length For Address Is 200 Words</span>:""}
    
        <br/><br/>
        <input type='text' id='phno' placeholder='Enter Your Phone Number' value={phno} onChange={inputChange}/><br/>
        {Phnoerr?<span style={{color:'red'}} id='Phnoerr'>Phone Number is Required</span>:""}
        {Phno_format_err?<span style={{color:'red'}} id='Phno_format_err'>Enter Valid Phone Number</span>:""}<br/>
        <button type="button" className="btn btn-outline-success" onClick={Addvendor_submit}>Add vendor</button><br/><br/>
        <Link to="/vendors" className='add_prod_btn mt-5 font_Fam'>Back</Link>
        </form></>
    );
}


export default Addvendor;
