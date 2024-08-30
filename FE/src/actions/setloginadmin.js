
import axios from 'axios';
export const AC_SETLOGINADMIN=(Logindata)=>{
    console.log('----Actions---',Logindata);
    return (dispatch) => {
        axios.post('https://adminpanel-m7rn.onrender.com/admin/login',Logindata)
          .then((response) => {            
            dispatch({type:"SET_LOGINADMIN_DATA",payload:response});
            console.log("------",response);
          })
          .catch((error) => {
            // dispatch(error.message);// it will show error message on screen when API not hit by post
             console.log('--------',error);
          });
        }
}
