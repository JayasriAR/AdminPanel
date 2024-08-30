  import axios from 'axios';
  export const AC_SETADMIN=(signupdata)=>{
      console.log('----Actions---',signupdata);
      return (dispatch) => {
          axios.post('https://adminpanel-m7rn.onrender.com/admin/set_admin',signupdata)
            .then((response) => {            
              dispatch({type:"SET_ADMIN_DATA",payload:response});
              console.log("------",response);
            })
            .catch((error) => {
              // dispatch(error.message);// it will show error message on screen when API not hit by post
               console.log('--------',error);
            });
          }
  }
  