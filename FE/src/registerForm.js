import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AC_SETADMIN } from './actions/setadmin';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
const SignupForm = ({ onSignup = () => {} }) => {
  const dispatch = useDispatch();
  const [showAccountText, setShowAccountText] = useState(''); 
  const accountText = "Signed up already?"; 
  const typingSpeed = 100; 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpass: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    cpass: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when the user starts typing
  };

  const validateInput = () => {

    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z0-9]).{8,}$/;

    const isNameEmpty = formData.name.trim() === '';
    const isEmailEmpty = formData.email.trim() === '';
    const isPasswordEmpty = formData.password.trim() === '';

    const isNameValid = isNameEmpty ? false : nameRegex.test(formData.name);
    const isEmailValid = isEmailEmpty ? false : emailRegex.test(formData.email);
    const isPasswordValid = isPasswordEmpty ? false : passwordRegex.test(formData.password);
    const isConfirmValid = formData.cpass === formData.password;

    const nameError = isNameEmpty ? 'Name is empty' : isNameValid ? '' : 'Name is invalid';
    const emailError = isEmailEmpty ? 'Email is empty' : isEmailValid ? '' : 'Email is invalid';
    const passwordError = isPasswordEmpty ? 'Password is empty' : isPasswordValid ? '' : 'Password is invalid';
    const cpassError = isConfirmValid ? '' : 'Confirm Password does not match';

  
    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      cpass: cpassError,
    });

    const isValid = isNameValid && isEmailValid && isPasswordValid && isConfirmValid;
    setIsValid(isValid);
    if (isValid) {
      let signupdata = {email:formData.email,password:formData.password}
     console.log('---form---',signupdata);
      dispatch(AC_SETADMIN(signupdata));
    return isValid;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValidInput = validateInput();
    if (isValidInput) {
      localStorage.setItem('uname', formData.name);
      localStorage.setItem('auth', true);
      swal({
        icon: 'success',
        title: 'Signup Successful!',
        text: 'Try login now!',
    }).then(() => {
        window.location.href = "/";
    });

      onSignup();
    } else {
      localStorage.setItem('auth', false);
    }
  };

  
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
  return (
  <div className='container-fluid fluid_color'>
      <form className="font_Fam form1 d-flex flex-column align-items-center text-center box mb-5 p-5 mt-5">
      <br />
      <h3 className='font_Fam'>Admin<span>Zone</span></h3>
      <br />
      <h5 className='font_Fam fw-bold'>Sign up <span className='text-white fw-bold'>.</span></h5>
      <input type="text" placeholder='Enter Your Name' name="name" value={formData.name} onChange={handleInputChange} required />
      <span style={{ color: 'red' }}>{errors.name}</span><br />

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
    <div className='w-100 d-flex flex-row eye_contain'>
      <input
        type='password'
        placeholder='Confirm Password'
        name="cpass"
        className="cpass"
        value={formData.cpass}
        onChange={handleInputChange}
        required
      /> </div>
      <span style={{ color: 'red' }}>{errors.cpass}</span><br /><br />
     
      <button type='submit' onClick={handleSubmit} className='btn btn-outline-light mb-2'>Sign Up</button>
      <div>
        <p className='fw-bold text-black pt-3'>{showAccountText} <Link to='/' id='loginLink' className='mt-2 mb-2 font_Fam text-decoration-none text-white'>
        Login <i class="fa-solid fa-user"></i>
        </Link></p> </div>
    </form>
  </div>
  );
};

export default SignupForm;
