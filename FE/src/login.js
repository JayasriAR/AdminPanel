import React, { useState,useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { AC_SETLOGINADMIN } from './actions/setloginadmin';
import axios from 'axios';
import swal from 'sweetalert';
const LoginForm = ({ onLogin = () => {} }) => {
  const [showAccountText, setShowAccountText] = useState(''); 
  const accountText = "Don't have an account?"; 
  const typingSpeed = 100; 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  useEffect(() => {
    const typeWriter = (index, text) => {
      if (index < text.length) {
        setShowAccountText((prev) => prev + text.charAt(index));
        setTimeout(() => {
          typeWriter(index + 1, text);
        }, typingSpeed);
      }
    };
  
    typeWriter(0, accountText);
  
    return () => setShowAccountText(''); // Clear the text when component unmounts
  }, []);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when the user starts typing
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z0-9]).{8,}$/;
  
    const isEmailEmpty = !formData.email || formData.email.trim() === '';
    const isPasswordEmpty = !formData.password || formData.password.trim() === '';
  
    const isEmailValid = !isEmailEmpty && emailRegex.test(formData.email);
    const isPasswordValid = !isPasswordEmpty && passwordRegex.test(formData.password);
  
    const emailError = isEmailEmpty ? 'Email is empty' : isEmailValid ? '' : 'Email is invalid';
    const passwordError = isPasswordEmpty ? 'Password is empty' : isPasswordValid ? '' : 'Password is invalid';
  
    setErrors({
      email: emailError,
      password: passwordError,
    });
  
    const isValid = isEmailValid && isPasswordValid;
    setIsValid(isValid);
  
    const isValidInput = isValid;
    if (isValidInput) {
      let loginDetails = { adminemail: formData.email, adminpassword: formData.password };
      console.log('---form---', loginDetails);
      // dispatch(AC_SETLOGINADMIN(Logindata));
      axios.post('http://127.0.0.1:3001/admin/login', loginDetails)
        .then((response) => {
          console.log("------", response.data);
          if (response.data.status) {
            localStorage.setItem('token', response.data.token);
            
            window.location.href = "/";
          } else {
            swal("Error", response.data.message, "error")
              .then(() => {
                onLogin();
              });
          }
        })
        .catch((error) => {
          console.log('--------', error);
          swal("Error", "An error occurred while processing your request", "error");
        });
    }
    
  };


  

  return (
    <>
    <div className='container-fluid fluid_color'>
    <form className="font_Fam form1 text-center box d-flex flex-column align-items-center p-5 pb-5 mb-5 mt-5">
      <br />
      <h3 className='font_Fam'>Admin<span>Zone</span></h3>
      <br />
      <h5 className='font_Fam fw-bold'>Login <span className='text-white'>.</span> </h5>
    
      <input type="email" placeholder='Enter Your Mail' name="email" value={formData.email} onChange={handleInputChange} required />
      <span style={{ color: 'red' }}>{errors.email}</span><br />

      <div className='w-100 d-flex flex-row eye_contain'>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder='Enter your Password'
        name="password"
        className="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      /> <i id="eye" className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} eye-icon`} onClick={toggleShowPassword}></i></div>
          <span style={{ color: 'red' }}>{errors.password}</span><br />

   
      <button type='submit' onClick={handleSubmit} className='btn btn-outline-light px-4 py-2'>Login</button><br/>
      <p className='fw-bold text-black'>
      {showAccountText} <Link to="/signup" className='text-decoration-none text-white'>Signup <i class="fa-solid fa-user-plus"></i></Link>
      </p>

    </form>
    </div>
    </>
  
  );
};

export default LoginForm;
